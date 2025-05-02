import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '../../hooks/map/useMediaQuery.ts';
import SidePanel from '../../component/map/SidePanel';
import GoogleMapsIntegration from '../../component/map/GoogleMapsIntegration';
import RouteInfo from '../../component/map/RouteInfo';
import { useRouteHistory } from '../../hooks/map/useRouteHistory';
import { useLocalRouteHistory } from '../../hooks/map/useLocalRouteHistory';
import { TravelMode, Waypoint, RouteDetails } from '../../hooks/map/types/map.ts';
import { getAuthToken } from '../../hooks/map/map.ts';

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
    setIsRouteInfoVisible(true);
    if (calculateRoute) {
      setCalculateRoute(false);
      setTimeout(() => setCalculateRoute(true), 100);
    } else {
      setCalculateRoute(true);
    }
  };

  const handleRouteCalculated = (routeData: RouteDetails) => {
    setRouteDetails(routeData);

    const leg0 = routeData.routes[0].legs[0];
    const legN = routeData.routes[0].legs[routeData.routes[0].legs.length - 1];

    if (legN) {
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
            routeData.routes[0].legs.reduce((s: number, l: any) => s + l.distance.value, 0) / 1000,
        estimatedDurationInSeconds:
            routeData.routes[0].legs.reduce((s: number, l: any) => s + l.duration.value, 0)
      };

      if (isAuthenticated) {
        saveRemoteHistory(routeHistoryItem);
      } else {
        saveLocalHistory(routeHistoryItem);
      }
    }

    setSelectedRouteIndex(0);
    setCalculateRoute(false);
  };

  const handleHistoryClick = (historyItem: any) => {
    setWaypoints([
      { id: 'start', placeholder: 'Starting point', value: historyItem.startAddress },
      { id: 'end', placeholder: 'Destination', value: historyItem.endAddress }
    ]);
    setSelectedRouteIndex(0);
    setIsRouteInfoVisible(false);
    setTimeout(() => {
      setCalculateRoute(true);
    }, 100);
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
            travelMode={travelMode}
            setTravelMode={setTravelMode}
            history={history}
            historyLoading={historyLoading}
            historyError={historyError}
            handleHistoryClick={handleHistoryClick}
            isAuthenticated={isAuthenticated}
        />

        {isRouteInfoVisible && routeDetails && (
            <RouteInfo
                routeDetails={routeDetails}
                onClose={() => setIsRouteInfoVisible(false)}
                travelMode={travelMode}
                onSelectRoute={setSelectedRouteIndex}
                selectedRouteIndex={selectedRouteIndex}
                isAuthenticated={isAuthenticated}
            />
        )}
      </div>
  );
};

export default Navigation;