import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    loading: boolean;
}

const defaultState: AuthContextType = {
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    loading: true
};

export const AuthContext = createContext<AuthContextType>(defaultState);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuthStatus = () => {
            const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
            const authToken = cookiesAccepted ? Cookies.get('authToken') : localStorage.getItem('authToken');

            if (authToken) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);