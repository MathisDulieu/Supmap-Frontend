import React from 'react';
import { PhoneIcon } from 'lucide-react';

interface PhoneMockupsProps {
    activeTab: 'ios' | 'android';
}

const PhoneMockups: React.FC<PhoneMockupsProps> = ({ activeTab }) => {
    return (
        <div className="flex justify-center items-center">
            <div className="relative">
                <div
                    className={`transform transition-all duration-500 ${
                        activeTab === 'android'
                            ? 'scale-100 opacity-100 translate-x-0 rotate-0 z-20'
                            : 'scale-90 opacity-0 -translate-x-20 rotate-6 z-10'
                    }`}
                    style={{ zIndex: activeTab === 'android' ? 20 : 10 }}
                >
                    <AndroidPhoneMockup />
                </div>

                <div
                    className={`absolute top-0 left-0 transform transition-all duration-500 ${
                        activeTab === 'ios'
                            ? 'scale-100 opacity-100 translate-x-0 rotate-0 z-20'
                            : 'scale-90 opacity-0 translate-x-20 -rotate-6 z-10'
                    }`}
                    style={{ zIndex: activeTab === 'ios' ? 20 : 10 }}
                >
                    <IOSPhoneMockup />
                </div>
            </div>
        </div>
    );
};

const AndroidPhoneMockup: React.FC = () => {
    return (
        <div className="w-[280px] h-[580px] bg-gray-900 rounded-[2rem] border-[10px] border-gray-800 shadow-xl overflow-hidden">
            <div className="h-7 bg-gray-900/90 flex items-center justify-between px-4">
                <div className="text-white text-xs">10:30</div>
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full border border-gray-600"></div>
                    <div className="w-3 h-3 rounded-full border border-gray-600"></div>
                    <div className="w-3 h-3 rounded-full border border-gray-600"></div>
                </div>
            </div>

            <div className="h-full w-full bg-indigo-900/20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c25] to-[#12152e] z-0"></div>

                <div className="absolute inset-0 p-3 pt-10 z-10">
                    <div className="bg-indigo-900/80 backdrop-blur-sm rounded-t-xl p-3 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="bg-indigo-500/20 rounded-full p-1.5 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <div className="text-white font-medium">Supmap</div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="bg-indigo-500/20 rounded-full p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="bg-indigo-500/20 rounded-full p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-b-xl p-3 shadow-lg mb-3">
                        <div className="bg-gray-700/50 rounded-lg p-2 flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 flex-shrink-0"></div>
                            <input
                                type="text"
                                className="bg-transparent text-white text-sm w-full border-none outline-none"
                                placeholder="Search destination"
                                readOnly
                            />
                        </div>
                    </div>

                    <AndroidMapContent />

                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-lg font-bold text-white">14 min</div>
                            <div className="text-xs text-indigo-300">Via Highway 101</div>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                                <div className="text-sm text-gray-300">5.7 km</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-sm text-gray-300">ETA: 10:32</div>
                            </div>
                        </div>
                        <div className="bg-indigo-600 rounded-lg py-2 px-4 text-center text-white font-medium text-sm flex items-center justify-center">
                            <span>Start</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AndroidMapContent: React.FC = () => {
    return (
        <div className="rounded-xl overflow-hidden h-[370px] relative mb-3">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e2134] to-[#12152e] z-0"></div>

            <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid-small-android" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4f46e5" strokeWidth="0.5" opacity="0.3"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-small-android)"/>
                </svg>
            </div>

            <div className="absolute inset-0">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M 40,380 C 80,300 120,250 160,180 S 200,80 230,40"
                        stroke="#6366f1"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="1 8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 40,380 C 100,320 150,280 170,160 S 200,80 230,40"
                        stroke="#4f46e5"
                        strokeWidth="6"
                        fill="none"
                        opacity="0.6"
                        strokeLinecap="round"
                    />
                    <circle cx="40" cy="380" r="8" fill="#22c55e"/>
                    <circle cx="230" cy="40" r="8" fill="#ef4444"/>
                </svg>
            </div>

            <div className="absolute bottom-5 right-5 flex flex-col space-y-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="w-10 h-10 bg-yellow-500/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                </div>
            </div>

            <div className="absolute top-4 left-0 right-0 mx-auto w-5/6 bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border-l-4 border-yellow-500">
                <div className="flex items-start">
                    <div className="bg-yellow-500/20 rounded-full p-1.5 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-white mb-1">Traffic Alert</div>
                        <div className="text-xs text-gray-200">Heavy congestion: +10 min</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const IOSPhoneMockup: React.FC = () => {
    return (
        <div className="w-[280px] h-[580px] bg-gray-900 rounded-[3rem] border-[14px] border-gray-800 shadow-xl overflow-hidden">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>

            <div className="h-full w-full bg-indigo-900/20 relative">
                <div className="h-10 bg-gray-900/70 flex items-center justify-between px-5">
                    <div className="text-white text-xs">9:41</div>
                    <div className="flex space-x-2">
                        <div className="w-4 h-4 rounded-full border-2 border-white"></div>
                        <div className="w-4 h-4 rounded-full border-2 border-white"></div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c25] to-[#12152e] z-0"></div>

                <div className="absolute inset-0 p-3 pt-12 z-10">
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 shadow-lg mb-3">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-medium">Supmap</div>
                            <div className="bg-indigo-500/20 rounded-full p-1">
                                <PhoneIcon size={14} className="text-indigo-400" />
                            </div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-2 flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 flex-shrink-0"></div>
                            <input
                                type="text"
                                className="bg-transparent text-white text-sm w-full border-none outline-none"
                                placeholder="Where to?"
                                readOnly
                            />
                        </div>
                    </div>

                    <IOSMapContent />

                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-lg font-bold text-white">14 min</div>
                            <div className="text-xs text-indigo-300">Fastest route</div>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                                <div className="text-sm text-gray-300">5.7 km</div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-sm text-gray-300">Arrival: 9:55</div>
                            </div>
                        </div>
                        <div className="bg-indigo-600 rounded-lg py-2 px-4 text-center text-white font-medium text-sm">
                            Start Navigation
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const IOSMapContent: React.FC = () => {
    return (
        <div className="rounded-xl overflow-hidden h-[370px] relative mb-3">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e2134] to-[#12152e] z-0"></div>

            <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid-small" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4f46e5" strokeWidth="0.5" opacity="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-small)" />
                </svg>
            </div>

            <div className="absolute inset-0">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M 40,380 C 80,300 120,250 160,180 S 200,80 230,40"
                        stroke="#6366f1"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="1 8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 40,380 C 100,320 150,280 170,160 S 200,80 230,40"
                        stroke="#4f46e5"
                        strokeWidth="6"
                        fill="none"
                        opacity="0.6"
                        strokeLinecap="round"
                    />
                    <circle cx="40" cy="380" r="8" fill="#22c55e" />
                    <circle cx="230" cy="40" r="8" fill="#ef4444" />
                </svg>
            </div>

            <div className="absolute top-5 right-5 w-2/3 bg-red-900/80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-start">
                    <div className="bg-red-500/30 rounded-full p-1.5 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-100" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-white mb-1">Accident Reported</div>
                        <div className="text-xs text-gray-200">Heavy traffic: +10 min</div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                <button className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
                <button className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PhoneMockups;