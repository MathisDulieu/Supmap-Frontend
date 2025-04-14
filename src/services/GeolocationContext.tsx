import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface GeolocationContextType {
    isGeolocationAvailable: boolean;
    isGeolocationEnabled: boolean;
    position: GeolocationPosition | null;
    error: GeolocationPositionError | null;
    requestPermission: () => Promise<void>;
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined);

export const useGeolocation = () => {
    const context = useContext(GeolocationContext);
    if (context === undefined) {
        throw new Error('useGeolocation must be used within a GeolocationProvider');
    }
    return context;
};

interface GeolocationProviderProps {
    children: ReactNode;
}

export const GeolocationProvider: React.FC<GeolocationProviderProps> = ({ children }) => {
    const [isGeolocationAvailable, setIsGeolocationAvailable] = useState<boolean>(false);
    const [isGeolocationEnabled, setIsGeolocationEnabled] = useState<boolean>(false);
    const [position, setPosition] = useState<GeolocationPosition | null>(null);
    const [error, setError] = useState<GeolocationPositionError | null>(null);

    useEffect(() => {
        // Check if geolocation is available in the browser
        if ('geolocation' in navigator) {
            setIsGeolocationAvailable(true);
        }
    }, []);

    const requestPermission = async () => {
        if (!isGeolocationAvailable) {
            return;
        }

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => resolve(position),
                    (error) => reject(error),
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
                );
            });

            setPosition(position);
            setIsGeolocationEnabled(true);
            setError(null);
        } catch (error) {
            setError(error as GeolocationPositionError);
            setIsGeolocationEnabled(false);
        }
    };

    const value = {
        isGeolocationAvailable,
        isGeolocationEnabled,
        position,
        error,
        requestPermission
    };

    return (
        <GeolocationContext.Provider value={value}>
            {children}
        </GeolocationContext.Provider>
    );
};