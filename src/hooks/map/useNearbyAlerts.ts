import { useCallback, useEffect, useRef, useState } from 'react';

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
    const controllerRef = useRef<AbortController | null>(null);

    const clearMarkers = () => {
        markers.forEach(m => m.setMap(null));
        setMarkers([]);
    };

    const addMarkers = (alerts: Alert[]) => {
        if (!map) return;
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
    };

    const fetchAlerts = useCallback(
        async (lat: number, lng: number) => {
            if (!map) return;
            controllerRef.current?.abort();
            controllerRef.current = new AbortController();
            try {
                const res = await fetch(
                    `${window.env?.API_BASE_URL ?? ''}/map/alerts/position`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                        body: JSON.stringify({ latitude: lat, longitude: lng }),
                        signal: controllerRef.current.signal
                    }
                );
                if (!res.ok) return;
                const data = await res.json();
                if (data.alerts) addMarkers(data.alerts);
            } catch (_) {
                if (controllerRef.current?.signal.aborted) {
                    console.log('Fetch aborted');
                } else {
                    console.error('Failed to fetch alerts', _);
                }
            }
        },
        [map]
    );

    useEffect(() => () => clearMarkers(), []);

    return { fetchAlerts, clearMarkers };
}
