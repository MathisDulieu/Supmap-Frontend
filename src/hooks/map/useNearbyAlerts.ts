import { useCallback, useEffect, useRef, useState } from 'react';
import { getAllAlertsByPosition } from './map';

interface Alert {
    id: string;
    type: string;
    location: { latitude: number; longitude: number };
    roadName: string;
    description: string;
}

const colorByType: Record<string, string> = {
    ACCIDENT: '#EF4444',
    TRAFFIC_JAM: '#F59E0B',
    CONSTRUCTION: '#A855F7'
};

export function useNearbyAlerts(map: google.maps.Map | null) {
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const controllerRef = useRef<AbortController | null>(null);
    const lastFetchRef = useRef<number>(0);
    const isActiveRef = useRef<boolean>(true);
    const MIN_FETCH_INTERVAL = 10000;

    const clearMarkers = useCallback(() => {
        markers.forEach(m => m.setMap(null));
        setMarkers([]);
    }, [markers]);

    const addMarkers = useCallback((alerts: Alert[]) => {
        if (!map || !isActiveRef.current) return;

        clearMarkers();

        const ms: google.maps.Marker[] = alerts.map(alert => {
            const marker = new window.google.maps.Marker({
                position: { lat: alert.location.latitude, lng: alert.location.longitude },
                map,
                title: alert.description,
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 7,
                    fillOpacity: 1,
                    fillColor: colorByType[alert.type] || '#3B82F6',
                    strokeWeight: 1,
                    strokeColor: '#ffffff'
                }
            });

            const info = new window.google.maps.InfoWindow({
                content: `<div style="min-width:160px"><strong>${alert.type.replace('_', ' ')}</strong><br>${alert.roadName}<br>${alert.description}</div>`
            });

            marker.addListener('click', () => info.open({ anchor: marker, map }));
            return marker;
        });

        setMarkers(ms);
    }, [map, clearMarkers]);

    const fetchAlerts = useCallback(
        async (lat: number, lng: number) => {
            if (!map || !isActiveRef.current) return;

            const now = Date.now();
            if (now - lastFetchRef.current < MIN_FETCH_INTERVAL) {
                console.log('Skipping alerts fetch - too soon since last fetch');
                return;
            }

            if (controllerRef.current) {
                controllerRef.current?.abort();
                controllerRef.current = null;
            }

            controllerRef.current = new AbortController();
            lastFetchRef.current = now;

            setLoading(true);
            setError(null);

            try {
                console.log(`Fetching alerts for location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);

                // Utiliser la fonction importée au lieu de fetch direct
                const data = await getAllAlertsByPosition(lat, lng);

                console.log(`Received ${data.alerts?.length || 0} alerts`);

                if (isActiveRef.current && data.alerts) {
                    addMarkers(data.alerts);
                }
            } catch (e: any) {
                if (e.name === 'AbortError') {
                    console.log('Alerts fetch aborted');
                } else {
                    console.error('Failed to fetch alerts', e);
                    setError(e.message || 'Failed to fetch alerts');
                }
            } finally {
                setLoading(false);
            }
        },
        [map, addMarkers]
    );

    useEffect(() => {
        isActiveRef.current = true;

        return () => {
            isActiveRef.current = false;

            if (controllerRef.current) {
                controllerRef.current?.abort();
                controllerRef.current = null;
            }
            clearMarkers();
        };
    }, [clearMarkers]);

    return { fetchAlerts, clearMarkers, loading, error };
}