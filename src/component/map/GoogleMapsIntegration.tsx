import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNearbyAlerts } from '../../hooks/map/useNearbyAlerts';
import { useNearbyUsers } from '../../hooks/map/useNearbyUsers';
import { useRouteAlerts } from '../../hooks/map/useRouteAlerts';
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
}

let mapsLoaded = false;
let mapsLoading = false;
const KEY = window.env?.GOOGLE_API_KEY ?? '';

const loadMaps = () =>
    new Promise<void>((res, rej) => {
        if (mapsLoaded) return res();
        if (mapsLoading) {
            const id = setInterval(() => {
                if (mapsLoaded) {
                    clearInterval(id);
                    res();
                }
            }, 100);
            return;
        }
        mapsLoading = true;
        window.initMap = () => {
            mapsLoaded = true;
            mapsLoading = false;
            res();
        };
        const s = document.createElement('script');
        s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places&callback=initMap&loading=async`;
        s.async = true;
        s.defer = true;
        s.onerror = rej;
        document.head.appendChild(s);
    });

const GoogleMapsIntegration: React.FC<Props> = ({
                                                    waypoints,
                                                    calculateRoute,
                                                    onRouteCalculated,
                                                    travelMode,
                                                    selectedRouteIndex,
                                                    showUserMarker = true,
                                                    isAuthenticated
                                                }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [svc, setSvc] = useState<google.maps.DirectionsService | null>(null);
    const [rend, setRend] = useState<google.maps.DirectionsRenderer | null>(null);
    const [ready, setReady] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null);
    const [currentRouteDetails, setCurrentRouteDetails] = useState<any>(null);
    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

    // Référence pour limiter les appels API
    const lastLocationUpdateRef = useRef<number>(0);
    const lastNearbyUsersFetchRef = useRef<number>(0);
    const prevPositionRef = useRef<{lat: number, lng: number} | null>(null);
    const MIN_LOCATION_UPDATE_INTERVAL = 180000; // 3 minutes

    // Utilisation des hooks avec map potentiellement null au début
    const { fetchAlerts, clearMarkers: clearAlertMarkers } = useNearbyAlerts(map);
    const {
        fetchNearbyUsers,
        clearMarkers: clearUserMarkers
    } = useNearbyUsers(map, isAuthenticated);
    const {
        fetchRouteAlerts,
        clearAlertMarkers: clearRouteAlertMarkers,
        extractRoutePoints
    } = useRouteAlerts(map);

    // Fonction pour obtenir la position de l'utilisateur
    // IMPORTANT : Cette fonction ne doit être appelée qu'en réponse à une interaction utilisateur
    // ou après l'initialisation initiale de la carte
    const getUserLocation = useCallback(() => {
        // Limiter la fréquence des mises à jour de position
        const now = Date.now();
        if (now - lastLocationUpdateRef.current < MIN_LOCATION_UPDATE_INTERVAL) {
            return;
        }

        lastLocationUpdateRef.current = now;

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    const hasSignificantChange = !prevPositionRef.current ||
                        Math.abs(prevPositionRef.current.lat - coords.lat) > 0.0005 ||
                        Math.abs(prevPositionRef.current.lng - coords.lng) > 0.0005;

                    if (hasSignificantChange) {
                        setUserPosition(coords);
                        prevPositionRef.current = coords;
                        setLocationPermissionGranted(true);

                        if (map && showUserMarker) {
                            if (userMarker) {
                                userMarker.setPosition(coords);
                            } else {
                                const marker = new window.google.maps.Marker({
                                    position: coords,
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

                            // Centrer uniquement lors de l'initialisation
                            if (!prevPositionRef.current) {
                                map.setCenter(coords);
                                map.setZoom(15);
                            }
                        }

                        // Récupérer les alertes seulement si changement significatif
                        fetchAlerts(coords.lat, coords.lng);

                        // Récupérer les utilisateurs à proximité avec limitation
                        if (isAuthenticated && locationPermissionGranted) {
                            // Vérifier l'intervalle minimum
                            const currentTime = Date.now();
                            if (currentTime - lastNearbyUsersFetchRef.current > 300000) { // 5 minutes
                                fetchNearbyUsers(coords.lat, coords.lng);
                                lastNearbyUsersFetchRef.current = currentTime;
                            }
                        }
                    }
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setLocationPermissionGranted(false);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
            );
        }
    }, [
        map,
        showUserMarker,
        userMarker,
        fetchAlerts,
        isAuthenticated,
        locationPermissionGranted,
        fetchNearbyUsers
    ]);

    // Initialisation de la carte
    useEffect(() => {
        let mounted = true;

        (async () => {
            if (!ref.current) return;

            try {
                await loadMaps();

                if (!mounted || !ref.current) return;

                const defaultCenter = { lat: 48.8566, lng: 2.3522 }; // Paris

                const mapOptions = {
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

                // Vérifier si Google Maps est chargé
                if (window.google && window.google.maps) {
                    const m = new window.google.maps.Map(ref.current, mapOptions);

                    setMap(m);
                    setSvc(new window.google.maps.DirectionsService());
                    setRend(
                        new window.google.maps.DirectionsRenderer({
                            map: m,
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
                        })
                    );

                    setReady(true);

                    // Récupérer les alertes initiales pour le centre par défaut
                    fetchAlerts(defaultCenter.lat, defaultCenter.lng);

                    // Ne pas demander automatiquement la géolocalisation ici
                    // Cela provoque l'erreur "Only request geolocation in response to a user gesture"
                }
            } catch (error) {
                if (mounted) {
                    console.error('Maps initialization error:', error);
                    setErr('Google Maps initialization error. Please refresh the page.');
                }
            }
        })();

        return () => {
            mounted = false;

            if (userMarker) userMarker.setMap(null);
            clearAlertMarkers();
            clearUserMarkers();
            clearRouteAlertMarkers();
            if (rend) rend.setMap(null);
        };
    }, []); // Dépendances vides pour n'exécuter qu'une seule fois

    // Mettre à jour la visibilité du marqueur utilisateur
    useEffect(() => {
        if (userMarker) {
            userMarker.setVisible(showUserMarker);
        }
    }, [showUserMarker, userMarker]);

    // Calculer l'itinéraire
    useEffect(() => {
        if (!calculateRoute || !svc || !rend || !ready || !map) return;

        const valid = waypoints.filter(w =>
            typeof w.value === 'string' ? w.value.trim() : true
        );

        if (valid.length < 2) return;

        const first = valid[0];
        const last = valid[valid.length - 1];

        const originParam =
            first.isUserLocation && userPosition ? userPosition : first.value;
        const destParam =
            last.isUserLocation && userPosition ? userPosition : last.value;

        const mids = valid.slice(1, -1).map(w => ({
            location:
                w.isUserLocation && userPosition ? userPosition : w.value,
            stopover: true
        }));

        // Utiliser un objet de configuration pour route()
        const routeConfig: google.maps.DirectionsRequest = {
            origin: originParam,
            destination: destParam,
            waypoints: mids,
            travelMode: window.google.maps.TravelMode[travelMode],
            optimizeWaypoints: true,
            provideRouteAlternatives: true
        };

        // Ajouter les options spécifiques au mode de transport
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

        // Calculer l'itinéraire
        svc.route(routeConfig, (res, status) => {
            if (status === window.google.maps.DirectionsStatus.OK && res) {
                // Afficher l'itinéraire
                rend.setDirections(res);
                rend.setRouteIndex(selectedRouteIndex);

                // Stocker les détails de l'itinéraire
                setCurrentRouteDetails(res);

                // Informer le parent
                if (onRouteCalculated) {
                    onRouteCalculated(res as unknown as RouteDetails);
                }

                // Récupérer les alertes pour cet itinéraire
                const routePoints = extractRoutePoints(res);
                if (routePoints.length > 0) {
                    fetchRouteAlerts(routePoints);
                }
            } else {
                setErr(`Route calculation failed: ${status}`);
                console.error('Route calculation error:', status);
            }
        });
    }, [
        calculateRoute,
        waypoints,
        svc,
        rend,
        ready,
        map,
        travelMode,
        userPosition,
        selectedRouteIndex,
        onRouteCalculated,
        extractRoutePoints,
        fetchRouteAlerts
    ]);

    // Gérer le changement d'itinéraire sélectionné
    useEffect(() => {
        if (!rend || !currentRouteDetails) return;

        try {
            // Mettre à jour l'index d'itinéraire
            rend.setRouteIndex(selectedRouteIndex);

            // Récupérer les alertes pour l'itinéraire sélectionné (avec délai)
            const now = Date.now();
            const MIN_FETCH_INTERVAL = 30000; // 30 secondes
            const lastFetchTime = lastRouteAlertsFetchRef.current || 0;

            if (now - lastFetchTime > MIN_FETCH_INTERVAL) {
                const routePoints = extractRoutePoints(currentRouteDetails);
                if (routePoints.length > 0) {
                    clearRouteAlertMarkers();
                    fetchRouteAlerts(routePoints);
                }
                lastRouteAlertsFetchRef.current = now;
            }
        } catch (error) {
            console.error('Error updating route index:', error);
        }
    }, [selectedRouteIndex, rend, currentRouteDetails, extractRoutePoints, clearRouteAlertMarkers, fetchRouteAlerts]);

    // Référence pour le temps de la dernière récupération d'alertes de route
    const lastRouteAlertsFetchRef = useRef<number>(0);

    // Ajuster la vue de la carte aux limites de l'itinéraire
    useEffect(() => {
        if (!rend || !map || !currentRouteDetails) return;

        try {
            const dir = rend.getDirections();
            if (!dir) return;

            const route = dir.routes[selectedRouteIndex];
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
    }, [selectedRouteIndex, rend, map, currentRouteDetails]);

    // Éviter l'auto-actualisation qui cause l'erreur de géolocalisation
    // SUPPRIMÉ: L'intervalle automatique qui appelait getUserLocation périodiquement
    // Cela résout l'erreur "Only request geolocation in response to a user gesture"

    return (
        <div className="w-full h-full relative">
            <div ref={ref} className="w-full h-full" />

            {!ready && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
                </div>
            )}

            {err && (
                <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    <p className="font-medium">{err}</p>
                    <button
                        onClick={() => setErr(null)}
                        className="absolute top-2 right-2 text-white"
                        aria-label="Close error message"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Bouton pour demander la position de l'utilisateur (en réponse à un geste utilisateur) */}
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={getUserLocation}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    {locationPermissionGranted ? 'Update Location' : 'Enable Location'}
                </button>
            </div>

            {userPosition && (
                <div className="absolute bottom-24 right-4 z-10">
                    <button
                        onClick={() => {
                            if (map && userPosition) {
                                map.setCenter(userPosition);
                                map.setZoom(15);
                            }
                        }}
                        className="bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-colors duration-300"
                        aria-label="Center map on your location"
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