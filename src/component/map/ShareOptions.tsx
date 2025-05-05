import React, { useState } from 'react';
import { Share2Icon, QrCodeIcon } from 'lucide-react';
import { shareLocation } from '../../hooks/map/map.ts';

interface ShareOptionsProps {
    isAuthenticated: boolean;
    userPosition: { lat: number; lng: number } | null;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({
                                                       isAuthenticated,
                                                       userPosition
                                                   }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [locationQrUrl, setLocationQrUrl] = useState<string | null>(null);

    const handleShareLocation = async () => {
        if (!userPosition) {
            setError('Unable to get your current location');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const qrUrl = await shareLocation(userPosition.lat, userPosition.lng);
            setLocationQrUrl(qrUrl);
        } catch (e: any) {
            setError(e.message || 'Failed to share location');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center">
                <Share2Icon size={48} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Sign in to share</h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    You need to be logged in to share your location with others.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center">
                <Share2Icon size={18} className="mr-2 text-indigo-600" />
                Share Options
            </h3>

            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div>
                <p className="text-sm text-gray-600 mb-4">
                    Create a QR code to share your current location with others.
                </p>

                {!locationQrUrl ? (
                    <button
                        onClick={handleShareLocation}
                        disabled={loading || !userPosition}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                        ) : (
                            <QrCodeIcon size={18} className="mr-2" />
                        )}
                        Generate Location QR
                    </button>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                            <img
                                src={locationQrUrl}
                                alt="Location QR Code"
                                className="w-48 h-48"
                            />
                        </div>

                        <p className="text-sm text-gray-600 mb-4 text-center">
                            This QR code contains your current location. Share it with others so they can navigate to you.
                        </p>

                        <button
                            onClick={() => setLocationQrUrl(null)}
                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                            Generate a new QR code
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShareOptions;