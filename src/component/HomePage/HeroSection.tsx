import React from 'react';
import { Link } from 'react-router-dom';
import {NavigationIcon, MapIcon, ArrowRightIcon, ClockIcon, BellIcon} from 'lucide-react';
import MapRouteAnimation from '../animation/MapRouteAnimation.tsx';

const HeroSection: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
            <div className="absolute inset-0">
                <MapRouteAnimation />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left">
                        <div className="inline-block mb-6 px-4 py-2 bg-indigo-900/40 backdrop-blur-sm border
                                        border-indigo-800/40 rounded-full text-sm text-indigo-300 font-medium">
                            Real-time navigation for smarter journeys
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight
                                       bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                            Navigate Smarter, <br />
                            <span className="relative">
                                Arrive Faster
                                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent"></span>
                            </span>
                        </h1>

                        <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Join millions of drivers who avoid traffic, accidents, and road closures with Supmap's
                            real-time navigation and community alerts. Optimize your daily commute and save time on every journey.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
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
                                to="/login"
                                className="group w-full sm:w-auto flex items-center justify-center py-3 px-6
                                           border border-indigo-500/40 text-indigo-300 font-medium rounded-lg
                                           hover:bg-indigo-900/40 hover:border-indigo-500/60 transition-all duration-300"
                            >
                                <span>Sign In</span>
                                <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
                            <div className="flex items-center">
                                <div className="flex -space-x-2 mr-3">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-b from-indigo-400 to-indigo-600 border-2 border-indigo-900 flex items-center justify-center text-xs font-bold">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    ))}
                                </div>
                                <span>Join 2M+ active drivers</span>
                            </div>

                            <div className="flex items-center">
                                <div className="flex items-center mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span>Rated 4.8/5 by our users</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
                        <div className="relative w-full max-w-lg mx-auto">
                            <div className="relative z-10 mx-auto w-[280px] h-[580px] bg-gray-900 rounded-[36px] border-[8px] border-gray-800 shadow-xl overflow-hidden">
                                <div className="absolute top-0 inset-x-0 h-6 bg-black flex items-center justify-between px-6 z-30">
                                    <div className="text-white text-xs">12:30</div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                                        <div className="w-1 h-2 bg-white rounded-sm"></div>
                                        <div className="w-1 h-2 bg-white rounded-sm"></div>
                                        <div className="w-1 h-2 bg-white rounded-sm"></div>
                                    </div>
                                </div>

                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-5 bg-black rounded-b-2xl z-20"></div>

                                <div className="absolute inset-0 z-10 overflow-hidden">
                                    <div className="h-full w-full bg-gray-900 relative">
                                        <div className="absolute inset-0 bg-[#1a1c25]">
                                            <div className="absolute inset-0 opacity-30">
                                                <MapRouteAnimation />
                                            </div>
                                        </div>

                                        <div className="absolute top-8 inset-x-0 px-3">
                                            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                                                <div className="flex items-center mb-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                                    <div className="text-sm text-white truncate">Current Location</div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>
                                                    <div className="text-sm text-white truncate">Office - 15 min away</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-5 inset-x-0 px-3">
                                            <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="text-xl font-bold text-white">15 min</div>
                                                    <div className="text-sm text-indigo-300">Fastest route</div>
                                                </div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center">
                                                        <NavigationIcon size={14} className="text-indigo-400 mr-2" />
                                                        <span className="text-sm text-gray-300">5.2 km</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <ClockIcon size={14} className="text-indigo-400 mr-2" />
                                                        <span className="text-sm text-gray-300">Arrive by 12:45</span>
                                                    </div>
                                                </div>

                                                <div className="bg-indigo-600 rounded-lg py-2.5 px-4 text-center text-white font-medium text-sm">
                                                    Start Navigation
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute top-32 right-3 w-5/6 bg-red-900/80 backdrop-blur-sm rounded-lg p-3 shadow-lg transform translate-y-0 animate-pulse">
                                            <div className="flex items-start">
                                                <div className="bg-red-500/30 rounded-full p-1.5 mr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-100" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-semibold text-white mb-1">Traffic Alert</div>
                                                    <div className="text-xs text-gray-200">Accident reported 2 km ahead</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-1/4 -left-4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                            <div className="absolute top-1/3 -right-4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                            <div className="absolute bottom-0 left-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                        </div>

                        <div className="absolute top-0 -right-4 md:right-4 bg-gray-900/90 backdrop-blur-sm border border-indigo-800/40 rounded-lg p-3 shadow-lg animate-float">
                            <div className="flex items-center">
                                <div className="bg-yellow-500/20 rounded-full p-2 mr-3">
                                    <BellIcon size={20} className="text-yellow-400" />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-white">Traffic Alert</div>
                                    <div className="text-xs text-gray-400">Heavy traffic on I-95</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-10 -left-4 md:left-4 bg-gray-900/90 backdrop-blur-sm border border-indigo-800/40 rounded-lg p-3 shadow-lg animate-float animation-delay-1000">
                            <div className="flex items-center">
                                <div className="bg-green-500/20 rounded-full p-2 mr-3">
                                    <MapIcon size={20} className="text-green-400" />
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-white">Route Updated</div>
                                    <div className="text-xs text-gray-400">Saving you 5 minutes</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;