import { useState, useEffect, useCallback } from 'react';
import {
    getUserFavoriteLocations,
    saveNewUserFavoriteLocation,
    deleteUserFavoriteLocation,
    updateUserFavoriteLocation
} from './map.ts';

interface Coordinates {
    lat: number;
    lng: number;
}

export interface FavoriteLocation {
    id: string;
    name: string;
    formattedAddress: string;
    coordinates: Coordinates;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    locationType: string;
    createdAt: string;
}

export function useFavoriteLocations(isAuthenticated: boolean) {
    const [locations, setLocations] = useState<FavoriteLocation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLocations = useCallback(async () => {
        if (!isAuthenticated) {
            setLocations([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await getUserFavoriteLocations();
            if (response && response.locations) {
                setLocations(response.locations);
            }
        } catch (e: any) {
            setError(e.message || 'Failed to load favorite locations');
            console.error('Error loading favorite locations:', e);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    const addLocation = useCallback(
        async (location: Omit<FavoriteLocation, 'id' | 'createdAt'>) => {
            if (!isAuthenticated) {
                setError('You must be logged in to save favorite locations');
                return null;
            }

            setLoading(true);
            setError(null);

            try {
                const { name, formattedAddress, coordinates, street, city, postalCode, country, locationType } = location;

                const response = await saveNewUserFavoriteLocation(
                    name,
                    formattedAddress,
                    coordinates,
                    street,
                    city,
                    postalCode,
                    country,
                    locationType
                );

                if (response) {
                    await fetchLocations();
                    return response;
                }
                return null;
            } catch (e: any) {
                setError(e.message || 'Failed to save location');
                console.error('Error saving location:', e);
                return null;
            } finally {
                setLoading(false);
            }
        },
        [isAuthenticated, fetchLocations]
    );

    const updateLocation = useCallback(
        async (location: FavoriteLocation) => {
            if (!isAuthenticated) {
                setError('You must be logged in to update favorite locations');
                return false;
            }

            setLoading(true);
            setError(null);

            try {
                const { id, name, formattedAddress, coordinates, street, city, postalCode, country, locationType } = location;

                const response = await updateUserFavoriteLocation(
                    id,
                    name,
                    formattedAddress,
                    coordinates,
                    street,
                    city,
                    postalCode,
                    country,
                    locationType
                );

                if (response) {
                    await fetchLocations();
                    return true;
                }
                return false;
            } catch (e: any) {
                setError(e.message || 'Failed to update location');
                console.error('Error updating location:', e);
                return false;
            } finally {
                setLoading(false);
            }
        },
        [isAuthenticated, fetchLocations]
    );

    const deleteLocation = useCallback(
        async (id: string) => {
            if (!isAuthenticated) {
                setError('You must be logged in to delete favorite locations');
                return false;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await deleteUserFavoriteLocation(id);

                if (response) {
                    // Update the local state
                    setLocations(prev => prev.filter(loc => loc.id !== id));
                    return true;
                }
                return false;
            } catch (e: any) {
                setError(e.message || 'Failed to delete location');
                console.error('Error deleting location:', e);
                return false;
            } finally {
                setLoading(false);
            }
        },
        [isAuthenticated]
    );

    useEffect(() => {
        if (isAuthenticated) {
            fetchLocations();
        } else {
            setLocations([]);
        }
    }, [isAuthenticated, fetchLocations]);

    return {
        locations,
        loading,
        error,
        fetchLocations,
        addLocation,
        updateLocation,
        deleteLocation
    };
}