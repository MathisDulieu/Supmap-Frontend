import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    MapIcon,
    HomeIcon,
    SearchIcon,
    CompassIcon,
    AlertTriangleIcon,
    ShieldOffIcon
} from 'lucide-react';

const NotFound: React.FC = () => {
    const [recalculating, setRecalculating] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (recalculating) {
            const interval = window.setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 20);

            return () => {
                if (interval) window.clearInterval(interval);
            };
        }
    }, [recalculating]);

    const handleRecalculate = () => {
        setRecalculating(true);
        setProgress(0);

        setTimeout(() => {
            window.location.href = '/';
        }, 2400);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0c15] text-white px-4 pt-16">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c15] via-[#12152e]/50 to-[#0a0c15]"></div>

                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-900/10 filter blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-indigo-900/5 rounded-full filter blur-3xl"></div>

                <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#4f46e5" strokeWidth="0.5" opacity="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="absolute top-16 left-1/4 w-2 h-2 rounded-full bg-red-400/50 animate-ping"></div>
                <div className="absolute bottom-24 right-1/4 w-2 h-2 rounded-full bg-indigo-400/50 animate-pulse"></div>
                <div className="absolute top-1/3 right-32 w-2 h-2 rounded-full bg-indigo-400/50 animate-pulse"></div>
            </div>

            <div className="container mx-auto max-w-4xl relative z-10">
                <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-xl shadow-2xl border border-indigo-900/30 rounded-2xl
                               overflow-hidden p-8 md:p-12">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-6">
                            <div className="bg-red-900/30 rounded-full p-4 relative">
                                <ShieldOffIcon size={40} className="text-red-400" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full z-10 shadow-[0_0_15px_3px_rgba(239,68,68,0.8)] animate-pulse"></span>
                            </div>
                        </div>

                        <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent">
                            Lost in Navigation
                        </h1>

                        <div className="flex items-center justify-center mb-4">
                            <span className="text-xl bg-red-900/20 py-1 px-4 rounded-full border border-red-500/30 text-red-300">
                                Error 404
                            </span>
                        </div>

                        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-2">
                            Oops! It seems like you've taken a wrong turn.
                        </p>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                            The destination you're looking for doesn't exist or has been moved to another location.
                        </p>
                    </div>

                    <div className="max-w-md mx-auto bg-[rgba(20,23,35,0.8)] rounded-xl p-5 border border-indigo-900/50 mb-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <div className="bg-red-900/30 rounded-full p-1.5 mr-2">
                                    <AlertTriangleIcon size={18} className="text-red-400" />
                                </div>
                                <span className="text-gray-300 font-medium">Navigation Error</span>
                            </div>
                            <span className="text-xs bg-red-900/30 py-0.5 px-2 rounded text-red-300 border border-red-900/50">
                                404 NOT_FOUND
                            </span>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                <div className="text-sm text-white">Current Location: <span className="text-green-400">Supmap App</span></div>
                            </div>
                            <div className="flex items-center mt-1">
                                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                                <div className="text-sm text-white">
                                    Destination: <span className="text-red-400 line-through">{window.location.pathname}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-indigo-900/50 pt-4">
                            <p className="text-gray-400 text-sm mb-2">
                                Route recalculation available. Would you like to return to a known location?
                            </p>

                            {recalculating ? (
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs text-indigo-400">Recalculating route</span>
                                        <span className="text-xs text-indigo-400">{progress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-indigo-900/50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-300 ease-out"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 text-center">Redirecting you to the homepage...</p>
                                </div>
                            ) : (
                                <button
                                    onClick={handleRecalculate}
                                    className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg
                                              bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium
                                              shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30
                                              focus:outline-none transition-all duration-300 transform hover:-translate-y-0.5
                                              overflow-hidden"
                                >
                                    <CompassIcon size={18} className="mr-2 relative z-10" />
                                    <span className="relative z-10">Recalculate Route</span>
                                    <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link
                            to="/"
                            className="flex items-center justify-center py-3 px-4
                                     bg-[rgba(20,23,35,0.6)] border border-indigo-900/30 rounded-lg
                                     hover:bg-indigo-900/20 hover:border-indigo-800/50 transition-all duration-300
                                     text-gray-300 hover:text-white"
                        >
                            <HomeIcon size={18} className="mr-2 text-indigo-400" />
                            <span>Home</span>
                        </Link>

                        <Link
                            to="/navigation"
                            className="flex items-center justify-center py-3 px-4
                                     bg-[rgba(20,23,35,0.6)] border border-indigo-900/30 rounded-lg
                                     hover:bg-indigo-900/20 hover:border-indigo-800/50 transition-all duration-300
                                     text-gray-300 hover:text-white"
                        >
                            <MapIcon size={18} className="mr-2 text-indigo-400" />
                            <span>Navigation</span>
                        </Link>

                        <Link
                            to="/support"
                            className="flex items-center justify-center py-3 px-4
                                     bg-[rgba(20,23,35,0.6)] border border-indigo-900/30 rounded-lg
                                     hover:bg-indigo-900/20 hover:border-indigo-800/50 transition-all duration-300
                                     text-gray-300 hover:text-white"
                        >
                            <SearchIcon size={18} className="mr-2 text-indigo-400" />
                            <span>Support</span>
                        </Link>
                    </div>

                    <div className="mt-10 text-center text-gray-500 text-sm">
                        <p>
                            GPS coordinates: 404.NOT.FOUND
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;