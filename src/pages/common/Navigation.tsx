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

interface WaypointType {
    id: string;
    placeholder: string;
    value: string;
}

interface AutocompleteResult {
    id: string;
    description: string;
}

type TravelMode = 'DRIVING' | 'BICYCLING' | 'WALKING' | 'TRANSIT';

const Navigation: React.FC = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(true);
    const [waypoints, setWaypoints] = useState<WaypointType[]>([
        { id: 'start', placeholder: 'Starting point', value: '' },
        { id: 'end', placeholder: 'Destination', value: '' }
    ]);
    const [calculateRoute, setCalculateRoute] = useState(false);
    const [activeInput, setActiveInput] = useState<string | null>(null);
    const [autocompleteResults, setAutocompleteResults] = useState<AutocompleteResult[]>([]);
    const [travelMode, setTravelMode] = useState<TravelMode>('DRIVING');
    const [routeDetails, setRouteDetails] = useState<any>(null);
    const [isRouteInfoVisible, setIsRouteInfoVisible] = useState(false);
    const [selectedRouteIndex, setSelectedRouteIndex] = useState<number>(0);

    const togglePanel = () => setIsPanelOpen(!isPanelOpen);


    const addWaypoint = () => {
        if (waypoints.length >= 7) return;

        const newWaypoints = [...waypoints];
        newWaypoints.splice(newWaypoints.length - 1, 0, {
            id: `waypoint-${Date.now()}`,
            placeholder: `Waypoint ${newWaypoints.length - 1}`,
            value: ''
        });
        updateWaypointNumbers(newWaypoints);
        setWaypoints(newWaypoints);
    };

    const removeWaypoint = (id: string) => {
        if (id === 'start' || id === 'end') return;
        const newWaypoints = waypoints.filter(wp => wp.id !== id);
        updateWaypointNumbers(newWaypoints);
        setWaypoints(newWaypoints);
    };

    const updateWaypointNumbers = (list: WaypointType[]) => {
        for (let i = 1; i < list.length - 1; i++) {
            list[i] = { ...list[i], placeholder: `Waypoint ${i}` };
        }
    };

    const updateWaypoint = (id: string, value: string) => {
        setWaypoints(prev =>
            prev.map(wp => (wp.id === id ? { ...wp, value } : wp))
        );
        if (value.trim() !== '') {
            fetchAutocompleteResults(value);
        } else {
            setAutocompleteResults([]);
        }
    };

    const fetchAutocompleteResults = (input: string) => {
        if (!window.google?.maps?.places) {
            console.error('Google Maps Places API not loaded');
            return;
        }
        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions(
            {
                input,
                componentRestrictions: { country: 'fr' },
                types: ['geocode', 'establishment']
            },
            (predictions: any, status: any) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
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
        if (activeInput) {
            setWaypoints(prev =>
                prev.map(wp =>
                    wp.id === activeInput ? { ...wp, value: result.description } : wp
                )
            );
            setAutocompleteResults([]);
            setActiveInput(null);
        }
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

    
    const headerHeight = 80;
    const showUserMarker = !isRouteInfoVisible;

    return (
        <div className="h-screen w-full relative bg-gray-100 overflow-hidden">
            <div className="absolute inset-0">
                <GoogleMapsIntegration
                    waypoints={waypoints}
                    calculateRoute={calculateRoute}
                    onRouteCalculated={r => {
                        setRouteDetails(r);
                        setSelectedRouteIndex(0);
                        setCalculateRoute(false);
                    }}
                    travelMode={travelMode}
                    selectedRouteIndex={selectedRouteIndex}
                    showUserMarker={showUserMarker}
                />
            </div>

            {!isPanelOpen && (
                <button
                    onClick={togglePanel}
                    className="absolute left-4 z-30 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                    style={{ top: `${headerHeight + 16}px` }}
                >
                    <MenuIcon size={20} className="text-indigo-600" />
                </button>
            )}

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

                        <div className="mb-4">
                            <div className="flex justify-between border border-gray-200 rounded-lg p-1 bg-gray-50">
                                {([
                                    { mode: 'DRIVING', icon: Car, label: 'Drive' },
                                    { mode: 'BICYCLING', icon: Bike, label: 'Bike' },
                                    { mode: 'WALKING', icon: PersonStanding, label: 'Walk' },
                                    { mode: 'TRANSIT', icon: Train, label: 'Transit' }
                                ] as { mode: TravelMode; icon: any; label: string }[]).map(
                                    ({ mode, icon: Icon, label }) => (
                                        <button
                                            key={mode}
                                            onClick={() => handleTravelModeChange(mode)}
                                            title={label}
                                            className={`flex flex-col items-center justify-center p-2 rounded-md transition ${
                                                travelMode === mode
                                                    ? 'bg-indigo-100 text-indigo-600'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            <Icon size={16} />
                                            <span className="text-xs mt-1">{label}</span>
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="space-y-3 flex-grow overflow-y-auto pr-1">
                            {waypoints.map((waypoint, index) => (
                                <div key={waypoint.id} className="relative">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-shrink-0">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center 
                                                ${
                                                    index === 0
                                                        ? 'bg-green-100 text-green-600'
                                                        : index === waypoints.length - 1
                                                        ? 'bg-red-100 text-red-600'
                                                        : 'bg-indigo-100 text-indigo-600'
                                                }`}
                                            >
                                                <MapPinIcon size={16} />
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <input
                                                type="text"
                                                value={waypoint.value}
                                                onChange={e =>
                                                    updateWaypoint(waypoint.id, e.target.value)
                                                }
                                                onFocus={() => handleInputFocus(waypoint.id)}
                                                onBlur={handleInputBlur}
                                                placeholder={waypoint.placeholder}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                            />
                                        </div>
                                        {waypoint.id !== 'start' && waypoint.id !== 'end' && (
                                            <button
                                                onClick={() => removeWaypoint(waypoint.id)}
                                                className="text-gray-400 hover:text-red-500"
                                                aria-label="Remove waypoint"
                                            >
                                                <TrashIcon size={16} />
                                            </button>
                                        )}
                                    </div>

                                    {activeInput === waypoint.id &&
                                        autocompleteResults.length > 0 && (
                                            <div className="absolute z-10 left-10 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                {autocompleteResults.map(result => (
                                                    <div
                                                        key={result.id}
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 truncate"
                                                        onClick={() =>
                                                            selectAutocompleteResult(result)
                                                        }
                                                    >
                                                        {result.description}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                </div>
                            ))}

                            {waypoints.length < 7 && (
                                <button
                                    onClick={addWaypoint}
                                    className="flex items-center justify-center w-full py-2 border border-dashed border-indigo-300 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors"
                                >
                                    <PlusIcon size={16} className="mr-1" />
                                    <span>Add Waypoint</span>
                                </button>
                            )}
                        </div>

                        <div className="mt-4">
                            <button
                                onClick={handleCalculateRoute}
                                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={
                                    waypoints[0].value === '' ||
                                    waypoints[waypoints.length - 1].value === ''
                                }
                            >
                                <NavigationIcon size={18} className="mr-2" />
                                Calculate Route
                            </button>
                        </div>
                    </div>
                )}
            </div>

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