import React from "react";
import {
    Navigation,
    Clock,
    Route,
    Star,
    Map,
    Sliders,
    CarFront,
    AlertTriangle,
    Smartphone,
    UserIcon,
    BadgeDollarSign,
} from "lucide-react";

interface NavigationGuideProps {
    handleLinkClick: (
        event: React.MouseEvent<HTMLAnchorElement>,
        section: string
    ) => void;
    searchQuery: string;
}

const NavigationGuide: React.FC<NavigationGuideProps> = ({
    handleLinkClick,
    searchQuery,
}) => {
    const highlightSearch = (text: string) => {
        if (!searchQuery) return text;
        const regex = new RegExp(`(${searchQuery})`, "gi");
        return text.split(regex).map((part, index) =>
            part.toLowerCase() === searchQuery.toLowerCase() ? (
                <mark key={index} className="bg-yellow-300 text-black">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                {highlightSearch("Navigation Guide")}
            </h1>

            <p className="text-gray-300 mb-8 text-lg">
                {highlightSearch(
                    "Learn how to make the most of Supmap's powerful navigation features to optimize your journeys and avoid traffic delays."
                )}
            </p>

            <div id="navigation-guide#basics" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    {highlightSearch("Navigation Basics")}
                </h2>

                <p className="text-gray-300 mb-6">
                    {highlightSearch(
                        "Supmap provides intelligent traffic-aware navigation that adapts to changing road conditions in real-time with voice guidance. Here's how to use the basic navigation features:"
                    )}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                            <h3 className="font-medium text-white flex items-center">
                                <Navigation className="w-5 h-5 mr-2 text-indigo-400" />
                                {highlightSearch("Starting Navigation")}
                            </h3>
                        </div>
                        <div className="p-4">
                            <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                                <li>
                                    {highlightSearch(
                                        "Tap the search bar at the top of the screen"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch(
                                        "Enter a destination address or search for a place"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch("Review suggested routes")}
                                </li>
                                <li>
                                    {highlightSearch(
                                        "Tap 'Navigate' to begin navigation"
                                    )}
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                            <h3 className="font-medium text-white flex items-center">
                                <Map className="w-5 h-5 mr-2 text-blue-400" />
                                {highlightSearch(
                                    "Understanding the Navigation Screen"
                                )}
                            </h3>
                        </div>
                        <div className="p-4">
                            <ul className="text-gray-300 space-y-2">
                                <li>
                                    <span className="text-indigo-400 font-medium">
                                        {highlightSearch("Top bar:")}
                                    </span>{" "}
                                    {highlightSearch(
                                        "ETA, distance, and arrival time"
                                    )}
                                </li>
                                <li>
                                    <span className="text-indigo-400 font-medium">
                                        {highlightSearch("Main view:")}
                                    </span>{" "}
                                    {highlightSearch(
                                        "3D map with your route highlighted"
                                    )}
                                </li>
                                <li>
                                    <span className="text-indigo-400 font-medium">
                                        {highlightSearch("Bottom panel:")}
                                    </span>{" "}
                                    {highlightSearch(
                                        "Next maneuver and street"
                                    )}
                                </li>
                                <li>
                                    <span className="text-indigo-400 font-medium">
                                        {highlightSearch("Icons:")}
                                    </span>{" "}
                                    {highlightSearch(
                                        "Traffic incidents and alerts on your route"
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4 mb-6">
                    <h4 className="text-indigo-400 font-medium flex items-center mb-2">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 00-2 0 1 1 0 002 0zM9 9a1 1 0 000 2v3a1 1 0 002 0V9a1 1 0 000-2z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        {highlightSearch("Navigation Gestures")}
                    </h4>
                    <ul className="text-gray-300 text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <li>
                            <span className="text-indigo-400">
                                {highlightSearch("Pinch")}:{" "}
                            </span>
                            {highlightSearch("Zoom in/out")}
                        </li>
                        <li>
                            <span className="text-indigo-400">
                                {highlightSearch("Two-finger rotate")}:{" "}
                            </span>
                            {highlightSearch("Change map orientation")}
                        </li>
                        <li>
                            <span className="text-indigo-400">
                                {highlightSearch("Swipe up")}:{" "}
                            </span>
                            {highlightSearch("View route overview")}
                        </li>
                        <li>
                            <span className="text-indigo-400">
                                {highlightSearch("Tap")}:{" "}
                            </span>
                            {highlightSearch(
                                "View information about a place or incident"
                            )}
                        </li>
                    </ul>
                </div>
            </div>

            <div id="navigation-guide#planning-routes" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    {highlightSearch("Planning Routes")}
                </h2>

                <p className="text-gray-300 mb-6">
                    {highlightSearch(
                        "Supmap allows you to plan routes in advance and customize them according to your needs."
                    )}
                </p>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-white mb-4">
                        {highlightSearch("Multiple Routes")}
                    </h3>

                    <p className="text-gray-300 mb-4">
                        {highlightSearch(
                            "When you search for a destination, Supmap offers up to three route options:"
                        )}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                                    1
                                </div>
                                <div className="text-white font-medium">
                                    {highlightSearch("Fastest Route")}
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">
                                {highlightSearch(
                                    "The most time-efficient route based on current traffic conditions."
                                )}
                            </p>
                            <div className="flex items-center mt-3 text-blue-400">
                                <Clock className="w-4 h-4 mr-1" />
                                <span className="text-sm">
                                    {highlightSearch("Time prioritized")}
                                </span>
                            </div>
                        </div>

                        <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-3">
                                    2
                                </div>
                                <div className="text-white font-medium">
                                    {highlightSearch("Alternative Route")}
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">
                                {highlightSearch(
                                    "A different path that may be slightly longer but avoids high-traffic areas."
                                )}
                            </p>
                            <div className="flex items-center mt-3 text-green-400">
                                <CarFront className="w-4 h-4 mr-1" />
                                <span className="text-sm">
                                    {highlightSearch("Balanced option")}
                                </span>
                            </div>
                        </div>

                        <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-3">
                                    3
                                </div>
                                <div className="text-white font-medium">
                                    {highlightSearch("Scenic Route")}
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">
                                {highlightSearch(
                                    "A route that may take longer but offers a more enjoyable driving experience."
                                )}
                            </p>
                            <div className="flex items-center mt-3 text-purple-400">
                                <Map className="w-4 h-4 mr-1" />
                                <span className="text-sm">
                                    {highlightSearch("Experience prioritized")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-white mb-4">
                        {highlightSearch("Multi-stop Routes")}
                    </h3>

                    <p className="text-gray-300 mb-4">
                        {highlightSearch(
                            "Need to make multiple stops during your journey? Here's how to add waypoints:"
                        )}
                    </p>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30 mb-4">
                        <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                            <li>{highlightSearch("Enter your origin")}</li>
                            <li>{highlightSearch("Enter your destination")}</li>
                            <li>{highlightSearch("Tap the '+' button")}</li>
                            <li>
                                {highlightSearch(
                                    "Add intermediate stops (up to 5 stops allowed)"
                                )}
                            </li>
                            <li>
                                {highlightSearch(
                                    "Tap 'Search' to calculate your multi-stop route"
                                )}
                            </li>
                        </ol>
                    </div>

                    <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                        <h4 className="text-yellow-500 font-medium flex items-center mb-2">
                            <AlertTriangle className="w-5 h-5 mr-2" />
                            {highlightSearch("Note")}
                        </h4>
                        <p className="text-gray-300 text-sm">
                            {highlightSearch(
                                "Adding multiple stops will increase your total journey time. Supmap will optimize the route between stops but will maintain the order you specified."
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <div id="navigation-guide#preferences" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    {highlightSearch("Route Preferences")}
                </h2>

                <p className="text-gray-300 mb-6">
                    {highlightSearch(
                        "Customize your navigation experience by setting your route preferences according to your driving style and needs."
                    )}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                            <h3 className="font-medium text-white flex items-center">
                                <Sliders className="w-5 h-5 mr-2 text-indigo-400" />
                                {highlightSearch("Route Types")}
                            </h3>
                        </div>
                        <div className="p-4">
                            <ul className="text-gray-300 space-y-3">
                                <li className="flex items-start">
                                    <svg
                                        className="w-5 h-5 text-indigo-400 mr-2 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        ></path>
                                    </svg>
                                    <div>
                                        <span className="font-medium text-white">
                                            {highlightSearch("Shortest Route")}
                                        </span>
                                        <p className="text-sm text-gray-400">
                                            {highlightSearch(
                                                "Minimizes distance regardless of traffic conditions"
                                            )}
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="w-5 h-5 text-indigo-400 mr-2 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 3v4M3 5h4M6 17v4M3 21h4M15 3v4M13 5h4M18 17v4M15 21h4M21 3v14c0 .98-.67 1.94-1.5 1.5 1.5s1.5 1.94 1.5 2.92A2 2 0 012 21h-4"
                                        ></path>
                                    </svg>
                                    <div>
                                        <span className="font-medium text-white">
                                            {highlightSearch("Eco-friendly")}
                                        </span>
                                        <p className="text-sm text-gray-400">
                                            {highlightSearch(
                                                "Optimizes for fuel efficiency and reduced emissions"
                                            )}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                            <h3 className="font-medium text-white flex items-center">
                                <Sliders className="w-5 h-5 mr-2 text-green-400" />
                                {highlightSearch("Avoidance Options")}
                            </h3>
                        </div>
                        <div className="p-4">
                            <ul className="text-gray-300 space-y-3">
                                <li className="flex items-start">
                                    <BadgeDollarSign className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                                    <div>
                                        <span className="font-medium text-white">
                                            {highlightSearch("Avoid Tolls")}
                                        </span>
                                        <p className="text-sm text-gray-400">
                                            {highlightSearch(
                                                "Choose toll-free routes even if longer"
                                            )}
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <Route className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                                    <div>
                                        <span className="font-medium text-white">
                                            {highlightSearch("Avoid Highways")}
                                        </span>
                                        <p className="text-sm text-gray-400">
                                            {highlightSearch(
                                                "Prefer local roads over major highways"
                                            )}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-medium text-white mb-4">
                    {highlightSearch("Setting Default Preferences")}
                </h3>

                <p className="text-gray-300 mb-4">
                    {highlightSearch(
                        "Configure your default navigation preferences:"
                    )}
                </p>

                <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30 mb-4">
                    <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                        <li>{highlightSearch("Go to Settings")}</li>
                        <li>{highlightSearch("Select 'Route Preferences'")}</li>
                        <li>
                            {highlightSearch(
                                "Toggle avoidance options (tolls, highways)"
                            )}
                        </li>
                        <li>
                            {highlightSearch(
                                "Set your preferred transport mode (car, walking, bicycle, public transport)"
                            )}
                        </li>
                    </ol>
                </div>
            </div>

            <div id="navigation-guide#favorites" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    {highlightSearch("Saving Favorites")}
                </h2>

                <p className="text-gray-300 mb-6">
                    {highlightSearch(
                        "Save time by storing your frequently visited locations and routes."
                    )}
                </p>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-white mb-4">
                        {highlightSearch("Saving Locations")}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                            <h4 className="font-medium text-white flex items-center mb-4">
                                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                                {highlightSearch("Method 1: From Map")}
                            </h4>
                            <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                                <li>
                                    {highlightSearch(
                                        "Long press on any location on the map"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch(
                                        "Tap the location card that appears"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch(
                                        "Tap the star icon to save"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch(
                                        "Add a custom name (optional)"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch(
                                        "Choose a category (optional)"
                                    )}
                                </li>
                            </ol>
                        </div>

                        <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                            <h4 className="font-medium text-white flex items-center mb-4">
                                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                                {highlightSearch("Method 2: From Search")}
                            </h4>
                            <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                                <li>
                                    {highlightSearch("Search for a location")}
                                </li>
                                <li>{highlightSearch("Tap on the result")}</li>
                                <li>
                                    {highlightSearch(
                                        "Tap the star icon in the location details"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch(
                                        "Add a custom name (optional)"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch(
                                        "Choose a category (optional)"
                                    )}
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-white mb-4">
                        {highlightSearch("Managing Favorites")}
                    </h3>

                    <p className="text-gray-300 mb-4">
                        {highlightSearch(
                            "Organize and access your saved locations:"
                        )}
                    </p>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30 mb-4">
                        <h4 className="font-medium text-white mb-4">
                            {highlightSearch("Accessing Favorites")}
                        </h4>
                        <ul className="text-gray-300 space-y-2">
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-indigo-400 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                {highlightSearch(
                                    "Tap the search bar and select from 'Saved Places' section"
                                )}
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-indigo-400 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                {highlightSearch(
                                    "Go to Menu - Saved Places to see all your favorites"
                                )}
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-indigo-400 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                {highlightSearch(
                                    "Favorites appear as starred locations on your map"
                                )}
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-4">
                            {highlightSearch("Organizing Favorites")}
                        </h4>
                        <ul className="text-gray-300 space-y-2">
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-indigo-400 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                {highlightSearch(
                                    "Create categories (Home, Work, Restaurants, etc.)"
                                )}
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-indigo-400 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                {highlightSearch(
                                    "Edit or delete places by tapping Edit in the Saved Places screen"
                                )}
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-indigo-400 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                {highlightSearch(
                                    "Add custom icons to make locations easier to identify"
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-md shadow-lg border border-indigo-900/30 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">
                    {highlightSearch("Next Steps")}
                </h2>
                <p className="text-gray-300 mb-4">
                    {highlightSearch(
                        "Now that you're familiar with navigation features, learn how to:"
                    )}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                        href="#alerts-reporting"
                        onClick={(event) =>
                            handleLinkClick(event, "alerts-reporting")
                        }
                        className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors"
                    >
                        <div className="mr-4 p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v3a1 1 0 002 0v-3a1 1 0 00-2-2H8a1 1 0 000-2V4a1 1 0 002 2zM9 9a1 1 0 11-2 2v11c0 .98-.5 1.5-.98 1.5 1.5 0 011.5 1.5zm1.5 1.5h11a1 1 0 011-1.5V9a1 1 0 01-2-2H9zM4 12h2a1 1 0 002-2v-3a1 1 0 00-2-2H4zM2 14h11a1 1 0 001-1.5V12a1 1 0 00-2-2H2zM15 2H4a1 1 0 00-1.5 1.5v1a1 1 0 001 1.5zm12 0a1 1 0 100-2 2z"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-medium text-white">
                                {highlightSearch("Alerts & Reporting")}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {highlightSearch(
                                    "Report and receive real-time incident alerts"
                                )}
                            </p>
                        </div>
                    </a>

                    <a
                        href="#account-management"
                        onClick={(event) =>
                            handleLinkClick(event, "account-management")
                        }
                        className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors"
                    >
                        <div className="mr-4 p-2 bg-purple-500/10 rounded-lg text-purple-400">
                            <UserIcon size={18} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white">
                                {highlightSearch("Account Management")}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {highlightSearch(
                                    "Manage your profile and alert preferences"
                                )}
                            </p>
                        </div>
                    </a>

                    <a
                        href="#mobile-app"
                        onClick={(event) =>
                            handleLinkClick(event, "mobile-app")
                        }
                        className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors"
                    >
                        <div className="mr-4 p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <Smartphone size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white">
                                {highlightSearch("Mobile App")}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {highlightSearch(
                                    "Get the most from the Supmap mobile experience"
                                )}
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NavigationGuide;
