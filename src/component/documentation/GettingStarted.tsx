import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Smartphone,
    Monitor,
    MapPin,
    Route,
    UserIcon,
    Navigation,
} from "lucide-react";

interface GettingStartedProps {
    handleLinkClick: (
        event: React.MouseEvent<HTMLAnchorElement>,
        section: string
    ) => void;
    searchQuery: string;
}

const GettingStarted: React.FC<GettingStartedProps> = ({
    handleLinkClick,
    searchQuery,
}) => {
    const highlightSearch = (text: string | undefined | null) => {
        if (!text) return "";
        if (!searchQuery) return text;

        const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(${escapedQuery})`, "gi");

        return text.split(regex).map((part, index) =>
            regex.test(part) &&
            part.toLowerCase() === searchQuery.toLowerCase() ? (
                <mark key={index} className="bg-yellow-300 text-black">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    const navigate = useNavigate();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                {highlightSearch("Getting Started with Supmap")}
            </h1>

            <p className="text-gray-300 mb-8 text-lg">
                {highlightSearch(
                    "Welcome to Supmap! This guide will help you get started with our real-time navigation platform and show you how to make the most of its features."
                )}
            </p>

            <div id="getting-started#overview" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    {highlightSearch("Overview")}
                </h2>

                <p className="text-gray-300 mb-4">
                    {highlightSearch(
                        "Supmap is a community-powered navigation platform that provides real-time traffic updates, optimal routing, and incident reporting. Our platform combines advanced navigation tools with community-verified data to help you reach your destination faster and safer."
                    )}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg flex items-start border border-indigo-900/30">
                        <div className="mr-4 mt-1 p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                            <Monitor size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white mb-1">
                                {highlightSearch("Web Application")}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {highlightSearch(
                                    "Plan routes, explore traffic patterns, and manage your account"
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg flex items-start border border-indigo-900/30">
                        <div className="mr-4 mt-1 p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <Smartphone size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white mb-1">
                                {highlightSearch("Mobile Apps")}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {highlightSearch(
                                    "Navigate on-the-go with iOS and Android applications"
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg flex items-start border border-indigo-900/30">
                        <div className="mr-4 mt-1 p-2 bg-green-500/10 rounded-lg text-green-400">
                            <Route size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white mb-1">
                                {highlightSearch("Real-time Navigation")}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {highlightSearch(
                                    "Get traffic-aware directions with automatic rerouting"
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg flex items-start border border-indigo-900/30">
                        <div className="mr-4 mt-1 p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white mb-1">
                                {highlightSearch("Community Reports")}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {highlightSearch(
                                    "Report and verify traffic incidents to help other users"
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                    <h4 className="text-blue-400 font-medium flex items-center mb-2">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        {highlightSearch("Did you know?")}
                    </h4>
                    <p className="text-gray-300 text-sm">
                        {highlightSearch(
                            "Supmap users report over 10,000 incidents daily, helping fellow drivers save an average of 15 minutes on their commutes."
                        )}
                    </p>
                </div>
            </div>

            <div id="getting-started#installation" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    {highlightSearch("Installation")}
                </h2>

                <h3 className="text-xl font-medium text-white mb-4">
                    {highlightSearch("Web Application")}
                </h3>

                <p className="text-gray-300 mb-4">
                    {highlightSearch(
                        "The Supmap web application is accessible directly through your browser. No installation is required – simply visit "
                    )}
                    <a
                        href="/navigation"
                        className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                    >
                        {highlightSearch("app.supmap.com")}
                    </a>
                    {highlightSearch(" to get started.")}
                </p>

                <h3 className="text-xl font-medium text-white mb-4 mt-6">
                    {highlightSearch("Mobile Applications")}
                </h3>

                <p className="text-gray-300 mb-4">
                    {highlightSearch(
                        "Download the Supmap mobile app from your device's app store:"
                    )}
                </p>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
                    onClick={() => navigate("/mobile/app")}
                >
                    <a
                        href="./pages/common/MobileApp.tsx"
                        className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(20,25,40,0.6)] transition-colors"
                    >
                        <div className="mr-4 p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <svg
                                className="w-8 h-8"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-white font-medium">
                                {highlightSearch("Download on the")}
                            </p>
                            <p className="text-xl text-white font-semibold">
                                {highlightSearch("App Store")}
                            </p>
                        </div>
                    </a>

                    <a
                        href="#"
                        className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(20,25,40,0.6)] transition-colors"
                    >
                        <div className="mr-4 p-2 bg-green-500/10 rounded-lg text-green-400">
                            <svg
                                className="w-8 h-8"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M3.18 20.82C3.49 21.13 3.91 21.34 4.4 21.34C4.67 21.34 4.95 21.28 5.22 21.15L12 17.3L18.78 21.15C19.05 21.28 19.33 21.34 19.59 21.34C20.1 21.34 20.51 21.13 20.82 20.82C21.18 20.46 21.34 20 21.34 19.41V4.59C21.34 4 21.18 3.54 20.82 3.18C20.45 2.82 20 2.66 19.41 2.66H4.59C4 2.66 3.54 2.82 3.18 3.18C2.82 3.54 2.66 4 2.66 4.59V19.41C2.66 20 2.82 20.46 3.18 20.82Z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-white font-medium">
                                {highlightSearch("Get it on")}
                            </p>
                            <p className="text-xl text-white font-semibold">
                                {highlightSearch("Google Play")}
                            </p>
                        </div>
                    </a>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
                    <h4 className="text-yellow-500 font-medium flex items-center mb-2">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        {highlightSearch("System Requirements")}
                    </h4>
                    <ul className="text-gray-300 text-sm list-disc list-inside ml-2 space-y-1">
                        <li>{highlightSearch("iOS 13.0 or later")}</li>
                        <li>{highlightSearch("Android 8.0 or later")}</li>
                        <li>
                            {highlightSearch(
                                "Modern web browser (Chrome, Firefox, Safari, Edge)"
                            )}
                        </li>
                    </ul>
                </div>
            </div>

            <div id="getting-started#account-creation" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    {highlightSearch("Creating an Account")}
                </h2>

                <p className="text-gray-300 mb-4">
                    {highlightSearch(
                        "While Supmap offers basic navigation features without registration, creating an account unlocks the full potential of the platform, including:"
                    )}
                </p>

                <ul className="text-gray-300 mb-6 space-y-2">
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
                            "Saving favorite locations and routes"
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
                            "Syncing data across multiple devices"
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
                            "Contributing to the community by reporting and verifying incidents"
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
                            "Accessing your travel history and statistics"
                        )}
                    </li>
                </ul>

                <h3 className="text-xl font-medium text-white mb-4">
                    {highlightSearch("Sign-up Options")}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3">
                            {highlightSearch("Email Registration")}
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                            {highlightSearch(
                                "Create an account using your email address and a secure password."
                            )}
                        </p>
                        <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside ml-1">
                            <li>
                                {highlightSearch(
                                    'Click "Sign Up" in the top-right corner'
                                )}
                            </li>
                            <li>
                                {highlightSearch("Enter your email address")}
                            </li>
                            <li>
                                {highlightSearch(
                                    "Create a password (min. 8 characters)"
                                )}
                            </li>
                            <li>
                                {highlightSearch("Verify your email address")}
                            </li>
                        </ol>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3">
                            {highlightSearch("Social Login")}
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                            {highlightSearch(
                                "Use your existing social accounts for quicker registration."
                            )}
                        </p>
                        <div className="space-y-3">
                            <button className="w-full py-2 px-4 bg-white text-gray-800 text-sm font-medium rounded flex items-center justify-center">
                                {highlightSearch("Continue with Google")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="getting-started#first-steps" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    {highlightSearch("First Steps")}
                </h2>

                <p className="text-gray-300 mb-6">
                    {highlightSearch(
                        "Now that you have Supmap installed and your account set up, let's explore some basic features to get you started:"
                    )}
                </p>

                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-5 md:w-1/3 flex flex-col justify-center items-center bg-indigo-900/20">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
                                <span className="text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-medium text-white text-center">
                                {highlightSearch("Set Your Home & Work")}
                            </h3>
                        </div>
                        <div className="p-5 md:w-2/3 border-t md:border-t-0 md:border-l border-indigo-900/30">
                            <p className="text-gray-300 mb-4">
                                {highlightSearch(
                                    "Adding your home and work locations helps Supmap provide quicker navigation and relevant traffic updates for your daily commute."
                                )}
                            </p>
                            <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                                <li>
                                    {highlightSearch(
                                        "Go to your profile settings"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch('Select "Saved Places"')}
                                </li>
                                <li>
                                    {highlightSearch(
                                        "Add your Home and Work addresses"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch(
                                        "You can now quickly navigate to these locations from the main screen"
                                    )}
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-5 md:w-1/3 flex flex-col justify-center items-center bg-indigo-900/20">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
                                <span className="text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-medium text-white text-center">
                                {highlightSearch("Explore the Map")}
                            </h3>
                        </div>
                        <div className="p-5 md:w-2/3 border-t md:border-t-0 md:border-l border-indigo-900/30">
                            <p className="text-gray-300 mb-4">
                                {highlightSearch(
                                    "Familiarize yourself with the map interface to understand traffic conditions at a glance."
                                )}
                            </p>
                            <ul className="text-gray-300 space-y-2">
                                <li>
                                    <span className="text-green-400 font-medium">
                                        {highlightSearch("Green roads:")}
                                    </span>{" "}
                                    {highlightSearch("Free-flowing traffic")}
                                </li>
                                <li>
                                    <span className="text-yellow-400 font-medium">
                                        {highlightSearch("Yellow roads:")}
                                    </span>{" "}
                                    {highlightSearch("Moderate congestion")}
                                </li>
                                <li>
                                    <span className="text-red-400 font-medium">
                                        {highlightSearch("Red roads:")}
                                    </span>{" "}
                                    {highlightSearch("Heavy traffic")}
                                </li>
                                <li>
                                    <span className="text-purple-400 font-medium">
                                        {highlightSearch("Icons:")}
                                    </span>{" "}
                                    {highlightSearch(
                                        "Incidents reported by the community"
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-5 md:w-1/3 flex flex-col justify-center items-center bg-indigo-900/20">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
                                <span className="text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-medium text-white text-center">
                                {highlightSearch("Start Navigating")}
                            </h3>
                        </div>
                        <div className="p-5 md:w-2/3 border-t md:border-t-0 md:border-l border-indigo-900/30">
                            <p className="text-gray-300 mb-4">
                                {highlightSearch(
                                    "Begin your first journey with Supmap:"
                                )}
                            </p>
                            <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                                <li>
                                    {highlightSearch(
                                        "Tap the search bar at the top of the screen"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch(
                                        "Enter your destination or select from saved places"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch(
                                        "Review the suggested routes and select one"
                                    )}
                                </li>
                                <li>
                                    {highlightSearch(
                                        'Tap "Start Navigation" to begin turn-by-turn directions'
                                    )}
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4 mt-6">
                    <h4 className="text-indigo-400 font-medium flex items-center mb-2">
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        {highlightSearch("Pro Tip")}
                    </h4>
                    <p className="text-gray-300 text-sm">
                        {highlightSearch(
                            "Enable voice guidance in the settings menu for safer, hands-free navigation."
                        )}
                    </p>
                </div>
            </div>

            <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-md shadow-lg border border-indigo-900/30 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">
                    {highlightSearch("Next Steps")}
                </h2>
                <p className="text-gray-300 mb-4">
                    {highlightSearch(
                        "Now that you're familiar with the basics, explore these guides to get more out of Supmap:"
                    )}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                        href="#navigation-guide"
                        onClick={(event) =>
                            handleLinkClick(event, "navigation-guide")
                        }
                        className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors"
                    >
                        <div className="mr-4 p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                            <Navigation size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white">
                                {highlightSearch("Navigation Guide")}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {highlightSearch(
                                    "Master route planning and preferences"
                                )}
                            </p>
                        </div>
                    </a>

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
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-medium text-white">
                                {highlightSearch("Alerts & Reporting")}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {highlightSearch(
                                    "Report and verify traffic incidents"
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
                                    "Privacy and profile settings"
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
                                    "Get the most from the mobile experience"
                                )}
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default GettingStarted;
