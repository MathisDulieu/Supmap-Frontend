import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SharedLocationHandler: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        const lat = searchParams.get('lat');
        const lng = searchParams.get('lng');

        const startLat = searchParams.get('startLat');
        const startLng = searchParams.get('startLng');
        const endLat = searchParams.get('endLat');
        const endLng = searchParams.get('endLng');

        const navigationParams = new URLSearchParams();

        if (lat && lng) {
            navigationParams.append('shared_lat', lat);
            navigationParams.append('shared_lng', lng);
        } else if (startLat && startLng && endLat && endLng) {
            navigationParams.append('shared_start_lat', startLat);
            navigationParams.append('shared_start_lng', startLng);
            navigationParams.append('shared_end_lat', endLat);
            navigationParams.append('shared_end_lng', endLng);
        }

        if (navigationParams.toString()) {
            navigate(`/navigation?${navigationParams.toString()}`, { replace: true });
        } else {
            navigate('/navigation', { replace: true });
        }
    }, [location, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                <p className="text-gray-700">Chargement de la carte...</p>
            </div>
        </div>
    );
};

export default SharedLocationHandler;