import React, { useState } from 'react';
import { MapPinIcon, PlusIcon, XIcon, MenuIcon, NavigationIcon, TrashIcon, Car, Bike, PersonStanding, Train } from 'lucide-react';
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

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

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

    const updateWaypointNumbers = (waypointsList: WaypointType[]) => {
        for (let i = 1; i < waypointsList.length - 1; i++) {
            waypointsList[i] = {
                ...waypointsList[i],
                placeholder: `Waypoint ${i}`
            };
        }
    };

    const updateWaypoint = (id: string, value: string) => {
        setWaypoints(waypoints.map(wp =>
            wp.id === id ? { ...wp, value } : wp
        ));

        // Trigger autocomplete when there is input
        if (value.trim() !== '') {
            fetchAutocompleteResults(value);
        } else {
            setAutocompleteResults([]);
        }
    };

    const fetchAutocompleteResults = (input: string) => {
        if (!window.google || !window.google.maps || !window.google.maps.places) {
            console.error('Google Maps Places API not loaded');
            return;
        }

        const autocompleteService = new window.google.maps.places.AutocompleteService();

        autocompleteService.getPlacePredictions(
            {
                input,
                componentRestrictions: { country: 'fr' }, // You can adjust or remove country restriction
                types: ['geocode', 'establishment']
            },
            (predictions: any, status: any) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    const results = predictions.map((prediction: any) => ({
                        id: prediction.place_id,
                        description: prediction.description
                    }));
                    setAutocompleteResults(results);
                } else {
                    setAutocompleteResults([]);
                }
            }
        );
    };

    const selectAutocompleteResult = (result: AutocompleteResult) => {
        if (activeInput) {
            setWaypoints(waypoints.map(wp =>
                wp.id === activeInput ? { ...wp, value: result.description } : wp
            ));
            setAutocompleteResults([]);
            setActiveInput(null);
        }
    };

    const handleInputFocus = (id: string) => {
        setActiveInput(id);
        // Re-show autocomplete results if there's a value
        const waypoint = waypoints.find(wp => wp.id === id);
        if (waypoint && waypoint.value.trim() !== '') {
            fetchAutocompleteResults(waypoint.value);
        }
    };

    const handleInputBlur = () => {
        // Delay hiding the results to allow for clicking on them
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

    const handleRouteCalculated = (routeResult: any) => {
        console.log('Route calculated successfully', routeResult);
        setRouteDetails(routeResult);
        setCalculateRoute(false);
    };

    const handleTravelModeChange = (mode: TravelMode) => {
        setTravelMode(mode);
        // Recalculate route if already displayed
        if (routeDetails) {
            handleCalculateRoute();
        }
    };

    const headerHeight = 80;

    return (
        <div className="h-screen w-full relative bg-gray-100 overflow-hidden">
            <div className="absolute inset-0">
                <GoogleMapsIntegration
                    waypoints={waypoints}
                    calculateRoute={calculateRoute}
                    onRouteCalculated={handleRouteCalculated}
                    travelMode={travelMode}
                />
            </div>

            {!isPanelOpen && (
                <button
                    onClick={togglePanel}
                    className={`absolute left-4 z-30 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105`}
                    style={{ top: `${headerHeight + 16}px` }}
                    aria-label="Open navigation panel"
                >
                    <MenuIcon size={20} className="text-indigo-600" />
                </button>
            )}

            <div
                className={`absolute left-0 z-20 bg-white shadow-xl transition-all duration-300 ease-in-out overflow-hidden`}
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
                                <button
                                    onClick={() => handleTravelModeChange('DRIVING')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-md transition ${travelMode === 'DRIVING' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                                    title="Drive"
                                >
                                    <Car size={16} />
                                    <span className="text-xs mt-1">Drive</span>
                                </button>
                                <button
                                    onClick={() => handleTravelModeChange('BICYCLING')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-md transition ${travelMode === 'BICYCLING' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                                    title="Bike"
                                >
                                    <Bike size={16} />
                                    <span className="text-xs mt-1">Bike</span>
                                </button>
                                <button
                                    onClick={() => handleTravelModeChange('WALKING')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-md transition ${travelMode === 'WALKING' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                                    title="Walk"
                                >
                                    <PersonStanding size={16} />
                                    <span className="text-xs mt-1">Walk</span>
                                </button>
                                <button
                                    onClick={() => handleTravelModeChange('TRANSIT')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-md transition ${travelMode === 'TRANSIT' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                                    title="Transit"
                                >
                                    <Train size={16} />
                                    <span className="text-xs mt-1">Transit</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 flex-grow overflow-y-auto pr-1">
                            {waypoints.map((waypoint, index) => (
                                <div key={waypoint.id} className="relative">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-shrink-0">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                                ${index === 0 ? 'bg-green-100 text-green-600' :
                                                index === waypoints.length - 1 ? 'bg-red-100 text-red-600' :
                                                    'bg-indigo-100 text-indigo-600'}`}>
                                                <MapPinIcon size={16} />
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <input
                                                type="text"
                                                value={waypoint.value}
                                                onChange={(e) => updateWaypoint(waypoint.id, e.target.value)}
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

                                    {activeInput === waypoint.id && autocompleteResults.length > 0 && (
                                        <div className="absolute z-10 left-10 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                            {autocompleteResults.map(result => (
                                                <div
                                                    key={result.id}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 truncate"
                                                    onClick={() => selectAutocompleteResult(result)}
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
                                disabled={waypoints[0].value === '' || waypoints[waypoints.length - 1].value === ''}
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
                />
            )}
        </div>
    );
};

export default Navigation;