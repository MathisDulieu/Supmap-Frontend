import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        google: any;
        initMap: () => void;
    }
}

interface WaypointType {
    id: string;
    placeholder: string;
    value: string;
}

interface GoogleMapsProps {
    waypoints: WaypointType[];
    calculateRoute: boolean;
    onRouteCalculated?: (routeDetails: any) => void;
    travelMode: 'DRIVING' | 'BICYCLING' | 'WALKING' | 'TRANSIT';
}

let googleMapsLoaded = false;
let googleMapsLoading = false;

const GOOGLE_API_KEY = import.meta.env.REACT_APP_GOOGLE_API_KEY;

const loadGoogleMapsApi = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (googleMapsLoaded) {
            resolve();
            return;
        }

        if (googleMapsLoading) {
            const checkLoaded = setInterval(() => {
                if (googleMapsLoaded) {
                    clearInterval(checkLoaded);
                    resolve();
                }
            }, 100);
            return;
        }

        googleMapsLoading = true;

        window.initMap = () => {
            googleMapsLoaded = true;
            googleMapsLoading = false;
            resolve();
        };

        try {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        } catch (error) {
            googleMapsLoading = false;
            reject(error);
        }
    });
};

const GoogleMapsIntegration: React.FC<GoogleMapsProps> = ({
                                                              waypoints,
                                                              calculateRoute,
                                                              onRouteCalculated,
                                                              travelMode
                                                          }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [setMapInstance] = useState<any | null>(null);
    const [directionsService, setDirectionsService] = useState<any | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<any | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const initializeMap = async () => {
            if (!mapContainerRef.current) return;

            try {
                await loadGoogleMapsApi();

                if (!isMounted || !mapContainerRef.current) return;

                const center = { lat: 48.8566, lng: 2.3522 }; // Paris

                const map = new window.google.maps.Map(mapContainerRef.current, {
                    center,
                    zoom: 12,
                    disableDefaultUI: false,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    rotateControl: true,
                    fullscreenControl: true
                });

                const dirService = new window.google.maps.DirectionsService();
                const dirRenderer = new window.google.maps.DirectionsRenderer({
                    map,
                    suppressMarkers: false,
                    polylineOptions: {
                        strokeColor: '#4F46E5',
                        strokeWeight: 5
                    }
                });

                setMapInstance(map);
                setDirectionsService(dirService);
                setDirectionsRenderer(dirRenderer);
                setIsLoaded(true);
            } catch (err) {
                if (isMounted) {
                    console.error('Error initializing Google Maps:', err);
                    setError('Failed to load Google Maps. Please try again later.');
                }
            }
        };

        initializeMap();

        return () => {
            isMounted = false;

            if (directionsRenderer) {
                directionsRenderer.setMap(null);
            }
        };
    }, []);

    useEffect(() => {
        if (!calculateRoute || !directionsService || !directionsRenderer || !isLoaded) {
            return;
        }

        // Clear previous error
        setError(null);

        const validWaypoints = waypoints.filter(wp => wp.value.trim() !== '');

        if (validWaypoints.length < 2) {
            return;
        }

        try {
            const origin = validWaypoints[0].value;
            const destination = validWaypoints[validWaypoints.length - 1].value;

            const middleWaypoints = validWaypoints.slice(1, validWaypoints.length - 1).map(wp => ({
                location: wp.value,
                stopover: true
            }));

            directionsService.route({
                origin,
                destination,
                waypoints: middleWaypoints,
                travelMode: window.google.maps.TravelMode[travelMode],
                optimizeWaypoints: true,
                provideRouteAlternatives: true,
                avoidHighways: false,
                avoidTolls: false
            }, (result: any, status: any) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                    if (onRouteCalculated) {
                        onRouteCalculated(result);
                    }
                } else {
                    console.error(`Directions request failed: ${status}`);
                    setError(`Could not calculate route: ${status}`);
                }
            });
        } catch (err) {
            console.error('Error calculating route:', err);
            setError('An error occurred while calculating the route.');
        }
    }, [calculateRoute, directionsService, directionsRenderer, waypoints, isLoaded, onRouteCalculated, travelMode]);

    return (
        <div className="w-full h-full rounded-lg relative">
            <div ref={mapContainerRef} className="w-full h-full"></div>

            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            )}

            {error && (
                <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                    {error}
                </div>
            )}
        </div>
    );
};

export default GoogleMapsIntegration;