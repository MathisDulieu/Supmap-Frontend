import React, { useState, useEffect } from 'react';
import { Share2Icon, MapPinIcon, NavigationIcon, QrCodeIcon } from 'lucide-react';
import { shareLocation, shareRoute } from '../../hooks/map/map.ts';

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
    const [routeQrUrl, setRouteQrUrl] = useState<string | null>(null);
    const [routeStart, setRouteStart] = useState<{ lat: number; lng: number } | null>(null);
    const [routeEnd, setRouteEnd] = useState<{ lat: number; lng: number } | null>(null);
    const [shareType, setShareType] = useState<'location' | 'route'>('location');

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

    const handleShareRoute = async () => {
        if (!routeStart || !routeEnd) {
            setError('Please select a starting point and destination');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const qrUrl = await shareRoute(
                routeStart.lat,
                routeStart.lng,
                routeEnd.lat,
                routeEnd.lng
            );
            setRouteQrUrl(qrUrl);
        } catch (e: any) {
            setError(e.message || 'Failed to share route');
        } finally {
            setLoading(false);
        }
    };

    const setupRouteSelection = () => {
        if (!window.google?.maps) return;

        console.log('Route selection setup would be here in a complete implementation');
    };

    useEffect(() => {
        if (shareType === 'route') {
            setupRouteSelection();
        }
    }, [shareType]);

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center">
                <Share2Icon size={48} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Sign in to share</h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    You need to be logged in to share your location or routes with others.
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

            <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-2">
                    <button
                        onClick={() => {
                            setShareType('location');
                            setRouteQrUrl(null);
                        }}
                        className={`py-3 px-4 flex items-center justify-center font-medium ${
                            shareType === 'location'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <MapPinIcon size={18} className="mr-2" />
                        Share Location
                    </button>

                    <button
                        onClick={() => {
                            setShareType('route');
                            setLocationQrUrl(null);
                        }}
                        className={`py-3 px-4 flex items-center justify-center font-medium ${
                            shareType === 'route'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        <NavigationIcon size={18} className="mr-2" />
                        Share Route
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {shareType === 'location' && (
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
            )}

            {shareType === 'route' && (
                <div>
                    <p className="text-sm text-gray-600 mb-4">
                        Create a QR code to share a route with others.
                        Enter the starting point and destination to generate a QR code.
                    </p>

                    <div className="space-y-3 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Starting Point
                            </label>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        if (userPosition) {
                                            setRouteStart(userPosition);
                                        }
                                    }}
                                    disabled={!userPosition}
                                    className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium flex items-center"
                                >
                                    <MapPinIcon size={16} className="mr-1" />
                                    Use My Location
                                </button>

                                <span className="text-sm text-gray-500 flex items-center">
                  {routeStart
                      ? `Lat: ${routeStart.lat.toFixed(6)}, Lng: ${routeStart.lng.toFixed(6)}`
                      : 'Select a starting point'}
                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Destination
                            </label>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        if (routeStart) {
                                            setRouteEnd({
                                                lat: routeStart.lat + 0.01,
                                                lng: routeStart.lng + 0.01
                                            });
                                        }
                                    }}
                                    disabled={!routeStart}
                                    className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium flex items-center"
                                >
                                    <MapPinIcon size={16} className="mr-1" />
                                    Select on Map
                                </button>

                                <span className="text-sm text-gray-500 flex items-center">
                  {routeEnd
                      ? `Lat: ${routeEnd.lat.toFixed(6)}, Lng: ${routeEnd.lng.toFixed(6)}`
                      : 'Select a destination'}
                </span>
                            </div>
                        </div>
                    </div>

                    {!routeQrUrl ? (
                        <button
                            onClick={handleShareRoute}
                            disabled={loading || !routeStart || !routeEnd}
                            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                            ) : (
                                <QrCodeIcon size={18} className="mr-2" />
                            )}
                            Generate Route QR
                        </button>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                                <img
                                    src={routeQrUrl}
                                    alt="Route QR Code"
                                    className="w-48 h-48"
                                />
                            </div>

                            <p className="text-sm text-gray-600 mb-4 text-center">
                                This QR code contains a route. Share it with others so they can navigate using this route.
                            </p>

                            <button
                                onClick={() => setRouteQrUrl(null)}
                                className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Generate a new QR code
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShareOptions;