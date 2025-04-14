import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationIcon, UserPlusIcon, ArrowRightIcon, PhoneIcon, LaptopIcon } from 'lucide-react';
import MapRouteAnimation from '../animation/MapRouteAnimation.tsx';

const CtaSection: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0c15] opacity-90 z-0"></div>

            <div className="absolute inset-0 z-0 opacity-30">
                <MapRouteAnimation />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-xl shadow-2xl border border-indigo-900/30 rounded-2xl
                                    overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-8 md:p-12">
                                <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                                    Ready to Start Your Journey?
                                </h2>

                                <p className="text-lg text-gray-300 mb-8">
                                    Join our community of over 2 million drivers who save time every day with Supmap's
                                    real-time navigation and traffic alerts.
                                </p>

                                <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                                    <Link
                                        to="/navigation"
                                        className="group relative w-full sm:w-auto flex items-center justify-center py-3 px-6
                                                 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium
                                                 rounded-lg shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30
                                                 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                                    >
                                        <NavigationIcon size={18} className="mr-2 relative z-10" />
                                        <span className="relative z-10">Start Navigation</span>
                                        <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                                        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                        </div>
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="group w-full sm:w-auto flex items-center justify-center py-3 px-6
                                                 border border-indigo-500/40 text-indigo-300 font-medium rounded-lg
                                                 hover:bg-indigo-900/40 hover:border-indigo-500/60 transition-all duration-300"
                                    >
                                        <UserPlusIcon size={18} className="mr-2" />
                                        <span>Create Account</span>
                                        <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    </Link>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-lg font-medium text-white mb-4">Available on all devices</h3>

                                    <div className="flex flex-col sm:flex-row items-start gap-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-indigo-900/60 flex items-center justify-center mr-3">
                                                <PhoneIcon size={20} className="text-indigo-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">Mobile App</h4>
                                                <p className="text-sm text-gray-400">iOS & Android</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-indigo-900/60 flex items-center justify-center mr-3">
                                                <LaptopIcon size={20} className="text-indigo-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">Web Version</h4>
                                                <p className="text-sm text-gray-400">All modern browsers</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-full lg:h-auto overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-indigo-900/30 to-indigo-900/40"></div>

                                <div className="relative h-full flex items-center justify-center p-8">
                                    <div className="transform -rotate-12 translate-x-6 translate-y-4 z-10">
                                        <div className="w-[200px] h-[400px] bg-gray-900 rounded-[32px] border-[6px] border-gray-800 shadow-xl overflow-hidden">
                                            <div className="h-full w-full bg-gray-900 p-2">
                                                <div className="h-full w-full relative rounded-[18px] overflow-hidden">
                                                    <div className="absolute inset-0 bg-[#1a1c25]">
                                                        <div className="absolute inset-0 opacity-50">
                                                            <MapRouteAnimation />
                                                        </div>
                                                    </div>

                                                    <div className="absolute inset-x-0 bottom-4 px-3">
                                                        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <div className="text-sm font-bold text-white">10 min</div>
                                                                <div className="text-xs text-indigo-300">Fastest route</div>
                                                            </div>
                                                            <div className="bg-indigo-600 rounded-lg py-2 px-3 text-center text-white font-medium text-xs">
                                                                Start
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="transform rotate-6 -translate-x-6 translate-y-0">
                                        <div className="w-[200px] h-[400px] bg-gray-900 rounded-[32px] border-[6px] border-gray-800 shadow-xl overflow-hidden">
                                            <div className="h-full w-full bg-gray-900 p-2">
                                                <div className="h-full w-full relative rounded-[18px] overflow-hidden">
                                                    <div className="absolute inset-0 bg-[#1a1c25]">
                                                        <div className="absolute inset-0 opacity-40">
                                                            <MapRouteAnimation />
                                                        </div>
                                                    </div>

                                                    <div className="absolute top-4 inset-x-0 px-3">
                                                        <div className="bg-red-900/70 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                                                            <div className="flex items-start">
                                                                <div className="bg-red-500/30 rounded-full p-1.5 mr-2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-100" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                                <div>
                                                                    <div className="text-xs font-semibold text-white">Accident</div>
                                                                    <div className="text-xs text-gray-200">1.2 miles ahead</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-4 inset-x-0 px-3">
                                                        <div className="bg-indigo-900/60 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                                                            <div className="flex items-center">
                                                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                                                <div className="text-xs text-white">Rerouting...</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full border border-indigo-500/20
                                                  animate-[spin_20s_linear_infinite]"></div>
                                    <div className="absolute bottom-1/3 right-1/4 w-8 h-8 rounded-full border border-indigo-500/30
                                                  animate-[spin_15s_linear_infinite_reverse]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;