import React, { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { useNearbyUsers } from '../../hooks/map/useNearbyUsers';
import { useGeolocation } from '../../services/GeolocationContext';
import { Waypoint, TravelMode, RouteDetails } from '../../hooks/map/types/map.ts';

declare global {
    interface Window {
        google: typeof google;
        initMap: () => void;
        env?: { API_BASE_URL: string; GOOGLE_API_KEY: string };
    }
}

export interface GoogleMapsRef {
    clearRoute: () => void;
}

interface Props {
    waypoints: Waypoint[];
    calculateRoute: boolean;
    onRouteCalculated?: (routeDetails: RouteDetails) => void;
    travelMode: TravelMode;
    selectedRouteIndex: number;
    showUserMarker?: boolean;
    isAuthenticated: boolean;
    setWaypoints?: React.Dispatch<React.SetStateAction<Waypoint[]>>;
}

let mapsLoaded = false;
let mapsLoading = false;
const API_KEY = window.env?.GOOGLE_API_KEY ?? '';

const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
    let timeout: number | undefined;
    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const loadMapsAPI = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        if (mapsLoaded) return resolve();

        if (mapsLoading) {
            const checkInterval = setInterval(() => {
                if (mapsLoaded) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
            return;
        }

        mapsLoading = true;

        window.initMap = () => {
            mapsLoaded = true;
            mapsLoading = false;
            console.log("Google Maps API loaded successfully");
            resolve();
        };

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap&loading=async`;
        script.async = true;
        script.defer = true;
        script.onerror = (error) => {
            mapsLoading = false;
            console.error("Failed to load Google Maps API:", error);
            reject(new Error('Failed to load Google Maps API'));
        };

        document.head.appendChild(script);
    });
};

const GoogleMapsIntegration = forwardRef<GoogleMapsRef, Props>((props, ref) => {
    const {
        waypoints,
        calculateRoute,
        onRouteCalculated,
        travelMode,
        selectedRouteIndex,
        showUserMarker = true,
        isAuthenticated,
        setWaypoints
    } = props;

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const lastLocationUpdateRef = useRef<number>(0);
    const lastNearbyUsersFetchRef = useRef<number>(0);
    const prevPositionRef = useRef<{lat: number, lng: number} | null>(null);
    const initialWaypointsSetRef = useRef<boolean>(false);
    const isInitializedRef = useRef<boolean>(false);
    const lastRouteCalculationRef = useRef<number>(0);
    const directionChangeTimeoutRef = useRef<number | undefined>(undefined);
    const routeCalculationPendingRef = useRef<boolean>(false);

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const [mapError, setMapError] = useState<string | null>(null);
    const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
    const [currentRouteDetails, setCurrentRouteDetails] = useState<RouteDetails | null>(null);
    const [isRouteCalculationInProgress, setIsRouteCalculationInProgress] = useState(false);

    const { isGeolocationEnabled, userPosition: contextUserPosition } = useGeolocation();
    const { fetchNearbyUsers, clearMarkers: clearUserMarkers } = useNearbyUsers(map, isAuthenticated);

    useImperativeHandle(ref, () => ({
        clearRoute: () => {
            if (directionsRenderer) {
                try {
                    directionsRenderer.setMap(null);

                    const newRenderer = new window.google.maps.DirectionsRenderer({
                        map,
                        draggable: true,
                        polylineOptions: {
                            strokeColor: '#4F46E5',
                            strokeWeight: 5
                        },
                        markerOptions: {
                            icon: {
                                path: window.google.maps.SymbolPath.CIRCLE,
                                scale: 7,
                                fillOpacity: 1,
                                fillColor: '#4F46E5',
                                strokeWeight: 2,
                                strokeColor: '#ffffff'
                            },
                            draggable: true
                        }
                    });

                    newRenderer.addListener('directions_changed', () => {
                        if (directionChangeTimeoutRef.current !== undefined) {
                            clearTimeout(directionChangeTimeoutRef.current);
                            directionChangeTimeoutRef.current = undefined;
                        }

                        directionChangeTimeoutRef.current = setTimeout(() => {
                            const result = newRenderer.getDirections();
                            if (result) {
                                console.log("Route updated via drag-and-drop");
                                setCurrentRouteDetails(result as unknown as RouteDetails);

                                if (onRouteCalculated) {
                                    onRouteCalculated(result as unknown as RouteDetails);
                                }
                            }
                        }, 1000);
                    });

                    setDirectionsRenderer(newRenderer);
                    setCurrentRouteDetails(null);
                    console.log("Route cleared from map");
                } catch (error) {
                    console.error("Error while clearing route:", error);
                }
            }
        }
    }), [directionsRenderer, map, onRouteCalculated]);

    const MIN_LOCATION_UPDATE_INTERVAL = 180000;
    const MIN_NEARBY_USERS_INTERVAL = 300000;
    const MIN_ROUTE_CALCULATION_INTERVAL = 3000;

    const userPosition = contextUserPosition ? {
        lat: contextUserPosition.latitude,
        lng: contextUserPosition.longitude
    } : null;

    const calculateRouteWithRateLimit = useCallback(() => {
        if (!directionsService || !directionsRenderer || !isMapReady || !map) return;

        const now = Date.now();
        if (isRouteCalculationInProgress ||
            now - lastRouteCalculationRef.current < MIN_ROUTE_CALCULATION_INTERVAL ||
            routeCalculationPendingRef.current) {
            console.log("Throttled route calculation - too soon or already in progress");
            return;
        }

        const hasUserLocation = waypoints.some(wp => wp.isUserLocation || wp.value === 'My Location');
        if (hasUserLocation && !userPosition) {
            console.error("Route requires user location but position is not available");
            setMapError("Unable to use your location. Please make sure location services are enabled.");
            setIsRouteCalculationInProgress(false);
            return;
        }

        const validWaypoints = waypoints.filter(wp => {
            if (wp.isUserLocation && userPosition) return true;

            if (typeof wp.value === 'string' && wp.value === 'My Location' && userPosition) return true;

            return typeof wp.value === 'string' ? wp.value.trim() !== '' : true;
        });

        if (validWaypoints.length < 2) {
            console.log("Not enough valid waypoints");
            return;
        }

        console.log("Calculating route with waypoints:", validWaypoints);
        setIsRouteCalculationInProgress(true);
        routeCalculationPendingRef.current = true;
        lastRouteCalculationRef.current = now;

        const origin = validWaypoints[0];
        const destination = validWaypoints[validWaypoints.length - 1];

        let originParam;
        if ((origin.isUserLocation || origin.value === 'My Location') && userPosition) {
            originParam = userPosition;
            console.log("Using user position for origin:", originParam);
        } else {
            originParam = origin.value;
        }

        let destParam;
        if ((destination.isUserLocation || destination.value === 'My Location') && userPosition) {
            destParam = userPosition;
            console.log("Using user position for destination:", destParam);
        } else {
            destParam = destination.value;
        }

        const waypointParams = validWaypoints.slice(1, -1).map(wp => {
            let location;
            if ((wp.isUserLocation || wp.value === 'My Location') && userPosition) {
                location = userPosition;
            } else {
                location = wp.value;
            }
            return {
                location,
                stopover: true
            };
        });

        const routeConfig: google.maps.DirectionsRequest = {
            origin: originParam,
            destination: destParam,
            waypoints: waypointParams,
            travelMode: window.google.maps.TravelMode[travelMode],
            optimizeWaypoints: true,
            provideRouteAlternatives: true
        };

        if (travelMode === 'DRIVING') {
            routeConfig.drivingOptions = {
                departureTime: new Date(),
                trafficModel: window.google.maps.TrafficModel.BEST_GUESS
            };
        } else if (travelMode === 'TRANSIT') {
            routeConfig.transitOptions = {
                departureTime: new Date(),
                modes: [window.google.maps.TransitMode.BUS, window.google.maps.TransitMode.RAIL],
                routingPreference: window.google.maps.TransitRoutePreference.FEWER_TRANSFERS
            };
        }

        console.log("Route request config:", routeConfig);

        directionsService.route(routeConfig, (result, status) => {
            setIsRouteCalculationInProgress(false);
            routeCalculationPendingRef.current = false;

            if (status === window.google.maps.DirectionsStatus.OK && result) {
                console.log("Route calculation successful");

                directionsRenderer.setDirections(result);
                directionsRenderer.setRouteIndex(selectedRouteIndex);

                setCurrentRouteDetails(result as unknown as RouteDetails);

                if (onRouteCalculated) {
                    onRouteCalculated(result as unknown as RouteDetails);
                }
            } else {
                console.error('Route calculation error:', status, routeConfig);
                setMapError(`Route calculation failed: ${status}`);
            }
        });
    }, [
        directionsService,
        directionsRenderer,
        isMapReady,
        map,
        waypoints,
        travelMode,
        userPosition,
        selectedRouteIndex,
        onRouteCalculated,
        isRouteCalculationInProgress
    ]);

    const debouncedCalculateRoute = useCallback(
        debounce(() => {
            calculateRouteWithRateLimit();
        }, 500),
        [calculateRouteWithRateLimit]
    );

    useEffect(() => {
        let isMounted = true;

        const initializeMap = async () => {
            if (!mapContainerRef.current) return;

            try {
                console.log("Loading Google Maps API...");
                await loadMapsAPI();

                if (!isMounted || !mapContainerRef.current) return;

                console.log("Creating map instance...");
                const defaultCenter = { lat: 48.8566, lng: 2.3522 };

                const mapOptions: google.maps.MapOptions = {
                    center: defaultCenter,
                    zoom: 12,
                    mapTypeControl: true,
                    fullscreenControl: true,
                    streetViewControl: true,
                    zoomControl: true,
                    draggable: true,
                    clickableIcons: true,
                    gestureHandling: "greedy",
                    mapTypeControlOptions: {
                        position: window.google.maps.ControlPosition.TOP_RIGHT
                    },
                    fullscreenControlOptions: {
                        position: window.google.maps.ControlPosition.RIGHT_TOP
                    },
                    streetViewControlOptions: {
                        position: window.google.maps.ControlPosition.RIGHT_TOP
                    },
                    zoomControlOptions: {
                        position: window.google.maps.ControlPosition.RIGHT_TOP
                    }
                };

                if (window.google && window.google.maps) {
                    const mapInstance = new window.google.maps.Map(mapContainerRef.current, mapOptions);
                    setMap(mapInstance);

                    setDirectionsService(new window.google.maps.DirectionsService());

                    const renderer = new window.google.maps.DirectionsRenderer({
                        map: mapInstance,
                        draggable: true,
                        polylineOptions: {
                            strokeColor: '#4F46E5',
                            strokeWeight: 5
                        },
                        markerOptions: {
                            icon: {
                                path: window.google.maps.SymbolPath.CIRCLE,
                                scale: 7,
                                fillOpacity: 1,
                                fillColor: '#4F46E5',
                                strokeWeight: 2,
                                strokeColor: '#ffffff'
                            },
                            draggable: true
                        }
                    });

                    renderer.addListener('directions_changed', () => {
                        if (directionChangeTimeoutRef.current !== undefined) {
                            clearTimeout(directionChangeTimeoutRef.current);
                            directionChangeTimeoutRef.current = undefined;
                        }

                        directionChangeTimeoutRef.current = setTimeout(() => {
                            const result = renderer.getDirections();
                            if (result) {
                                console.log("Route updated via drag-and-drop");
                                setCurrentRouteDetails(result as unknown as RouteDetails);

                                // Notify parent component if callback provided
                                if (onRouteCalculated) {
                                    onRouteCalculated(result as unknown as RouteDetails);
                                }
                            }
                        }, 1000);
                    });

                    setDirectionsRenderer(renderer);

                    setIsMapReady(true);
                    isInitializedRef.current = true;
                    console.log("Map initialized successfully");
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Maps initialization error:', error);
                    setMapError('Google Maps initialization error. Please refresh the page.');
                }
            }
        };

        initializeMap();

        return () => {
            isMounted = false;
            isInitializedRef.current = false;

            if (userMarker) userMarker.setMap(null);
            clearUserMarkers();
            if (directionsRenderer) directionsRenderer.setMap(null);

            if (directionChangeTimeoutRef.current !== undefined) {
                clearTimeout(directionChangeTimeoutRef.current);
                directionChangeTimeoutRef.current = undefined;
            }
        };
    }, []);

    useEffect(() => {
        if (!map || !userPosition || !isInitializedRef.current) return;

        const hasSignificantChange = !prevPositionRef.current ||
            Math.abs(prevPositionRef.current.lat - userPosition.lat) > 0.0005 ||
            Math.abs(prevPositionRef.current.lng - userPosition.lng) > 0.0005;

        if (hasSignificantChange) {
            prevPositionRef.current = userPosition;

            if (userMarker) {
                userMarker.setPosition(userPosition);
            } else if (showUserMarker) {
                const marker = new window.google.maps.Marker({
                    position: userPosition,
                    map,
                    title: 'Your location',
                    icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillOpacity: 1,
                        fillColor: '#4F46E5',
                        strokeWeight: 2,
                        strokeColor: '#ffffff'
                    },
                    zIndex: 999
                });
                setUserMarker(marker);
            }

            if (!prevPositionRef.current) {
                map.setCenter(userPosition);
                map.setZoom(15);
            }

            if (isAuthenticated && setWaypoints && !initialWaypointsSetRef.current && userPosition) {
                console.log("Setting initial waypoint to user location");
                setWaypoints(prev => {
                    const updatedWaypoints = [...prev];
                    if (updatedWaypoints[0] && updatedWaypoints[0].id === 'start') {
                        updatedWaypoints[0] = {
                            ...updatedWaypoints[0],
                            value: 'My Location',
                            isUserLocation: true
                        };
                    }
                    return updatedWaypoints;
                });
                initialWaypointsSetRef.current = true;
            }

            const now = Date.now();
            if (now - lastLocationUpdateRef.current > MIN_LOCATION_UPDATE_INTERVAL) {
                lastLocationUpdateRef.current = now;

                if (isAuthenticated && isGeolocationEnabled) {
                    if (now - lastNearbyUsersFetchRef.current > MIN_NEARBY_USERS_INTERVAL) {
                        setTimeout(() => {
                            if (isInitializedRef.current) {
                                fetchNearbyUsers(userPosition.lat, userPosition.lng);
                                lastNearbyUsersFetchRef.current = now;
                            }
                        }, 3000);
                    }
                }
            }
        }
    }, [
        map,
        userPosition,
        showUserMarker,
        userMarker,
        isAuthenticated,
        isGeolocationEnabled,
        fetchNearbyUsers,
        setWaypoints
    ]);

    useEffect(() => {
        if (userMarker) {
            userMarker.setVisible(showUserMarker);
        }
    }, [showUserMarker, userMarker]);

    useEffect(() => {
        if (!calculateRoute) return;
        debouncedCalculateRoute();
    }, [
        calculateRoute,
        waypoints,
        travelMode,
        debouncedCalculateRoute
    ]);

    useEffect(() => {
        if (!directionsRenderer || !currentRouteDetails || !isInitializedRef.current) return;

        try {
            directionsRenderer.setRouteIndex(selectedRouteIndex);
        } catch (error) {
            console.error('Error updating route index:', error);
        }
    }, [
        selectedRouteIndex,
        directionsRenderer,
        currentRouteDetails
    ]);

    useEffect(() => {
        if (!directionsRenderer || !map || !currentRouteDetails || !isInitializedRef.current) return;

        try {
            const directions = directionsRenderer.getDirections();
            if (!directions) return;

            const route = directions.routes[selectedRouteIndex];
            if (!route || !route.bounds) return;

            const panel = document.querySelector<HTMLElement>('.route-info-panel');
            const bottomPadding = panel ? panel.clientHeight + 16 : 200;

            map.fitBounds(route.bounds, {
                top: 50,
                bottom: bottomPadding,
                left: 20,
                right: 20
            });
        } catch (error) {
            console.error('Error fitting map to bounds:', error);
        }
    }, [selectedRouteIndex, directionsRenderer, map, currentRouteDetails]);

    const centerMapOnUserLocation = useCallback(() => {
        if (map && userPosition) {
            map.setCenter(userPosition);
            map.setZoom(15);
        }
    }, [map, userPosition]);

    const fitMapToRoute = useCallback(() => {
        if (!directionsRenderer || !map || !currentRouteDetails) return;

        try {
            const directions = directionsRenderer.getDirections();
            if (!directions) return;

            const route = directions.routes[selectedRouteIndex];
            if (!route || !route.bounds) return;

            const panel = document.querySelector<HTMLElement>('.route-info-panel');
            const bottomPadding = panel ? panel.clientHeight + 16 : 200;

            map.fitBounds(route.bounds, {
                top: 50,
                bottom: bottomPadding,
                left: 20,
                right: 20
            });
        } catch (error) {
            console.error('Error fitting map to bounds:', error);
        }
    }, [directionsRenderer, map, currentRouteDetails, selectedRouteIndex]);

    return (
        <div className="w-full h-full relative">
            <div ref={mapContainerRef} className="w-full h-full" />

            {!isMapReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
                </div>
            )}

            {mapError && (
                <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    <p className="font-medium">{mapError}</p>
                    <button
                        onClick={() => setMapError(null)}
                        className="absolute top-2 right-2 text-white"
                        aria-label="Close error message"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="absolute bottom-24 right-4 z-10 space-y-2">
                {userPosition && (
                    <button
                        onClick={centerMapOnUserLocation}
                        className="bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-colors duration-300"
                        aria-label="Center map on your location"
                        title="Center map on your location"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2"
                            />
                        </svg>
                    </button>
                )}

                {currentRouteDetails && (
                    <button
                        onClick={fitMapToRoute}
                        className="bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-colors duration-300"
                        aria-label="Fit map to route"
                        title="Fit map to route"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
});

GoogleMapsIntegration.displayName = 'GoogleMapsIntegration';

export default GoogleMapsIntegration;