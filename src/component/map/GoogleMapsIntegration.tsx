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

    // State
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const [mapError, setMapError] = useState<string | null>(null);
    const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
    const [currentRouteDetails, setCurrentRouteDetails] = useState<RouteDetails | null>(null);

    // Custom hooks
    const { isGeolocationEnabled, userPosition: contextUserPosition } = useGeolocation();
    const { fetchAlerts, clearMarkers: clearAlertMarkers } = useNearbyAlerts(map);
    const { fetchNearbyUsers, clearMarkers: clearUserMarkers } = useNearbyUsers(map, isAuthenticated);
    const { fetchRouteAlerts, clearAlertMarkers: clearRouteAlertMarkers, extractRoutePoints } = useRouteAlerts(map);

    // Convert context userPosition format to Google Maps format
    const userPosition = contextUserPosition ? {
        lat: contextUserPosition.latitude,
        lng: contextUserPosition.longitude
    } : null;

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

                    // Create directions renderer
                    const renderer = new window.google.maps.DirectionsRenderer({
                        map: mapInstance,
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
                            }
                        }
                    });
                    setDirectionsRenderer(renderer);

                    // Mark map as ready
                    setIsMapReady(true);
                    isInitializedRef.current = true;
                    console.log("Map initialized successfully");

                    // Fetch initial alerts for the default center after a short delay
                    // to avoid immediate API call limitations
                    setTimeout(() => {
                        if (isMounted) {
                            fetchAlerts(defaultCenter.lat, defaultCenter.lng);
                        }
                    }, 1000);
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

            // Mettre à jour les waypoints avec la position actuelle si l'utilisateur est authentifié
            // et que les waypoints n'ont pas encore été définis
            if (isAuthenticated && setWaypoints && !initialWaypointsSetRef.current && userPosition) {
                console.log("Setting initial waypoint to user location");
                setWaypoints(prev => {
                    // Modifier uniquement le point de départ
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

            // Fetch alerts only if position changed significantly and enough time has passed
            const now = Date.now();
            const MIN_LOCATION_UPDATE_INTERVAL = 180000; // 3 minutes

            if (now - lastLocationUpdateRef.current > MIN_LOCATION_UPDATE_INTERVAL) {
                lastLocationUpdateRef.current = now;
                console.log("Fetching alerts based on user position");

                // Ensure enough time between API calls by using a timeout
                setTimeout(() => {
                    if (isInitializedRef.current) {
                        fetchAlerts(userPosition.lat, userPosition.lng);

                        // Fetch nearby users if authenticated after a small delay
                        if (isAuthenticated && isGeolocationEnabled) {
                            const MIN_NEARBY_USERS_INTERVAL = 300000; // 5 minutes

                            if (now - lastNearbyUsersFetchRef.current > MIN_NEARBY_USERS_INTERVAL) {
                                setTimeout(() => {
                                    if (isInitializedRef.current) {
                                        fetchNearbyUsers(userPosition.lat, userPosition.lng);
                                        lastNearbyUsersFetchRef.current = now;
                                    }
                                }, 2000); // 2 second delay to avoid API throttling
                            }
                        }
                    }
                }, 500);
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

    // Calculate route when requested
    useEffect(() => {
        if (!calculateRoute || !directionsService || !directionsRenderer || !isMapReady || !map) return;

        console.log("Calculating route...");

        // Filter valid waypoints
        const validWaypoints = waypoints.filter(w =>
            typeof w.value === 'string' ? w.value.trim() : true
        );

        if (validWaypoints.length < 2) {
            console.log("Not enough valid waypoints");
            return;
        }

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

        // Request route
        directionsService.route(routeConfig, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK && result) {
                console.log("Route calculation successful");

                // Display route
                directionsRenderer.setDirections(result);
                directionsRenderer.setRouteIndex(selectedRouteIndex);

                // Store route details
                setCurrentRouteDetails(result as unknown as RouteDetails);

                // Notify parent component
                if (onRouteCalculated) {
                    onRouteCalculated(result as unknown as RouteDetails);
                }

                // Fetch alerts for this route after a short delay
                setTimeout(() => {
                    if (isInitializedRef.current) {
                        const routePoints = extractRoutePoints(result);
                        if (routePoints.length > 0) {
                            fetchRouteAlerts(routePoints);
                        }
                    }
                }, 1000);
            } else {
                console.error('Route calculation error:', status);
                setMapError(`Route calculation failed: ${status}`);
            }
        });
    }, [
        calculateRoute,
        waypoints,
        directionsService,
        directionsRenderer,
        isMapReady,
        map,
        travelMode,
        userPosition,
        selectedRouteIndex,
        onRouteCalculated,
        extractRoutePoints,
        fetchRouteAlerts
    ]);

    // Update selected route
    useEffect(() => {
        if (!directionsRenderer || !currentRouteDetails || !isInitializedRef.current) return;

        try {
            // Update route index
            directionsRenderer.setRouteIndex(selectedRouteIndex);

            // Fetch alerts for selected route with rate limiting
            const MIN_FETCH_INTERVAL = 30000; // 30 seconds
            const now = Date.now();
            const lastFetchTime = lastRouteAlertsFetchRef.current || 0;

            if (now - lastFetchTime > MIN_FETCH_INTERVAL) {
                lastRouteAlertsFetchRef.current = now;

                setTimeout(() => {
                    if (isInitializedRef.current) {
                        const routePoints = extractRoutePoints(currentRouteDetails);
                        if (routePoints.length > 0) {
                            clearRouteAlertMarkers();
                            fetchRouteAlerts(routePoints);
                        }
                    }
                }, 500);
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

            {userPosition && (
                <div className="absolute bottom-24 right-4 z-10">
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
                </div>
            )}
        </div>
    );
};

export default GoogleMapsIntegration;