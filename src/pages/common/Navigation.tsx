import React, { useState } from 'react';
import {
  MapPinIcon,
  PlusIcon,
  XIcon,
  MenuIcon,
  NavigationIcon,
  TrashIcon,
  Car,
  Bike,
  PersonStanding,
  Train
} from 'lucide-react';
import GoogleMapsIntegration from '../../component/map/GoogleMapsIntegration';
import RouteInfo from '../../component/map/RouteInfo';
import { useRouteHistory, RouteHistoryItem } from '../../hooks/map/useRouteHistory';

type TravelMode = 'DRIVING' | 'BICYCLING' | 'WALKING' | 'TRANSIT';

interface WaypointType {
  id: string;
  placeholder: string;
  value: string;
  isUserLocation?: boolean;
}

interface AutocompleteResult {
  id: string;
  description: string;
}

const Navigation: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [waypoints, setWaypoints] = useState<WaypointType[]>([
    { id: 'start', placeholder: 'Starting point', value: '' },
    { id: 'end',   placeholder: 'Destination',    value: '' }
  ]);
  const [calculateRoute, setCalculateRoute] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [autocompleteResults, setAutocompleteResults] = useState<AutocompleteResult[]>([]);
  const [travelMode, setTravelMode] = useState<TravelMode>('DRIVING');
  const [routeDetails, setRouteDetails] = useState<any>(null);
  const [isRouteInfoVisible, setIsRouteInfoVisible] = useState(false);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);

  const {
    history,
    loading: historyLoading,
    error: historyError,
    save: saveHistory   // on garde saveHistory et on l'utilise ci-dessous
  } = useRouteHistory();

  const headerHeight = 80;
  const showUserMarker = !isRouteInfoVisible;

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  const addWaypoint = () => {
    if (waypoints.length >= 7) return;
    const newWp = [...waypoints];
    newWp.splice(newWp.length - 1, 0, {
      id: `waypoint-${Date.now()}`,
      placeholder: `Waypoint ${newWp.length - 1}`,
      value: ''
    });
    for (let i = 1; i < newWp.length - 1; i++) {
      newWp[i].placeholder = `Waypoint ${i}`;
    }
    setWaypoints(newWp);
  };

  const removeWaypoint = (id: string) => {
    if (id === 'start' || id === 'end') return;
    const filtered = waypoints.filter(wp => wp.id !== id);
    for (let i = 1; i < filtered.length - 1; i++) {
      filtered[i].placeholder = `Waypoint ${i}`;
    }
    setWaypoints(filtered);
  };

  const updateWaypoint = (id: string, value: string) => {
    setWaypoints(prev =>
      prev.map(wp =>
        wp.id === id ? { ...wp, value, isUserLocation: false } : wp
      )
    );
    if (value.trim()) fetchAutocompleteResults(value);
    else setAutocompleteResults([]);
  };

  const fetchAutocompleteResults = (input: string) => {
    if (!window.google?.maps?.places) return;
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      { input, componentRestrictions: { country: 'fr' }, types: ['geocode','establishment'] },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setAutocompleteResults(
            predictions.map((p: any) => ({
              id: p.place_id,
              description: p.description
            }))
          );
        } else {
          setAutocompleteResults([]);
        }
      }
    );
  };

    const selectAutocompleteResult = (result: AutocompleteResult) => {
      if (!activeInput) return;
      setWaypoints(prev =>
        prev.map(wp =>
          wp.id === activeInput
            ? { ...wp, value: result.description, isUserLocation: false }
            : wp
        )
      );
      setAutocompleteResults([]);
      setActiveInput(null);
    };
  
    const handleInputFocus = (id: string) => {
      setActiveInput(id);
      const wp = waypoints.find(w => w.id === id);
      if (wp?.value.trim()) fetchAutocompleteResults(wp.value);
    };

    const handleInputBlur = () => {
      setTimeout(() => {
        setActiveInput(null);
        setAutocompleteResults([]);
      }, 200);
    };
  
    const handleCalculateRoute = () => {
      setIsRouteInfoVisible(true);
      if (calculateRoute) {
        setCalculateRoute(false);
        setTimeout(() => setCalculateRoute(true), 100);
      } else {
        setCalculateRoute(true);
      }
    };
  
    const handleTravelModeChange = (mode: TravelMode) => {
      setTravelMode(mode);
      if (routeDetails) handleCalculateRoute();
    };
  
    const handleHistoryClick = (h: RouteHistoryItem) => {
      setWaypoints([
        { id: 'start', placeholder: 'Starting point', value: h.startAddress },
        { id: 'end',   placeholder: 'Destination',    value: h.endAddress }
      ]);
      setSelectedRouteIndex(0);
      setIsRouteInfoVisible(true);
      if (calculateRoute) {
        setCalculateRoute(false);
        setTimeout(() => setCalculateRoute(true), 100);
      } else {
        setCalculateRoute(true);
      }
    };
  
  

    return (
      <div className="h-screen w-full relative bg-gray-100 overflow-hidden">
        {/* Carte */}
        <div className="absolute inset-0">
          <GoogleMapsIntegration
            waypoints={waypoints}
            calculateRoute={calculateRoute}
            onRouteCalculated={r => {
              setRouteDetails(r);
  
              // --- Réintroduction de saveHistory pour lever TS6133 ---
              const leg0 = r.routes[0].legs[0];
              const legN = r.routes[0].legs[r.routes[0].legs.length - 1];
              if (legN) {
                saveHistory({
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
                    r.routes[0].legs.reduce((s: number, l: any) => s + l.distance.value, 0) / 1000,
                  estimatedDurationInSeconds:
                    r.routes[0].legs.reduce((s: number, l: any) => s + l.duration.value, 0)
                });
              }
  
              setSelectedRouteIndex(0);
              setCalculateRoute(false);
            }}
            travelMode={travelMode}
            selectedRouteIndex={selectedRouteIndex}
            showUserMarker={showUserMarker}
          />
        </div>
  
      {/* Bouton d’ouverture du panneau */}
      {!isPanelOpen && (
        <button
          onClick={togglePanel}
          className="absolute left-4 z-30 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105"
          style={{ top: `${headerHeight + 16}px` }}
        >
          <MenuIcon size={20} className="text-indigo-600" />
        </button>
      )}

      {/* Side panel */}
        <div
          className="absolute left-0 z-20 bg-white shadow-xl transition-all duration-300 ease-in-out overflow-hidden"
          style={{
            top: `${headerHeight}px`,
            height: `calc(100% - ${headerHeight}px)`,
            width: isPanelOpen ? '320px' : '0'
          }}
        >
          {isPanelOpen && (
            <div className="flex flex-col h-full p-4">
              {/* Header */}
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <NavigationIcon size={20} className="mr-2 text-indigo-600" />
                  Navigation
                </h2>
                <button
                  onClick={togglePanel}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close navigation panel"
                >
                  <XIcon size={20} />
                </button>
              </div>

                        {/* champs de recherche */}
                        <div className="space-y-3 flex-grow overflow-y-auto pr-1">
                            {waypoints.map((wp, idx) => (
                                <div key={wp.id} className="relative">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-shrink-0">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                    idx === 0
                                                        ? 'bg-green-100 text-green-600'
                                                        : idx === waypoints.length - 1
                                                            ? 'bg-red-100 text-red-600'
                                                            : 'bg-indigo-100 text-indigo-600'
                                                }`}
                                            >
                                                <MapPinIcon size={16} />
                                            </div>
                                        </div>
                                        <input
                                            className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                            type="text"
                                            value={wp.value}
                                            placeholder={wp.placeholder}
                                            onChange={e => updateWaypoint(wp.id, e.target.value)}
                                            onFocus={() => handleInputFocus(wp.id)}
                                            onBlur={handleInputBlur}
                                        />
                                        {wp.id !== 'start' && wp.id !== 'end' && (
                                            <button
                                                onClick={() => removeWaypoint(wp.id)}
                                                className="text-gray-400 hover:text-red-500"
                                                aria-label="Remove waypoint"
                                            >
                                                <TrashIcon size={16} />
                                            </button>
                                        )}
                                    </div>
                                    {activeInput === wp.id && (
                                        <div className="absolute z-10 left-10 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                            <div
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                                                onClick={() =>
                                                    setWaypoints(prev =>
                                                        prev.map(x =>
                                                            x.id === wp.id
                                                                ? { ...x, value: 'Ma position', isUserLocation: true }
                                                                : x
                                                        )
                                                    )
                                                }
                                            >
                                                Ma position
                                            </div>
                                            {autocompleteResults.map(r => (
                                                <div
                                                    key={r.id}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 truncate"
                                                    onClick={() => selectAutocompleteResult(r)}
                                                >
                                                    {r.description}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {waypoints.length < 7 && (
                                <button
                                    onClick={addWaypoint}
                                    className="flex items-center justify-center w-full py-2 border-dashed border border-indigo-300 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors"
                                >
                                    <PlusIcon size={16} className="mr-1" />
                                    Add Waypoint
                                </button>
                            )}
                        </div>

                        {/* modes de transport */}
                        <div className="mb-4 grid grid-cols-4 gap-2">
                            {([
                                { mode: 'DRIVING',   icon: Car,            label: 'Drive' },
                                { mode: 'BICYCLING', icon: Bike,           label: 'Bike' },
                                { mode: 'WALKING',   icon: PersonStanding, label: 'Walk' },
                                { mode: 'TRANSIT',   icon: Train,          label: 'Transit' }
                            ] as { mode: TravelMode; icon: any; label: string }[]).map(
                                ({ mode, icon: Icon, label }) => (
                                    <button
                                        key={mode}
                                        onClick={() => handleTravelModeChange(mode)}
                                        className={`flex flex-col items-center justify-center py-2 border rounded-lg transition ${
                                            travelMode === mode
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : 'bg-white text-gray-600 border-gray-200 hover:bg-indigo-50'
                                        }`}
                                    >
                                        <Icon size={20} />
                                        <span className="text-xs mt-1">{label}</span>
                                    </button>
                                )
                            )}
                        </div>

                        {/* bouton calculer */}
                        <div className="mt-4">
                            <button
                                onClick={handleCalculateRoute}
                                disabled={
                                    waypoints[0].value === '' ||
                                    waypoints[waypoints.length - 1].value === ''
                                }
                                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <NavigationIcon size={18} className="mr-2" />
                                Calculate Route
                            </button>
                        </div>

            {/* Historique */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">History</h3>
              {historyLoading && <p>Loading...</p>}
              {historyError && <p className="text-red-500">{historyError}</p>}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.map((h: RouteHistoryItem) => (
                  <div
                    key={h.id}
                    onClick={() => handleHistoryClick(h)}
                    className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  >
                    <p className="text-sm font-medium">
                      {h.startAddress} → {h.endAddress}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(h.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Détails itinéraire */}
      {isRouteInfoVisible && routeDetails && (
        <RouteInfo
          routeDetails={routeDetails}
          onClose={() => setIsRouteInfoVisible(false)}
          travelMode={travelMode}
          onSelectRoute={setSelectedRouteIndex}
          selectedRouteIndex={selectedRouteIndex}
        />
      )}
    </div>
  );
};

export default Navigation;