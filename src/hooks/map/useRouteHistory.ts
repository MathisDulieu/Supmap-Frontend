import { useState, useEffect, useCallback } from 'react';
import { saveUserRoute, getUserRouteHistory } from './map';
import Cookies from "js-cookie";

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

function getAuthToken(): string | null {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
    const cookieToken = Cookies.get('authToken');
    const localToken = localStorage.getItem('authToken');

    return cookiesAccepted ? (cookieToken || null) : localToken;
}

export function useRouteHistory() {
    const [history, setHistory] = useState<RouteHistoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchHistory = useCallback(async () => {
        const authToken = await getAuthToken();
        if (!authToken) {
            setHistory([]);
            return;
        }

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
            if (!e.message?.includes('401') && !e.message?.includes('Unauthorized')) {
                setError(e.message || 'Unable to load history');
            } else {
                setHistory([]);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const save = useCallback(
        async (item: Omit<RouteHistoryItem, 'id' | 'createdAt' | 'userId'>) => {
            const authToken = await getAuthToken();
            if (!authToken) {
                return;
            }

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
                if (!e.message?.includes('401') && !e.message?.includes('Unauthorized')) {
                    setError(e.message || 'Unable to save the route');
                }
            }
        },
        [fetchHistory]
    );

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    return { history, loading, error, save };
}