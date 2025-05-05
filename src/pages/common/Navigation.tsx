import React, { useState, useEffect, useCallback } from 'react';
import { useMediaQuery } from '../../hooks/map/useMediaQuery.ts';
import SidePanel from '../../component/map/SidePanel';
import GoogleMapsIntegration from '../../component/map/GoogleMapsIntegration';
import RouteInfo from '../../component/map/RouteInfo';
import { useRouteHistory } from '../../hooks/map/useRouteHistory';
import { useLocalRouteHistory } from '../../hooks/map/useLocalRouteHistory';
import { TravelMode, Waypoint, RouteDetails } from '../../hooks/map/types/map.ts';
import { RouteIcon } from 'lucide-react';
import Cookies from "js-cookie";

const Navigation: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([
    { id: 'start', placeholder: 'Starting point', value: '' },
    { id: 'end', placeholder: 'Destination', value: '' }
  ]);
  const [calculateRoute, setCalculateRoute] = useState(false);
  const [travelMode, setTravelMode] = useState<TravelMode>('DRIVING');
  const [routeDetails, setRouteDetails] = useState<RouteDetails | null>(null);
  const [isRouteInfoVisible, setIsRouteInfoVisible] = useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasCalculatedRoute, setHasCalculatedRoute] = useState<boolean>(false);
  const [routeAlreadySaved, setRouteAlreadySaved] = useState<boolean>(false);
  const [lastSavedIndex, setLastSavedIndex] = useState<number>(-1);
  const [activeRoute, setActiveRoute] = useState<boolean>(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const panelWidth = isMobile && isPanelOpen ? '100%' : '320px';

  const {
    history: remoteHistory,
    loading: remoteLoading,
    error: remoteError,
    save: saveRemoteHistory
  } = useRouteHistory();

  const {
    history: localHistory,
    loading: localLoading,
    error: localError,
    save: saveLocalHistory,
    syncToRemote
  } = useLocalRouteHistory();

  // Choisir quel historique utiliser selon le statut d'authentification
  const history = isAuthenticated ? remoteHistory : localHistory;
  const historyLoading = isAuthenticated ? remoteLoading : localLoading;
  // Pour les erreurs, on ne veut pas afficher les erreurs d'authentification
  const historyError = isAuthenticated ?
      (remoteError && !remoteError.includes('401') && !remoteError.includes('Unauthorized') ? remoteError : null) :
      localError;

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getAuthToken();
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  useEffect(() => {
    if (isAuthenticated && localHistory.length > 0) {
      syncToRemote();
    }
  }, [isAuthenticated, localHistory.length, syncToRemote]);

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  const handleCalculateRoute = () => {
    // Réinitialiser l'état de sauvegarde pour un nouveau calcul d'itinéraire
    setRouteAlreadySaved(false);
    setLastSavedIndex(-1);

    setIsRouteInfoVisible(true);
    if (calculateRoute) {
      setCalculateRoute(false);
      setTimeout(() => setCalculateRoute(true), 100);
    } else {
      setCalculateRoute(true);
    }
  };

  // New function to handle route cancellation
  const handleCancelRoute = () => {
    // Clear route-related states
    setRouteDetails(null);
    setHasCalculatedRoute(false);
    setIsRouteInfoVisible(false);
    setActiveRoute(false);
    setRouteAlreadySaved(false);
    setLastSavedIndex(-1);

    // Reset calculation trigger
    setCalculateRoute(false);

    // Optional: Reset selected route index
    setSelectedRouteIndex(0);
  };

  function getAuthToken(): string | null {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
    const cookieToken = Cookies.get('authToken');
    const localToken = localStorage.getItem('authToken');

    return cookiesAccepted ? (cookieToken || null) : localToken;
  }

  // Fonction sécurisée pour sauvegarder un itinéraire
  const saveRouteToHistory = useCallback((routeData: RouteDetails, routeIndex: number) => {
    if (!routeData || !routeData.routes || !routeData.routes[routeIndex]) {
      console.warn('Invalid route data or index when trying to save to history');
      return;
    }

    const route = routeData.routes[routeIndex];

    // Vérifier que les legs existent et ne sont pas vides
    if (!route.legs || route.legs.length === 0) {
      console.warn('Route has no legs when trying to save to history');
      return;
    }

    try {
      const leg0 = route.legs[0];
      const legN = route.legs[route.legs.length - 1];

      if (!leg0 || !legN || !leg0.start_address || !legN.end_address ||
          !leg0.start_location || !legN.end_location) {
        console.warn('Invalid leg data when trying to save to history');
        return;
      }

      const routeHistoryItem = {
        startAddress: leg0.start_address,
        endAddress: legN.end_address,
        startPoint: {
          latitude: leg0.start_location.lat(),
          longitude: leg0.start_location.lng()
        },
        endPoint: {
          latitude: legN.end_location.lat(),
          longitude: legN.end_location.lng()
        },
        kilometersDistance:
            route.legs.reduce((s, l) => {
              if (l && l.distance) {
                return s + l.distance.value;
              }
              return s;
            }, 0) / 1000,
        estimatedDurationInSeconds:
            route.legs.reduce((s, l) => {
              if (l && l.duration) {
                return s + l.duration.value;
              }
              return s;
            }, 0)
      };

      if (isAuthenticated) {
        saveRemoteHistory(routeHistoryItem);
      } else {
        saveLocalHistory(routeHistoryItem);
      }

      setRouteAlreadySaved(true);
      setLastSavedIndex(routeIndex);
    } catch (error) {
      console.error('Error saving route to history:', error);
    }
  }, [isAuthenticated, saveRemoteHistory, saveLocalHistory]);

  const handleRouteCalculated = (routeData: RouteDetails) => {
    try {
      if (!routeData || !routeData.routes || routeData.routes.length === 0) {
        console.warn('Invalid route data in handleRouteCalculated');
        return;
      }

      setRouteDetails(routeData);
      setHasCalculatedRoute(true);
      setActiveRoute(true);
      setSelectedRouteIndex(0);
      setCalculateRoute(false);

      // Sauvegarder l'itinéraire par défaut (index 0) après un court délai
      setTimeout(() => {
        if (!routeAlreadySaved && routeData) {
          saveRouteToHistory(routeData, 0);
        }
      }, 2000);
    } catch (error) {
      console.error('Error in handleRouteCalculated:', error);
    }
  };

  // Gestion du changement d'itinéraire sélectionné
  const handleSelectRoute = (idx: number) => {
    if (selectedRouteIndex === idx) return;

    setSelectedRouteIndex(idx);

    // Sauvegarder le nouvel itinéraire sélectionné dans l'historique
    // seulement s'il est différent de celui déjà sauvegardé
    if (routeDetails && idx !== lastSavedIndex) {
      saveRouteToHistory(routeDetails, idx);
    }
  };

  const handleHistoryClick = (historyItem: any) => {
    setWaypoints([
      { id: 'start', placeholder: 'Starting point', value: historyItem.startAddress },
      { id: 'end', placeholder: 'Destination', value: historyItem.endAddress }
    ]);
    setSelectedRouteIndex(0);
    setIsRouteInfoVisible(false);
    // Réinitialiser l'état de sauvegarde
    setRouteAlreadySaved(false);
    setLastSavedIndex(-1);

    setTimeout(() => {
      setCalculateRoute(true);
    }, 100);
  };

  // Gérer la fermeture/réouverture du panel d'info route
  const handleRouteInfoClose = () => {
    setIsRouteInfoVisible(false);
  };

  const handleToggleRouteInfo = () => {
    setIsRouteInfoVisible(!isRouteInfoVisible);
  };

  return (
      <div className="h-screen w-full relative bg-gray-100 overflow-hidden">
        <div className="absolute inset-0">
          <GoogleMapsIntegration
              waypoints={waypoints}
              calculateRoute={calculateRoute}
              onRouteCalculated={handleRouteCalculated}
              travelMode={travelMode}
              selectedRouteIndex={selectedRouteIndex}
              showUserMarker={!isRouteInfoVisible}
              isAuthenticated={isAuthenticated}
              setWaypoints={setWaypoints}
          />
        </div>

        <SidePanel
            isPanelOpen={isPanelOpen}
            togglePanel={togglePanel}
            panelWidth={panelWidth}
            waypoints={waypoints}
            setWaypoints={setWaypoints}
            handleCalculateRoute={handleCalculateRoute}
            handleCancelRoute={handleCancelRoute}
            travelMode={travelMode}
            setTravelMode={setTravelMode}
            history={history.slice(0, 5)} // Limitation à 5 entrées dans l'historique
            historyLoading={historyLoading}
            historyError={historyError}
            handleHistoryClick={handleHistoryClick}
            isAuthenticated={isAuthenticated}
            activeRoute={activeRoute}
        />

        {isRouteInfoVisible && routeDetails && (
            <RouteInfo
                routeDetails={routeDetails}
                onClose={handleRouteInfoClose}
                travelMode={travelMode}
                onSelectRoute={handleSelectRoute}
                selectedRouteIndex={selectedRouteIndex}
                isAuthenticated={isAuthenticated}
            />
        )}

        {/* Bouton pour afficher/masquer les informations de l'itinéraire */}
        {hasCalculatedRoute && !isRouteInfoVisible && (
            <div className="absolute bottom-6 right-4 z-10">
              <button
                  onClick={handleToggleRouteInfo}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-colors duration-300 flex items-center justify-center"
                  aria-label="Show route information"
                  title="Show route information"
              >
                <RouteIcon size={20} />
              </button>
            </div>
        )}
      </div>
  );
};

export default Navigation;