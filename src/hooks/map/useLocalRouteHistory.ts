import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RouteHistoryItem } from './useRouteHistory';

const LOCAL_HISTORY_KEY = 'route_history_local';

interface LocalRouteHistoryItem extends Omit<RouteHistoryItem, 'id' | 'createdAt' | 'userId'> {
    id?: string;
    createdAt?: string;
}

export function useLocalRouteHistory() {
    const [history, setHistory] = useState<RouteHistoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadHistory = useCallback(() => {
        setLoading(true);
        try {
            const storedHistory = localStorage.getItem(LOCAL_HISTORY_KEY);
            if (storedHistory) {
                setHistory(JSON.parse(storedHistory));
            }
            setError(null);
        } catch (e: any) {
            setError(e.message || 'Failed to load route history');
            console.error('Error loading local route history:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    const saveHistory = useCallback((items: RouteHistoryItem[]) => {
        try {
            localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(items));
        } catch (e) {
            console.error('Error saving local route history:', e);
        }
    }, []);

    const save = useCallback((item: LocalRouteHistoryItem) => {
        try {
            const newItem: RouteHistoryItem = {
                ...item,
                id: item.id || uuidv4(),
                createdAt: item.createdAt || new Date().toISOString(),
                userId: 'local'
            };

            setHistory(prev => {
                const updated = [newItem, ...prev];
                saveHistory(updated);
                return updated;
            });

            return newItem;
        } catch (e: any) {
            setError(e.message || 'Failed to save route');
            throw e;
        }
    }, [saveHistory]);

    const syncToRemote = useCallback(async () => {
        // This function would be implemented to call your API and sync local routes
        // to the user's account after they log in
        // For now, we'll just mark it as a placeholder
        console.log('Would sync local history to remote');

        // In a real implementation, you would:
        // 1. Call your API to save each route
        // 2. Clear the local history after successful sync
        // 3. Handle errors appropriately

        // Example placeholder implementation:
        try {
            const localRoutes = [...history];

            // For now we don't do anything with these routes
            // But in a real implementation you would send them to your server
            console.log('Routes to sync:', localRoutes);

            // After successful sync, you might clear local storage
            // localStorage.removeItem(LOCAL_HISTORY_KEY);
            // setHistory([]);

            return true;
        } catch (e) {
            console.error('Error syncing routes:', e);
            return false;
        }
    }, [history]);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    return {
        history,
        loading,
        error,
        save,
        syncToRemote
    };
}