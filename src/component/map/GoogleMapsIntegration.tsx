import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNearbyAlerts } from '../../hooks/map/useNearbyAlerts';
import { useNearbyUsers } from '../../hooks/map/useNearbyUsers';
import { useRouteAlerts } from '../../hooks/map/useRouteAlerts';
import { useGeolocation } from '../../services/GeolocationContext';
import { Waypoint, TravelMode, RouteDetails } from '../../hooks/map/types/map.ts';

declare global {
    interface Window {
        google: typeof google;
        initMap: () => void;
        env?: { API_BASE_URL: string; GOOGLE_API_KEY: string };
    }
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

// Google Maps API loading state - shared across component instances
let mapsLoaded = false;
let mapsLoading = false;
const API_KEY = window.env?.GOOGLE_API_KEY ?? '';

// Helper function to debounce function calls
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

// Helper function to load Google Maps API
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

        // Define callback function for the Google Maps script
        window.initMap = () => {
            mapsLoaded = true;
            mapsLoading = false;
            console.log("Google Maps API loaded successfully");
            resolve();
        };

        // Create script element and append to document
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

const GoogleMapsIntegration: React.FC<Props> = ({
                                                    waypoints,
                                                    calculateRoute,
                                                    onRouteCalculated,
                                                    travelMode,
                                                    selectedRouteIndex,
                                                    showUserMarker = true,
                                                    isAuthenticated,
                                                    setWaypoints
                                                }) => {
    // Refs
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const lastLocationUpdateRef = useRef<number>(0);
    const lastNearbyUsersFetchRef = useRef<number>(0);
    const prevPositionRef = useRef<{lat: number, lng: number} | null>(null);
    const lastRouteAlertsFetchRef = useRef<number>(0);
    const initialWaypointsSetRef = useRef<boolean>(false);
    const isInitializedRef = useRef<boolean>(false);
    const lastRouteCalculationRef = useRef<number>(0);
    const directionChangeTimeoutRef = useRef<number | undefined>(undefined);
    const routeCalculationPendingRef = useRef<boolean>(false);

    // State
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const [mapError, setMapError] = useState<string | null>(null);
    const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
    const [currentRouteDetails, setCurrentRouteDetails] = useState<RouteDetails | null>(null);
    const [isRouteCalculationInProgress, setIsRouteCalculationInProgress] = useState(false);

    const { isGeolocationEnabled, userPosition: contextUserPosition } = useGeolocation();
    const { fetchAlerts, clearMarkers: clearAlertMarkers } = useNearbyAlerts(map);
    const { fetchNearbyUsers, clearMarkers: clearUserMarkers } = useNearbyUsers(map, isAuthenticated);
    const { fetchRouteAlerts, clearAlertMarkers: clearRouteAlertMarkers, extractRoutePoints } = useRouteAlerts(map);

    // Constants for rate limiting
    const MIN_LOCATION_UPDATE_INTERVAL = 180000; // 3 minutes
    const MIN_NEARBY_USERS_INTERVAL = 300000; // 5 minutes
    const MIN_ROUTE_ALERTS_INTERVAL = 60000; // 1 minute
    const MIN_ROUTE_CALCULATION_INTERVAL = 3000; // 3 seconds

    // Convert context userPosition format to Google Maps format
    const userPosition = contextUserPosition ? {
        lat: contextUserPosition.latitude,
        lng: contextUserPosition.longitude
    } : null;

    // Calculate route with rate limiting
    const calculateRouteWithRateLimit = useCallback(() => {
        if (!directionsService || !directionsRenderer || !isMapReady || !map) return;

        const now = Date.now();
        if (isRouteCalculationInProgress ||
            now - lastRouteCalculationRef.current < MIN_ROUTE_CALCULATION_INTERVAL ||
            routeCalculationPendingRef.current) {
            console.log("Throttled route calculation - too soon or already in progress");
            return;
        }

        // Filter valid waypoints
        const validWaypoints = waypoints.filter(w =>
            typeof w.value === 'string' ? w.value.trim() : true
        );

        if (validWaypoints.length < 2) {
            console.log("Not enough valid waypoints");
            return;
        }

        console.log("Calculating route...");
        setIsRouteCalculationInProgress(true);
        routeCalculationPendingRef.current = true;
        lastRouteCalculationRef.current = now;

        const origin = validWaypoints[0];
        const destination = validWaypoints[validWaypoints.length - 1];

        // Handle "My Location" waypoints
        const originParam = origin.isUserLocation && userPosition ? userPosition : origin.value;
        const destParam = destination.isUserLocation && userPosition ? userPosition : destination.value;

        // Create waypoints array for intermediate stops
        const waypointParams = validWaypoints.slice(1, -1).map(w => ({
            location: w.isUserLocation && userPosition ? userPosition : w.value,
            stopover: true
        }));

        // Configure route request
        const routeConfig: google.maps.DirectionsRequest = {
            origin: originParam,
            destination: destParam,
            waypoints: waypointParams,
            travelMode: window.google.maps.TravelMode[travelMode],
            optimizeWaypoints: true,
            provideRouteAlternatives: true
        };

        // Add travel mode specific options
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

                // Schedule route alerts fetch with a longer delay to avoid API rate limits
                const now = Date.now();
                if (now - lastRouteAlertsFetchRef.current > MIN_ROUTE_ALERTS_INTERVAL) {
                    lastRouteAlertsFetchRef.current = now;

                    setTimeout(() => {
                        if (isInitializedRef.current) {
                            const routePoints = extractRoutePoints(result);
                            if (routePoints.length > 0) {
                                clearRouteAlertMarkers();
                                fetchRouteAlerts(routePoints);
                            }
                        }
                    }, 5000); // Delay route alerts fetch by 5 seconds
                } else {
                    console.log("Throttled fetchRouteAlerts - too soon");
                }
            } else {
                console.error('Route calculation error:', status);
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
        extractRoutePoints,
        clearRouteAlertMarkers,
        fetchRouteAlerts,
        isRouteCalculationInProgress
    ]);

    // Debounced version of route calculation
    const debouncedCalculateRoute = useCallback(
        debounce(() => {
            calculateRouteWithRateLimit();
        }, 500),
        [calculateRouteWithRateLimit]
    );

    // Initialize map
    useEffect(() => {
        let isMounted = true;

        const initializeMap = async () => {
            if (!mapContainerRef.current) return;

            try {
                console.log("Loading Google Maps API...");
                await loadMapsAPI();

                if (!isMounted || !mapContainerRef.current) return;

                console.log("Creating map instance...");
                // Default center (Paris)
                const defaultCenter = { lat: 48.8566, lng: 2.3522 };

                // Map options
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
                    // Create map instance
                    const mapInstance = new window.google.maps.Map(mapContainerRef.current, mapOptions);
                    setMap(mapInstance);

                    // Create directions service
                    setDirectionsService(new window.google.maps.DirectionsService());

                    // Create directions renderer with draggable waypoints
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

                    // Add a debounced event listener for directions_changed
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

                                // Only fetch route alerts if enough time has passed
                                const now = Date.now();
                                if (now - lastRouteAlertsFetchRef.current > MIN_ROUTE_ALERTS_INTERVAL) {
                                    lastRouteAlertsFetchRef.current = now;

                                    setTimeout(() => {
                                        if (isInitializedRef.current) {
                                            const routePoints = extractRoutePoints(result);
                                            if (routePoints.length > 0) {
                                                clearRouteAlertMarkers();
                                                fetchRouteAlerts(routePoints);
                                            }
                                        }
                                    }, 5000); // Longer delay to avoid API throttling
                                } else {
                                    console.log("Throttled fetchRouteAlerts - too soon");
                                }

                                // Notify parent component if callback provided
                                if (onRouteCalculated) {
                                    onRouteCalculated(result as unknown as RouteDetails);
                                }
                            }
                        }, 1000); // Wait 1 second before processing direction changes
                    });

                    setDirectionsRenderer(renderer);

                    // Mark map as ready
                    setIsMapReady(true);
                    isInitializedRef.current = true;
                    console.log("Map initialized successfully");

                    // Fetch initial alerts for the default center after a delay
                    // to avoid immediate API call limitations
                    setTimeout(() => {
                        if (isMounted) {
                            fetchAlerts(defaultCenter.lat, defaultCenter.lng);
                        }
                    }, 2000); // Increased delay to 2 seconds
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Maps initialization error:', error);
                    setMapError('Google Maps initialization error. Please refresh the page.');
                }
            }
        };

        initializeMap();

        // Cleanup function
        return () => {
            isMounted = false;
            isInitializedRef.current = false;

            if (userMarker) userMarker.setMap(null);
            clearAlertMarkers();
            clearUserMarkers();
            clearRouteAlertMarkers();
            if (directionsRenderer) directionsRenderer.setMap(null);

            if (directionChangeTimeoutRef.current !== undefined) {
                clearTimeout(directionChangeTimeoutRef.current);
                directionChangeTimeoutRef.current = undefined;
            }
        };
    }, []); // Empty dependency array to run only once

    // Update user marker when position changes
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

            // Center map on first position update
            if (!prevPositionRef.current) {
                map.setCenter(userPosition);
                map.setZoom(15);
            }

            // Set initial waypoints if authenticated and not already set
            if (isAuthenticated && setWaypoints && !initialWaypointsSetRef.current && userPosition) {
                console.log("Setting initial waypoint to user location");
                setWaypoints(prev => {
                    // Only modify the start waypoint
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

            // Rate-limited alerts fetching based on significant position changes
            const now = Date.now();
            if (now - lastLocationUpdateRef.current > MIN_LOCATION_UPDATE_INTERVAL) {
                lastLocationUpdateRef.current = now;
                console.log("Fetching alerts based on user position");

                // Stagger API calls with timeouts
                setTimeout(() => {
                    if (isInitializedRef.current) {
                        fetchAlerts(userPosition.lat, userPosition.lng);

                        // Fetch nearby users with an additional delay if authenticated
                        if (isAuthenticated && isGeolocationEnabled) {
                            if (now - lastNearbyUsersFetchRef.current > MIN_NEARBY_USERS_INTERVAL) {
                                setTimeout(() => {
                                    if (isInitializedRef.current) {
                                        fetchNearbyUsers(userPosition.lat, userPosition.lng);
                                        lastNearbyUsersFetchRef.current = now;
                                    }
                                }, 3000); // Increased delay to 3 seconds
                            }
                        }
                    }
                }, 1000); // Initial delay of 1 second
            }
        }
    }, [
        map,
        userPosition,
        showUserMarker,
        userMarker,
        isAuthenticated,
        isGeolocationEnabled,
        fetchAlerts,
        fetchNearbyUsers,
        setWaypoints
    ]);

    // Update user marker visibility
    useEffect(() => {
        if (userMarker) {
            userMarker.setVisible(showUserMarker);
        }
    }, [showUserMarker, userMarker]);

    // Trigger route calculation when requested with debouncing
    useEffect(() => {
        if (!calculateRoute) return;
        debouncedCalculateRoute();
    }, [
        calculateRoute,
        waypoints,
        travelMode,
        debouncedCalculateRoute
    ]);

    // Update selected route with rate limiting
    useEffect(() => {
        if (!directionsRenderer || !currentRouteDetails || !isInitializedRef.current) return;

        try {
            // Update route index
            directionsRenderer.setRouteIndex(selectedRouteIndex);

            // Only fetch alerts if current route details exist and enough time has passed
            const now = Date.now();
            if (now - lastRouteAlertsFetchRef.current > MIN_ROUTE_ALERTS_INTERVAL) {
                lastRouteAlertsFetchRef.current = now;

                setTimeout(() => {
                    if (isInitializedRef.current) {
                        const routePoints = extractRoutePoints(currentRouteDetails);
                        if (routePoints.length > 0) {
                            clearRouteAlertMarkers();
                            fetchRouteAlerts(routePoints);
                        }
                    }
                }, 5000); // Longer delay to avoid API throttling
            } else {
                console.log("Throttled fetchRouteAlerts - too soon");
            }
        } catch (error) {
            console.error('Error updating route index:', error);
        }
    }, [
        selectedRouteIndex,
        directionsRenderer,
        currentRouteDetails,
        extractRoutePoints,
        clearRouteAlertMarkers,
        fetchRouteAlerts
    ]);

    // Adjust map bounds to fit route
    useEffect(() => {
        if (!directionsRenderer || !map || !currentRouteDetails || !isInitializedRef.current) return;

        try {
            const directions = directionsRenderer.getDirections();
            if (!directions) return;

            const route = directions.routes[selectedRouteIndex];
            if (!route || !route.bounds) return;

            const panel = document.querySelector<HTMLElement>('.route-info-panel');
            const bottomPadding = panel ? panel.clientHeight + 16 : 200;

            // Adjust bounds with margins for easy navigation
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

    // Center map on user location
    const centerMapOnUserLocation = useCallback(() => {
        if (map && userPosition) {
            map.setCenter(userPosition);
            map.setZoom(15);
        }
    }, [map, userPosition]);

    // Fit map to route
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

            {/* Map control buttons */}
            <div className="absolute bottom-24 right-4 z-10 space-y-2">
                {/* Center on user location button */}
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

                {/* Fit to route button */}
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
};

export default GoogleMapsIntegration;