import React from "react";
import { User, Shield, Database, Smartphone } from "lucide-react";

interface AccountManagementProps {
    handleLinkClick: (
        event: React.MouseEvent<HTMLAnchorElement>,
        section: string
    ) => void;
    searchQuery: string;
}

const AccountManagement: React.FC<AccountManagementProps> = ({
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
                {highlightSearch("Account Management")}
            </h1>

            <p className="text-gray-300 mb-8 text-lg">
                {highlightSearch(
                    "Learn how to manage your Supmap account settings, control your privacy, and customize your navigation experience."
                )}
            </p>

            <div id="account-management#profile" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    {highlightSearch("Profile Settings")}
                </h2>

                <p className="text-gray-300 mb-6">
                    {highlightSearch(
                        "Your Supmap profile contains your personal information and preferences. Here's how to manage your profile settings."
                    )}
                </p>

                <h3 className="text-xl font-medium text-white mb-4">
                    {highlightSearch("Accessing Your Profile")}
                </h3>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <User className="w-5 h-5 mr-2 text-indigo-400" />
                            {highlightSearch("Profile Access Methods")}
                        </h4>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h5 className="text-white font-medium mb-2">
                                    {highlightSearch("Web Version")}
                                </h5>
                                <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside ml-1">
                                    <li>
                                        {highlightSearch(
                                            "Click your profile icon in the top right corner"
                                        )}
                                    </li>
                                    <li>
                                        {highlightSearch(
                                            "Select 'My Profile' from the dropdown menu"
                                        )}
                                    </li>
                                    <li>
                                        {highlightSearch(
                                            "Or navigate to Settings - Profile"
                                        )}
                                    </li>
                                </ol>
                            </div>

                            <div>
                                <h5 className="text-white font-medium mb-2">
                                    {highlightSearch("Mobile App")}
                                </h5>
                                <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside ml-1">
                                    <li>
                                        {highlightSearch(
                                            "Login then tap the profile icon at the center of the tabs at the bottom"
                                        )}
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-medium text-white mb-4">
                    {highlightSearch("Editing Your Profile")}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3">
                            {highlightSearch("Basic Information")}
                        </h4>
                        <p className="text-gray-300 mb-3 text-sm">
                            {highlightSearch("Update your personal details:")}
                        </p>
                        <ul className="text-gray-300 space-y-2 text-sm">
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
                                    "Profile picture (upload or select avatar)"
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
                                    "Display name (shown to other users)"
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
                                    "Email address (for account communications)"
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
                                {highlightSearch("Password (change or reset)")}
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3">
                            {highlightSearch("Specific Information")}
                        </h4>
                        <p className="text-gray-300 mb-3 text-sm">
                            {highlightSearch(
                                "Manage your preferences and rank in the community:"
                            )}
                        </p>
                        <ul className="text-gray-300 space-y-2 text-sm">
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
                                {highlightSearch("Favorite locations")}
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
                                {highlightSearch("Rank of trust")}
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
                                {highlightSearch("Your stats")}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4">
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
                        {highlightSearch("Account Sync")}
                    </h4>
                    <p className="text-gray-300 text-sm">
                        {highlightSearch(
                            "Profile changes are automatically synced across all your devices. Log out and back in if you don't see your updates immediately reflected."
                        )}
                    </p>
                </div>
            </div>

            <div id="account-management#privacy" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    {highlightSearch("Privacy Controls")}
                </h2>

                <p className="text-gray-300 mb-6">
                    {highlightSearch(
                        "Supmap takes your privacy seriously. Here are the options available to control your data and visibility."
                    )}
                </p>

                <h3 className="text-xl font-medium text-white mb-4">
                    {highlightSearch("Privacy Settings")}
                </h3>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-purple-400" />
                            {highlightSearch("Privacy Options")}
                        </h4>
                    </div>
                    <div className="p-5">
                        <p className="text-gray-300 mb-4">
                            {highlightSearch(
                                "Access these settings in your phone settings for permissions or in the settings of the app."
                            )}
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h5 className="text-white font-medium mb-2">
                                    {highlightSearch("Location Privacy")}
                                </h5>
                                <ul className="text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-purple-400 mr-2 mt-0.5"
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
                                        <div>
                                            <span className="font-medium">
                                                {highlightSearch(
                                                    "Location Tracking"
                                                )}
                                            </span>
                                            <p className="text-gray-400">
                                                {highlightSearch(
                                                    "Control when Supmap can access your location (Always, While Using, Never)"
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-purple-400 mr-2 mt-0.5"
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
                                        <div>
                                            <span className="font-medium">
                                                {highlightSearch(
                                                    "Location History"
                                                )}
                                            </span>
                                            <p className="text-gray-400">
                                                {highlightSearch(
                                                    "Choose whether to save your travel history (On/Off)"
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-purple-400 mr-2 mt-0.5"
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
                                        <div>
                                            <span className="font-medium">
                                                {highlightSearch(
                                                    "Background Location"
                                                )}
                                            </span>
                                            <p className="text-gray-400">
                                                {highlightSearch(
                                                    "Allow location access when app is closed (On/Off)"
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h5 className="text-white font-medium mb-2">
                                    {highlightSearch("Community Privacy")}
                                </h5>
                                <ul className="text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-purple-400 mr-2 mt-0.5"
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
                                        <div>
                                            <span className="font-medium">
                                                {highlightSearch(
                                                    "Report Attribution"
                                                )}
                                            </span>
                                            <p className="text-gray-400">
                                                {highlightSearch(
                                                    "Show/hide your username when reporting incidents (Anonymous/Public)"
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-purple-400 mr-2 mt-0.5"
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
                                        <div>
                                            <span className="font-medium">
                                                {highlightSearch(
                                                    "Profile Visibility"
                                                )}
                                            </span>
                                            <p className="text-gray-400">
                                                {highlightSearch(
                                                    "Control who can see your contribution statistics (Public/Friends/Private)"
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h5 className="text-white font-medium mb-2">
                                    {highlightSearch("Data Sharing")}
                                </h5>
                                <ul className="text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-purple-400 mr-2 mt-0.5"
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
                                        <div>
                                            <span className="font-medium">
                                                {highlightSearch(
                                                    "Traffic Data Contribution"
                                                )}
                                            </span>
                                            <p className="text-gray-400">
                                                {highlightSearch(
                                                    "Share anonymous speed and route data to improve traffic predictions"
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-purple-400 mr-2 mt-0.5"
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
                                        <div>
                                            <span className="font-medium">
                                                {highlightSearch(
                                                    "Analytics Participation"
                                                )}
                                            </span>
                                            <p className="text-gray-400">
                                                {highlightSearch(
                                                    "Allow usage data to improve app performance and features"
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
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
                        {highlightSearch("Important Notice")}
                    </h4>
                    <p className="text-gray-300 text-sm">
                        {highlightSearch(
                            "Some features like navigation and incident reporting require location access to function. Disabling location access may limit app functionality. Supmap never shares your precise location with other users without your explicit permission."
                        )}
                    </p>
                </div>
            </div>

            <div id="account-management#data" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    {highlightSearch("Data Management")}
                </h2>

                <p className="text-gray-300 mb-6">
                    {highlightSearch(
                        "Supmap gives you control over your data. Learn how to view, export, and delete your information."
                    )}
                </p>

                <h3 className="text-xl font-medium text-white mb-4">
                    {highlightSearch("Your Data in Supmap")}
                </h3>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <Database className="w-5 h-5 mr-2 text-blue-400" />
                            {highlightSearch("Types of Data Stored")}
                        </h4>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h5 className="text-white font-medium mb-3">
                                    {highlightSearch("Account Data")}
                                </h5>
                                <ul className="text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
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
                                        {highlightSearch("Profile information")}
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
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
                                            "Authentication details"
                                        )}
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
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
                                            "App settings and preferences"
                                        )}
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h5 className="text-white font-medium mb-3">
                                    {highlightSearch("Usage Data")}
                                </h5>
                                <ul className="text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
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
                                        {highlightSearch("Navigation history")}
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
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
                                            "Saved places and routes"
                                        )}
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
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
                                            "Traffic reports and contributions"
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
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
                        {highlightSearch("Important")}
                    </h4>
                    <p className="text-gray-300 text-sm">
                        {highlightSearch(
                            "Account deletion is permanent and cannot be undone. All your data, including saved places, routes, and contributions will be permanently removed from our systems. Download your data before deleting your account if you wish to keep a copy."
                        )}
                    </p>
                </div>
            </div>

            <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-md shadow-lg border border-indigo-900/30 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                    {highlightSearch("Next Steps")}
                </h2>
                <p className="text-gray-300 mb-4">
                    {highlightSearch(
                        "Now that you understand how to manage your account, explore these related topics:"
                    )}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    "Learn about mobile-specific features"
                                )}
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AccountManagement;
