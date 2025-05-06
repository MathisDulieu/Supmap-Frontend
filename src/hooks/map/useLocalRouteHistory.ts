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
        console.log('Would sync local history to remote');
        try {
            const localRoutes = [...history];
            console.log('Routes to sync:', localRoutes);
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