import React, { useState, useEffect } from 'react';
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
    Train,
    StarIcon,
    HistoryIcon,
    Share2Icon,
    UserCircleIcon,
    XCircleIcon
} from 'lucide-react';
import { Waypoint, TravelMode, RouteHistoryItem } from '../../hooks/map/types/map.ts';
import FavoriteLocations from './FavoriteLocations.tsx';
import ShareOptions from './ShareOptions.tsx';

interface SidePanelProps {
    isPanelOpen: boolean;
    togglePanel: () => void;
    panelWidth: string;
    waypoints: Waypoint[];
    setWaypoints: React.Dispatch<React.SetStateAction<Waypoint[]>>;
    handleCalculateRoute: () => void;
    handleCancelRoute: () => void;
    travelMode: TravelMode;
    setTravelMode: React.Dispatch<React.SetStateAction<TravelMode>>;
    history: RouteHistoryItem[];
    historyLoading: boolean;
    historyError: string | null;
    handleHistoryClick: (historyItem: RouteHistoryItem) => void;
    isAuthenticated: boolean;
    activeRoute: boolean;
}

const SidePanel: React.FC<SidePanelProps> = ({
                                                 isPanelOpen,
                                                 togglePanel,
                                                 panelWidth,
                                                 waypoints,
                                                 setWaypoints,
                                                 handleCalculateRoute,
                                                 handleCancelRoute,
                                                 travelMode,
                                                 setTravelMode,
                                                 history,
                                                 historyLoading,
                                                 handleHistoryClick,
                                                 isAuthenticated,
                                                 activeRoute
                                             }) => {
    const [activeInput, setActiveInput] = useState<string | null>(null);
    const [autocompleteResults, setAutocompleteResults] = useState<Array<{id: string, description: string}>>([]);
    const [activeTab, setActiveTab] = useState<'navigation' | 'favorites' | 'share'>('navigation');
    const [userPosition, setUserPosition] = useState<{lat: number, lng: number} | null>(null);

    const limitedHistory = history.slice(0, 5);

    const getUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setUserPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                error => {
                    console.error('Error getting location:', error);
                }
            );
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

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

        if (value && value.trim()) {
            fetchAutocompleteResults(value);
        } else {
            setAutocompleteResults([]);
        }
    };

    const fetchAutocompleteResults = (input: string | google.maps.LatLngLiteral) => {
        if (!window.google?.maps?.places) return;

        const service = new window.google.maps.places.AutocompleteService();

        const inputString = typeof input === 'string'
            ? input
            : `${input.lat.toFixed(6)},${input.lng.toFixed(6)}`;

        service.getPlacePredictions(
            {
                input: inputString,
                componentRestrictions: { country: 'fr' },
                types: ['geocode', 'establishment']
            },
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

    const selectAutocompleteResult = (result: {id: string, description: string}) => {
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
        if (wp?.value) {
            if (typeof wp.value === 'string' && wp.value.trim()) {
                fetchAutocompleteResults(wp.value);
            } else if (typeof wp.value === 'object') {
                fetchAutocompleteResults(wp.value);
            }
        }
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setActiveInput(null);
            setAutocompleteResults([]);
        }, 200);
    };

    const handleTravelModeChange = (mode: TravelMode) => {
        setTravelMode(mode);
    };

    const setLocationAsWaypoint = (waypointId: string) => {
        if (!userPosition) {
            getUserLocation();
            return;
        }

        setWaypoints(prev =>
            prev.map(wp =>
                wp.id === waypointId
                    ? {
                        ...wp,
                        value: 'My Location',
                        isUserLocation: true
                    }
                    : wp
            )
        );
    };

    useEffect(() => {
        if (!isAuthenticated && (activeTab === 'favorites' || activeTab === 'share')) {
            setActiveTab('navigation');
        }
    }, [isAuthenticated, activeTab]);

    return (
        <>
            {!isPanelOpen && (
                <button
                    onClick={togglePanel}
                    className="absolute left-4 top-4 z-30 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105"
                >
                    <MenuIcon size={20} className="text-indigo-600" />
                </button>
            )}

            <div
                className="absolute left-0 top-0 z-20 bg-white shadow-xl transition-all duration-300 ease-in-out overflow-hidden h-full"
                style={{
                    width: isPanelOpen ? panelWidth : '0'
                }}
            >
                {isPanelOpen && (
                    <div className="flex flex-col h-full">
                        <div className="bg-indigo-600 text-white">
                            <div className="flex justify-between items-center py-4 px-4">
                                <h2 className="text-xl font-semibold flex items-center">
                                    <NavigationIcon size={20} className="mr-2" />
                                    Navigation
                                </h2>
                                <button
                                    onClick={togglePanel}
                                    className="text-white hover:text-gray-200"
                                    aria-label="Close navigation panel"
                                >
                                    <XIcon size={20} />
                                </button>
                            </div>

                            <div className="flex border-b border-indigo-500">
                                <button
                                    onClick={() => setActiveTab('navigation')}
                                    className={`flex-1 py-2 text-center ${
                                        activeTab === 'navigation'
                                            ? 'bg-white text-indigo-600 font-medium rounded-t-lg'
                                            : 'text-white hover:bg-indigo-500'
                                    }`}
                                >
                                    <NavigationIcon size={18} className="inline-block mr-1" />
                                    Route
                                </button>

                                <button
                                    onClick={() => isAuthenticated && setActiveTab('favorites')}
                                    className={`flex-1 py-2 text-center ${
                                        activeTab === 'favorites'
                                            ? 'bg-white text-indigo-600 font-medium rounded-t-lg'
                                            : isAuthenticated
                                                ? 'text-white hover:bg-indigo-500'
                                                : 'text-white/50 cursor-not-allowed'
                                    }`}
                                    disabled={!isAuthenticated}
                                    title={!isAuthenticated ? "Sign in to access favorites" : ""}
                                >
                                    <StarIcon size={18} className="inline-block mr-1" />
                                    Favorites
                                </button>

                                <button
                                    onClick={() => isAuthenticated && setActiveTab('share')}
                                    className={`flex-1 py-2 text-center ${
                                        activeTab === 'share'
                                            ? 'bg-white text-indigo-600 font-medium rounded-t-lg'
                                            : isAuthenticated
                                                ? 'text-white hover:bg-indigo-500'
                                                : 'text-white/50 cursor-not-allowed'
                                    }`}
                                    disabled={!isAuthenticated}
                                    title={!isAuthenticated ? "Sign in to share routes" : ""}
                                >
                                    <Share2Icon size={18} className="inline-block mr-1" />
                                    Share
                                </button>
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto p-4">
                            {activeTab === 'navigation' && (
                                <div className="space-y-4">
                                    <div className="space-y-3">
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
                                                        value={typeof wp.value === 'string'
                                                            ? wp.value
                                                            : wp.isUserLocation
                                                                ? 'My Location'
                                                                : `${wp.value.lat.toFixed(6)},${wp.value.lng.toFixed(6)}`}
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
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 flex items-center"
                                                            onClick={() => setLocationAsWaypoint(wp.id)}
                                                        >
                                                            <UserCircleIcon size={16} className="mr-2 text-blue-500" />
                                                            My Location
                                                        </div>

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
                                                className="flex items-center justify-center w-full py-2 border-dashed border border-indigo-300 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors"
                                            >
                                                <PlusIcon size={16} className="mr-1" />
                                                Add Waypoint
                                            </button>
                                        )}
                                    </div>

                                    <div className="mb-4 grid grid-cols-4 gap-2">
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

                                    <div className="mt-4">
                                        {!activeRoute ? (
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
                                        ) : (
                                            <button
                                                onClick={handleCancelRoute}
                                                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center"
                                            >
                                                <XCircleIcon size={18} className="mr-2" />
                                                Cancel Route
                                            </button>
                                        )}
                                    </div>

                                    {(limitedHistory.length > 0 || historyLoading) && (
                                        <div className="mt-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-semibold flex items-center">
                                                    <HistoryIcon size={18} className="mr-2 text-indigo-600" />
                                                    History
                                                </h3>

                                                {!isAuthenticated && (
                                                    <span className="text-xs text-gray-500">
                                                      Local history only
                                                    </span>
                                                )}
                                            </div>

                                            {historyLoading && (
                                                <div className="flex justify-center p-4">
                                                    <div className="animate-spin h-6 w-6 border-2 border-indigo-500 rounded-full border-t-transparent"></div>
                                                </div>
                                            )}

                                            <div className="space-y-2">
                                                {limitedHistory.length === 0 ? (
                                                    <p className="text-sm text-gray-500 italic">
                                                        No routes in history yet
                                                    </p>
                                                ) : (
                                                    limitedHistory.map(historyItem => (
                                                        <div
                                                            key={historyItem.id}
                                                            onClick={() => handleHistoryClick(historyItem)}
                                                            className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                                                        >
                                                            <p className="text-sm font-medium">
                                                                {historyItem.startAddress.split(',')[0]} → {historyItem.endAddress.split(',')[0]}
                                                            </p>
                                                            <div className="flex justify-between items-center text-xs text-gray-500">
                                                                <span>
                                                                    {(historyItem.kilometersDistance).toFixed(1)} km • {Math.round(historyItem.estimatedDurationInSeconds / 60)} min
                                                                </span>
                                                                <span>
                                                                    {new Date(historyItem.createdAt).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {!isAuthenticated && (
                                        <div className="mt-6 border-t pt-4">
                                            <button
                                                onClick={() => window.location.href = '/login'}
                                                className="w-full py-3 px-4 bg-white border border-indigo-500 text-indigo-700 hover:bg-indigo-50 font-medium rounded-lg shadow-sm transition-colors duration-300 flex items-center justify-center"
                                            >
                                                <UserCircleIcon size={18} className="mr-2" />
                                                Sign In
                                            </button>
                                            <p className="text-xs text-gray-500 text-center mt-2">
                                                Sign in to access more features
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'favorites' && isAuthenticated && (
                                <FavoriteLocations
                                    isAuthenticated={isAuthenticated}
                                    onSelectLocation={(address) => {
                                        setWaypoints(prev =>
                                            prev.map((wp, idx) =>
                                                idx === prev.length - 1
                                                    ? { ...wp, value: address, isUserLocation: false }
                                                    : wp
                                            )
                                        );
                                        setActiveTab('navigation');
                                    }}
                                />
                            )}

                            {activeTab === 'share' && isAuthenticated && (
                                <ShareOptions
                                    isAuthenticated={isAuthenticated}
                                    userPosition={userPosition}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SidePanel;