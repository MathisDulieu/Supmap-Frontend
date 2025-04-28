import { useState, useEffect, useCallback } from 'react';
import { saveUserRoute, getUserRouteHistory } from './map';

export interface RouteHistoryItem {
    id: string;
    startAddress: string;
    endAddress: string;
    startPoint: { latitude: number; longitude: number };
    endPoint: { latitude: number; longitude: number };
    kilometersDistance: number;
    estimatedDurationInSeconds: number;
    createdAt: string;
    userId: string;
}

export function useRouteHistory() {
    const [history, setHistory] = useState<RouteHistoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchHistory = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const raw = await getUserRouteHistory();
            const data = (raw as unknown) as {
                routes: RouteHistoryItem[];
                error: string | null;
            };
            setHistory(data.routes ?? []);
        } catch (e: any) {
            setError(e.message || 'Impossible de charger l’historique');
        } finally {
            setLoading(false);
        }
    }, []);

    const save = useCallback(
        async (item: Omit<RouteHistoryItem, 'id' | 'createdAt' | 'userId'>) => {
            setError(null);
            try {
                await saveUserRoute(
                    item.startAddress,
                    item.endAddress,
                    { lat: item.startPoint.latitude, lng: item.startPoint.longitude },
                    { lat: item.endPoint.latitude, lng: item.endPoint.longitude },
                    item.kilometersDistance,
                    item.estimatedDurationInSeconds
                );
                await fetchHistory();
            } catch (e: any) {
                setError(e.message || 'Impossible de sauvegarder l’itinéraire');
            }
        },
        [fetchHistory]
    );

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    return { history, loading, error, save };
}