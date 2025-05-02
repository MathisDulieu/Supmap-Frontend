import React, { createContext, useContext, useState, useEffect } from 'react';

interface GeolocationContextType {
    isGeolocationAvailable: boolean;
    isGeolocationEnabled: boolean;
    error: string | null;
    requestPermission: () => Promise<GeolocationPosition>;
    userPosition: { latitude: number; longitude: number } | null;
}

const GeolocationContext = createContext<GeolocationContextType>({
    isGeolocationAvailable: false,
    isGeolocationEnabled: false,
    error: null,
    requestPermission: () => Promise.reject('Context not initialized'),
    userPosition: null
});

export const useGeolocation = () => useContext(GeolocationContext);

interface GeolocationProviderProps {
    children: React.ReactNode;
}

export const GeolocationProvider: React.FC<GeolocationProviderProps> = ({ children }) => {
    const [isGeolocationAvailable, setIsGeolocationAvailable] = useState<boolean>(false);
    const [isGeolocationEnabled, setIsGeolocationEnabled] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userPosition, setUserPosition] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        // Check if geolocation is available in the browser
        if ('geolocation' in navigator) {
            setIsGeolocationAvailable(true);

            // Check if user has previously granted permission
            const geolocationEnabled = localStorage.getItem('geolocationEnabled');
            if (geolocationEnabled === 'true') {
                // Try to get the current position to see if permission is still granted
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setIsGeolocationEnabled(true);
                        setUserPosition({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                        setError(null);
                    },
                    (err) => {
                        console.error('Geolocation error:', err);
                        setIsGeolocationEnabled(false);

                        // Set appropriate error message
                        switch (err.code) {
                            case err.PERMISSION_DENIED:
                                setError('User denied the request for geolocation');
                                break;
                            case err.POSITION_UNAVAILABLE:
                                setError('Location information is unavailable');
                                break;
                            case err.TIMEOUT:
                                setError('The request to get user location timed out');
                                break;
                            default:
                                setError('An unknown error occurred');
                                break;
                        }
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 60000
                    }
                );
            }
        }
    }, []);

    // Set up a watcher for position updates when geolocation is enabled
    useEffect(() => {
        if (!isGeolocationEnabled || !isGeolocationAvailable) return;

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setUserPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                setError(null);
            },
            (err) => {
                console.error('Geolocation watch error:', err);
                // Only update the error state, don't change enabled status
                // as this might be a temporary error
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        setError('User denied the request for geolocation');
                        setIsGeolocationEnabled(false);
                        break;
                    case err.POSITION_UNAVAILABLE:
                        setError('Location information is unavailable');
                        break;
                    case err.TIMEOUT:
                        setError('The request to get user location timed out');
                        break;
                    default:
                        setError('An unknown error occurred');
                        break;
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );

        // Clean up the watch when the component unmounts
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [isGeolocationEnabled, isGeolocationAvailable]);

    const requestPermission = async (): Promise<GeolocationPosition> => {
        return new Promise<GeolocationPosition>((resolve, reject) => {
            if (!isGeolocationAvailable) {
                reject(new Error('Geolocation is not available in this browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setIsGeolocationEnabled(true);
                    setUserPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    setError(null);
                    localStorage.setItem('geolocationEnabled', 'true');
                    localStorage.setItem('geolocationPromptResponded', 'true');

                    // Notify the application that geolocation permission has been granted
                    window.dispatchEvent(new CustomEvent('geolocationPermissionGranted'));

                    resolve(position);
                },
                (err) => {
                    console.error('Error requesting geolocation permission:', err);
                    let errorMessage = 'An unknown error occurred';

                    switch (err.code) {
                        case err.PERMISSION_DENIED:
                            errorMessage = 'User denied the request for geolocation';
                            break;
                        case err.POSITION_UNAVAILABLE:
                            errorMessage = 'Location information is unavailable';
                            break;
                        case err.TIMEOUT:
                            errorMessage = 'The request to get user location timed out';
                            break;
                    }

                    setError(errorMessage);
                    localStorage.setItem('geolocationEnabled', 'false');
                    reject(new Error(errorMessage));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    };

    return (
        <GeolocationContext.Provider
            value={{
                isGeolocationAvailable,
                isGeolocationEnabled,
                error,
                requestPermission,
                userPosition
            }}
        >
            {children}
        </GeolocationContext.Provider>
    );
};