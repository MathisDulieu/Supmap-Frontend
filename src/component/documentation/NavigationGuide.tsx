import React from 'react';
import {
    Navigation,
    Clock,
    DollarSign,
    Star,
    Map,
    Sliders,
    Volume2,
    CarFront,
    AlertTriangle,
    Smartphone
} from 'lucide-react';

const NavigationGuide: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                Navigation Guide
            </h1>

            <p className="text-gray-300 mb-8 text-lg">
                Learn how to make the most of Supmap's powerful navigation features to optimize your
                journeys and avoid traffic delays.
            </p>

            <div id="navigation-guide#basics" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Navigation Basics
                </h2>

                <p className="text-gray-300 mb-6">
                    Supmap provides intelligent, traffic-aware navigation that adapts to changing road conditions
                    in real-time. Here's how to use the basic navigation features:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                            <h3 className="font-medium text-white flex items-center">
                                <Navigation className="w-5 h-5 mr-2 text-indigo-400" />
                                Starting Navigation
                            </h3>
                        </div>
                        <div className="p-4">
                            <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                                <li>Tap the search bar at the top of the screen</li>
                                <li>Enter a destination address or search for a place</li>
                                <li>Select from the search results</li>
                                <li>Review suggested routes</li>
                                <li>Tap "Start" to begin navigation</li>
                            </ol>
                        </div>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                            <h3 className="font-medium text-white flex items-center">
                                <Map className="w-5 h-5 mr-2 text-blue-400" />
                                Understanding the Navigation Screen
                            </h3>
                        </div>
                        <div className="p-4">
                            <ul className="text-gray-300 space-y-2">
                                <li><span className="text-indigo-400 font-medium">Top bar:</span> ETA, distance, and arrival time</li>
                                <li><span className="text-indigo-400 font-medium">Main view:</span> 3D map with your route highlighted</li>
                                <li><span className="text-indigo-400 font-medium">Bottom panel:</span> Next maneuver and street</li>
                                <li><span className="text-indigo-400 font-medium">Icons:</span> Traffic incidents and alerts on your route</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4 mb-6">
                    <h4 className="text-indigo-400 font-medium flex items-center mb-2">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                        </svg>
                        Navigation Gestures
                    </h4>
                    <ul className="text-gray-300 text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <li><span className="text-indigo-400">Pinch</span>: Zoom in/out</li>
                        <li><span className="text-indigo-400">Two-finger rotate</span>: Change map orientation</li>
                        <li><span className="text-indigo-400">Swipe up</span>: View route overview</li>
                        <li><span className="text-indigo-400">Tap</span>: View information about a place or incident</li>
                    </ul>
                </div>
            </div>

            <div id="navigation-guide#planning-routes" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Planning Routes
                </h2>

                <p className="text-gray-300 mb-6">
                    Supmap allows you to plan routes in advance and customize them according to your needs.
                </p>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-white mb-4">Multiple Routes</h3>

                    <p className="text-gray-300 mb-4">
                        When you search for a destination, Supmap offers up to three route options:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">1</div>
                                <div className="text-white font-medium">Fastest Route</div>
                            </div>
                            <p className="text-gray-400 text-sm">
                                The most time-efficient route based on current traffic conditions.
                            </p>
                            <div className="flex items-center mt-3 text-blue-400">
                                <Clock className="w-4 h-4 mr-1" />
                                <span className="text-sm">Time prioritized</span>
                            </div>
                        </div>

                        <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">2</div>
                                <div className="text-white font-medium">Alternative Route</div>
                            </div>
                            <p className="text-gray-400 text-sm">
                                A different path that may be slightly longer but avoids high-traffic areas.
                            </p>
                            <div className="flex items-center mt-3 text-green-400">
                                <CarFront className="w-4 h-4 mr-1" />
                                <span className="text-sm">Balanced option</span>
                            </div>
                        </div>

                        <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-3">3</div>
                                <div className="text-white font-medium">Scenic Route</div>
                            </div>
                            <p className="text-gray-400 text-sm">
                                A route that may take longer but offers a more enjoyable driving experience.
                            </p>
                            <div className="flex items-center mt-3 text-purple-400">
                                <Map className="w-4 h-4 mr-1" />
                                <span className="text-sm">Experience prioritized</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-white mb-4">Planning Future Trips</h3>

                    <p className="text-gray-300 mb-4">
                        Supmap allows you to plan routes for future travel, taking into account typical traffic patterns:
                    </p>

                    <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                        <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                            <h4 className="font-medium text-white flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                                Departure/Arrival Planning
                            </h4>
                        </div>
                        <div className="p-5">
                            <ol className="text-gray-300 space-y-3 list-decimal list-inside ml-1">
                                <li>Enter your destination</li>
                                <li>
                                    Tap "Depart at" or "Arrive by"
                                    <div className="mt-1 ml-6 text-sm text-gray-400">
                                        • Depart at: Plan when to leave<br />
                                        • Arrive by: Plan to reach at a specific time
                                    </div>
                                </li>
                                <li>Select your desired date and time</li>
                                <li>Review suggested routes based on typical traffic patterns</li>
                                <li>Save the route to your calendar (optional)</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-white mb-4">Multi-stop Routes</h3>

                    <p className="text-gray-300 mb-4">
                        Need to make multiple stops during your journey? Here's how to add waypoints:
                    </p>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30 mb-4">
                        <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                            <li>Enter your final destination</li>
                            <li>Tap the "+" button next to the destination field</li>
                            <li>Add intermediate stops (up to 9 stops allowed)</li>
                            <li>Drag and drop to reorder stops for the most efficient route</li>
                            <li>Tap "Done" to calculate your multi-stop route</li>
                        </ol>
                    </div>

                    <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                        <h4 className="text-yellow-500 font-medium flex items-center mb-2">
                            <AlertTriangle className="w-5 h-5 mr-2" />
                            Note
                        </h4>
                        <p className="text-gray-300 text-sm">
                            Adding multiple stops will increase your total journey time. Supmap will
                            optimize the route between stops, but will maintain the order you specified.
                        </p>
                    </div>
                </div>
            </div>

            <div id="navigation-guide#preferences" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Route Preferences
                </h2>

                <p className="text-gray-300 mb-6">
                    Customize your navigation experience by setting your route preferences according to your
                    driving style and needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                            <h3 className="font-medium text-white flex items-center">
                                <Sliders className="w-5 h-5 mr-2 text-indigo-400" />
                                Route Types
                            </h3>
                        </div>
                        <div className="p-4">
                            <ul className="text-gray-300 space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                                    </svg>
                                    <div>
                                        <span className="font-medium text-white">Fastest Route</span>
                                        <p className="text-sm text-gray-400">Prioritizes time efficiency over distance</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                    </svg>
                                    <div>
                                        <span className="font-medium text-white">Shortest Route</span>
                                        <p className="text-sm text-gray-400">Minimizes distance, regardless of traffic conditions</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                    </svg>
                                    <div>
                                        <span className="font-medium text-white">Eco-friendly</span>
                                        <p className="text-sm text-gray-400">Optimizes for fuel efficiency and reduced emissions</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                            <h3 className="font-medium text-white flex items-center">
                                <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                                Avoidance Options
                            </h3>
                        </div>
                        <div className="p-4">
                            <ul className="text-gray-300 space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                                    </svg>
                                    <div>
                                        <span className="font-medium text-white">Avoid Tolls</span>
                                        <p className="text-sm text-gray-400">Choose toll-free routes, even if longer</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                                    </svg>
                                    <div>
                                        <span className="font-medium text-white">Avoid Highways</span>
                                        <p className="text-sm text-gray-400">Prefer local roads over major highways</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                                    </svg>
                                    <div>
                                        <span className="font-medium text-white">Avoid Ferries</span>
                                        <p className="text-sm text-gray-400">Choose land-only routes</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-medium text-white mb-4">Setting Default Preferences</h3>

                <p className="text-gray-300 mb-4">
                    Configure your default navigation preferences:
                </p>

                <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30 mb-4">
                    <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                        <li>Go to Settings - Navigation</li>
                        <li>Select "Route Preferences"</li>
                        <li>Choose your default route type (Fastest, Shortest, Eco-friendly)</li>
                        <li>Toggle avoidance options (tolls, highways, ferries)</li>
                        <li>Set your preferred transport mode (car, motorcycle, bicycle)</li>
                    </ol>
                </div>
            </div>

            <div id="navigation-guide#favorites" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Saving Favorites
                </h2>

                <p className="text-gray-300 mb-6">
                    Save time by storing your frequently visited locations and routes.
                </p>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-white mb-4">Saving Locations</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                            <h4 className="font-medium text-white flex items-center mb-4">
                                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                                Method 1: From Map
                            </h4>
                            <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                                <li>Long press on any location on the map</li>
                                <li>Tap the location card that appears</li>
                                <li>Tap the star icon to save</li>
                                <li>Add a custom name (optional)</li>
                                <li>Choose a category (optional)</li>
                            </ol>
                        </div>

                        <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                            <h4 className="font-medium text-white flex items-center mb-4">
                                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                                Method 2: From Search
                            </h4>
                            <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                                <li>Search for a location</li>
                                <li>Tap on the result</li>
                                <li>Tap the star icon in the location details</li>
                                <li>Add a custom name (optional)</li>
                                <li>Choose a category (optional)</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-white mb-4">Managing Favorites</h3>

                    <p className="text-gray-300 mb-4">
                        Organize and access your saved locations:
                    </p>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30 mb-4">
                        <h4 className="font-medium text-white mb-4">Accessing Favorites</h4>
                        <ul className="text-gray-300 space-y-2">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Tap the search bar and select from "Saved Places" section
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Go to Menu - Saved Places to see all your favorites
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Favorites appear as starred locations on your map
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-4">Organizing Favorites</h4>
                        <ul className="text-gray-300 space-y-2">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Create categories (Home, Work, Restaurants, etc.)
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Edit or delete places by tapping Edit in the Saved Places screen
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Add custom icons to make locations easier to identify
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="navigation-guide#voice-navigation" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Voice Navigation
                </h2>

                <p className="text-gray-300 mb-6">
                    Supmap's voice guidance provides clear, timely instructions to help you navigate safely
                    without looking at your screen.
                </p>

                <h3 className="text-xl font-medium text-white mb-4">Voice Settings</h3>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <Volume2 className="w-5 h-5 mr-2 text-indigo-400" />
                            Customizing Voice Guidance
                        </h4>
                    </div>
                    <div className="p-5">
                        <p className="text-gray-300 mb-4">
                            Personalize your voice navigation experience:
                        </p>
                        <ul className="text-gray-300 space-y-3">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <div>
                                    <span className="font-medium text-white">Voice Selection</span>
                                    <p className="text-sm text-gray-400">Choose from multiple voice options in Settings - Navigation - Voice</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <div>
                                    <span className="font-medium text-white">Language</span>
                                    <p className="text-sm text-gray-400">Select from 50+ languages and regional accents</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <div>
                                    <span className="font-medium text-white">Volume Control</span>
                                    <p className="text-sm text-gray-400">Adjust guidance volume or set to auto-adjust based on ambient noise</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-indigo-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <div>
                                    <span className="font-medium text-white">Verbosity Level</span>
                                    <p className="text-sm text-gray-400">Choose detailed or minimal instructions based on your preference</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <h3 className="text-xl font-medium text-white mb-4">Voice Commands</h3>

                <p className="text-gray-300 mb-4">
                    Control Supmap hands-free using voice commands during navigation:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3">Navigation Commands</h4>
                        <ul className="text-gray-300 space-y-2 text-sm">
                            <li>"<span className="text-indigo-300">Show alternate route</span>"</li>
                            <li>"<span className="text-indigo-300">Avoid highways</span>"</li>
                            <li>"<span className="text-indigo-300">Avoid tolls</span>"</li>
                            <li>"<span className="text-indigo-300">Find gas stations</span>"</li>
                            <li>"<span className="text-indigo-300">How's traffic ahead?</span>"</li>
                            <li>"<span className="text-indigo-300">What's my ETA?</span>"</li>
                        </ul>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3">System Commands</h4>
                        <ul className="text-gray-300 space-y-2 text-sm">
                            <li>"<span className="text-indigo-300">Turn on night mode</span>"</li>
                            <li>"<span className="text-indigo-300">Increase volume</span>"</li>
                            <li>"<span className="text-indigo-300">Mute voice guidance</span>"</li>
                            <li>"<span className="text-indigo-300">Report traffic</span>"</li>
                            <li>"<span className="text-indigo-300">Take me home</span>"</li>
                            <li>"<span className="text-indigo-300">Cancel navigation</span>"</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4">
                    <h4 className="text-indigo-400 font-medium flex items-center mb-2">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                        </svg>
                        Pro Tip
                    </h4>
                    <p className="text-gray-300 text-sm">
                        Activate voice commands at any time by saying "Hey Supmap" or by tapping the
                        microphone icon in the bottom right corner of the navigation screen.
                    </p>
                </div>
            </div>

            <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-md shadow-lg border border-indigo-900/30 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Next Steps</h2>
                <p className="text-gray-300 mb-4">
                    Now that you're familiar with navigation features, learn how to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="#alerts-reporting" className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors">
                        <div className="mr-4 p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white">Alerts & Reporting</h3>
                            <p className="text-gray-400 text-sm">Report and receive real-time incident alerts</p>
                        </div>
                    </a>

                    <a href="#mobile-app" className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors">
                        <div className="mr-4 p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <Smartphone size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white">Mobile App</h3>
                            <p className="text-gray-400 text-sm">Get the most from the Supmap mobile experience</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NavigationGuide;