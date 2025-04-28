import React, { useEffect, useRef, useState } from 'react';
import { useNearbyAlerts } from '../../hooks/map/useNearbyAlerts';

declare global {
    interface Window {
        google: typeof google;
        initMap: () => void;
        env?: { API_BASE_URL: string; GOOGLE_API_KEY: string };
    }
}

interface WaypointType {
    id: string;
    placeholder: string;
    value: string;
}

interface Props {
    waypoints: WaypointType[];
    calculateRoute: boolean;
    onRouteCalculated?: (routeDetails: any) => void;
    travelMode: 'DRIVING' | 'BICYCLING' | 'WALKING' | 'TRANSIT';
    selectedRouteIndex: number;
    /** affiche ou non le marqueur de la position utilisateur */
    showUserMarker?: boolean;
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
    showUserMarker = true
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [svc, setSvc] = useState<google.maps.DirectionsService | null>(null);
    const [rend, setRend] = useState<google.maps.DirectionsRenderer | null>(null);
    const [ready, setReady] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const { fetchAlerts } = useNearbyAlerts(map);

    useEffect(() => {
        let mounted = true;
        (async () => {
            if (!ref.current) return;
            try {
                await loadMaps();
                if (!mounted || !ref.current) return;

                const paris = { lat: 48.8566, lng: 2.3522 };
                const m = new window.google.maps.Map(ref.current, { center: paris, zoom: 12 });

                fetchAlerts(paris.lat, paris.lng);

                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        pos => {
                            if (!mounted) return;
                            const me = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                            m.setCenter(me);
                            m.setZoom(15);
                            if (showUserMarker) {
                                new window.google.maps.Marker({
                                    position: me,
                                    map: m,
                                    title: 'Votre position'
                                });
                            }
                            fetchAlerts(me.lat, me.lng);
                        },
                        () => {}
                    );
                }

                setMap(m);
                setSvc(new window.google.maps.DirectionsService());
                setRend(
                    new window.google.maps.DirectionsRenderer({
                        map: m,
                        polylineOptions: { strokeColor: '#4F46E5', strokeWeight: 5 }
                    })
                );
                setReady(true);
            } catch {
                if (mounted) setErr('Google Maps error');
            }
        })();
        return () => {
            mounted = false;
            rend?.setMap(null);
        };
    }, [showUserMarker]);

    useEffect(() => {
        if (!calculateRoute || !svc || !rend || !ready) return;
        const valid = waypoints.filter(w => w.value.trim());
        if (valid.length < 2) return;
        const origin = valid[0].value;
        const dest = valid[valid.length - 1].value;
        const mids = valid.slice(1, -1).map(w => ({ location: w.value, stopover: true }));
        svc.route(
            {
                origin,
                destination: dest,
                waypoints: mids,
                travelMode: window.google.maps.TravelMode[travelMode],
                optimizeWaypoints: true,
                provideRouteAlternatives: true
            },
            (res: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
                if (status === window.google.maps.DirectionsStatus.OK && res) {
                    rend.setDirections(res);
                    rend.setRouteIndex(selectedRouteIndex);
                    onRouteCalculated?.(res);
                } else setErr(status);
            }
        );
    }, [
        calculateRoute,
        waypoints,
        svc,
        rend,
        ready,
        travelMode,
        selectedRouteIndex,
        onRouteCalculated
    ]);

    useEffect(() => {
        try {
            rend?.setRouteIndex(selectedRouteIndex);
        } catch {}
    }, [selectedRouteIndex, rend]);

    return (
        <div className="w-full h-full relative">
            <div ref={ref} className="w-full h-full" />
            {!ready && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
                </div>
            )}
            {err && (
                <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                    {err}
                </div>
            )}
        </div>
    );
};

export default GoogleMapsIntegration;