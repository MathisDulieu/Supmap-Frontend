import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        google: any;
        initMap: () => void;
        env?: {
            API_BASE_URL: string;
            GOOGLE_API_KEY: string;
        };
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
    selectedRouteIndex: number;
}

let googleMapsLoaded = false;
let googleMapsLoading = false;

const GOOGLE_API_KEY = window.env && window.env.GOOGLE_API_KEY ? window.env.GOOGLE_API_KEY : '';

if (!GOOGLE_API_KEY) {
    console.warn("Attention : GOOGLE_API_KEY n'est pas définie");
}

const loadGoogleMapsApi = (): Promise<void> =>
    new Promise((resolve, reject) => {
        if (googleMapsLoaded) {
            resolve();
            return;
        }
        if (googleMapsLoading) {
            const check = setInterval(() => {
                if (googleMapsLoaded) {
                    clearInterval(check);
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
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&callback=initMap&loading=async`;
        script.async = true;
        script.defer = true;
        script.onerror = err => {
            googleMapsLoading = false;
            reject(err);
        };
        document.head.appendChild(script);
    });

const GoogleMapsIntegration: React.FC<GoogleMapsProps> = ({
    waypoints,
    calculateRoute,
    onRouteCalculated,
    travelMode,
    selectedRouteIndex
}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<any | null>(null);
    const [dirService, setDirService] = useState<any | null>(null);
    const [dirRenderer, setDirRenderer] = useState<any | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const init = async () => {
            if (!mapRef.current) return;
            try {
                await loadGoogleMapsApi();
                if (!mounted || !mapRef.current) return;
                const defaultCenter = { lat: 48.8566, lng: 2.3522 };
                const m = new window.google.maps.Map(mapRef.current, {
                    center: defaultCenter,
                    zoom: 12,
                    disableDefaultUI: false,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    rotateControl: true,
                    fullscreenControl: true
                });
                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            if (!mounted) return;
                            const userPos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            m.setCenter(userPos);
                            m.setZoom(15);
                            new window.google.maps.Marker({
                                position: userPos,
                                map: m,
                                title: 'Votre position'
                            });
                        },
                        () => {},
                        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                    );
                }
                const ds = new window.google.maps.DirectionsService();
                const dr = new window.google.maps.DirectionsRenderer({
                    map: m,
                    suppressMarkers: false,
                    polylineOptions: { strokeColor: '#4F46E5', strokeWeight: 5 }
                });
                setMap(m);
                setDirService(ds);
                setDirRenderer(dr);
                setIsLoaded(true);
            } catch (e) {
                if (mounted) {
                    console.error(e);
                    setError('Failed to load Google Maps. Please try again later.');
                }
            }
        };
        init();
        return () => {
            mounted = false;
            dirRenderer?.setMap(null);
        };
    }, []);

    useEffect(() => {
        if (!calculateRoute || !dirService || !dirRenderer || !isLoaded || !map) return;
        setError(null);
        const valid = waypoints.filter(w => w.value.trim());
        if (valid.length < 2) return;
        const origin = valid[0].value;
        const destination = valid[valid.length - 1].value;
        const middles = valid.slice(1, -1).map(w => ({
            location: w.value,
            stopover: true
        }));
        dirService.route(
            {
                origin,
                destination,
                waypoints: middles,
                travelMode: window.google.maps.TravelMode[travelMode],
                optimizeWaypoints: true,
                provideRouteAlternatives: true,
                avoidHighways: false,
                avoidTolls: false
            },
            (result: any, status: any) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    dirRenderer.setDirections(result);
                    dirRenderer.setRouteIndex(selectedRouteIndex);
                    onRouteCalculated?.(result);
                } else {
                    setError(`Could not calculate route: ${status}`);
                }
            }
        );
    }, [
        calculateRoute,
        waypoints,
        dirService,
        dirRenderer,
        isLoaded,
        travelMode,
        selectedRouteIndex,
        map,
        onRouteCalculated
    ]);

    useEffect(() => {
        try {
            dirRenderer?.setRouteIndex(selectedRouteIndex);
        } catch {

            // Handle error if dirRenderer is not initialized or selectedRouteIndex is invalid
            console.error('Error setting route index:', selectedRouteIndex);
        }
    }, [selectedRouteIndex, dirRenderer]);

    return (
        <div className="w-full h-full rounded-lg relative">
            <div ref={mapRef} className="w-full h-full" />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
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
