import React, { useEffect, useState } from 'react';
import { useGeolocation } from '../../services/GeolocationContext';

const GeolocationPrompt: React.FC = () => {
    const { isGeolocationAvailable, isGeolocationEnabled, error, requestPermission } = useGeolocation();
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const hasResponded = localStorage.getItem('geolocationPromptResponded');

        if (!hasResponded && isGeolocationAvailable && !isGeolocationEnabled && !error) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                setIsAnimating(true);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isGeolocationAvailable, isGeolocationEnabled, error]);

    const handleAllow = async () => {
        try {
            setIsAnimating(false);
            await requestPermission();
            localStorage.setItem('geolocationPromptResponded', 'true');

            setTimeout(() => {
                setIsVisible(false);
            }, 300);
        } catch (error) {
            console.error('Error requesting geolocation permission:', error);
        }
    };

    const handleDismiss = () => {
        setIsAnimating(false);
        localStorage.setItem('geolocationPromptResponded', 'true');
        setIsDismissed(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    if (!isVisible || isDismissed || isGeolocationEnabled) {
        return null;
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`w-full max-w-md mx-4 bg-[rgba(17,24,39,0.95)] backdrop-blur-xl border border-indigo-500/20 rounded-lg shadow-lg shadow-indigo-500/10 p-5 relative overflow-hidden transition-all duration-500 ${isAnimating ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full border border-indigo-500/10 animate-[spin_40s_linear_infinite]"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full border border-indigo-500/5 animate-[spin_30s_linear_infinite_reverse]"></div>
                </div>

                <div className="relative z-10">
                    <h4 className="text-white text-lg font-semibold mb-2">Enable Location Services</h4>
                    <p className="text-gray-300 text-sm mb-4">
                        Supmap works best with location services enabled. We'll use your location to provide you with the most accurate navigation experience.
                    </p>

                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                        <button
                            onClick={handleDismiss}
                            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                        >
                            <span className="relative z-10">Not now</span>
                            <span className="absolute left-0 bottom-0 h-px w-0 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
                        </button>

                        <button
                            onClick={handleAllow}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:shadow-indigo-600/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:translate-y-0 active:scale-100 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <span className="relative z-10">Allow location access</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeolocationPrompt;