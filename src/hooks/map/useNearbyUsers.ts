import { useState, useCallback, useEffect, useRef } from 'react';
import { getNearbyUsers } from './map.ts';

interface NearbyUser {
    id: string;
    username: string;
    location: {
        latitude: number;
        longitude: number;
    };
    lastUpdated: string;
}

export function useNearbyUsers(map: google.maps.Map | null, isAuthenticated: boolean) {
    const [users, setUsers] = useState<NearbyUser[]>([]);
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const controllerRef = useRef<AbortController | null>(null);

    const clearMarkers = useCallback(() => {
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]);
    }, [markers]);

    const addMarkers = useCallback((nearbyUsers: NearbyUser[]) => {
        if (!map) return;

        clearMarkers();

        const newMarkers: google.maps.Marker[] = nearbyUsers.map(user => {
            const marker = new window.google.maps.Marker({
                position: {
                    lat: user.location.latitude,
                    lng: user.location.longitude
                },
                map,
                title: user.username,
                icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillOpacity: 0.8,
                    fillColor: '#3B82F6',
                    strokeWeight: 2,
                    strokeColor: '#ffffff'
                }
            });

            const lastUpdated = new Date(user.lastUpdated).toLocaleString();
            const info = new window.google.maps.InfoWindow({
                content: `
          <div style="min-width:150px">
            <strong>${user.username}</strong>
            <br>
            <small>Last seen: ${lastUpdated}</small>
          </div>
        `
            });

            marker.addListener('click', () => info.open({ anchor: marker, map }));

            return marker;
        });

        setMarkers(newMarkers);
    }, [map, clearMarkers]);

    const fetchNearbyUsers = useCallback(async (latitude: number, longitude: number) => {
        if (!map || !isAuthenticated) return;

        controllerRef.current?.abort();
        controllerRef.current = new AbortController();

        setLoading(true);
        setError(null);

        try {
            const data = await getNearbyUsers(latitude, longitude);
            if (data && data.users) {
                setUsers(data.users);
                addMarkers(data.users);
            }
        } catch (e: any) {
            if (controllerRef.current?.signal.aborted) {
                console.log('Fetch nearby users aborted');
            } else {
                console.error('Failed to fetch nearby users', e);
                setError(e.message || 'Failed to fetch nearby users');
            }
        } finally {
            setLoading(false);
        }
    }, [map, isAuthenticated, addMarkers]);

    useEffect(() => {
        return () => {
            clearMarkers();
            controllerRef.current?.abort();
        };
    }, [clearMarkers]);

    return {
        users,
        loading,
        error,
        fetchNearbyUsers,
        clearMarkers
    };
}