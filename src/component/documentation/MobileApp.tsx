import React from "react";
import {
    Smartphone,
    Navigation,
    Battery,
    Download,
    Zap,
    Map,
    Globe,
    BookOpenIcon,
    UserIcon,
} from "lucide-react";

const MobileApp: React.FC<{ handleLinkClick: (event: React.MouseEvent<HTMLAnchorElement>, section: string) => void }> = ({ handleLinkClick }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                Mobile App
            </h1>

            <p className="text-gray-300 mb-8 text-lg">
                Get the most out of the Supmap mobile experience with these tips
                and features designed specifically for iOS and Android devices.
            </p>

            <div id="mobile-app#installation" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Installation
                </h2>

                <p className="text-gray-300 mb-6">
                    Download and install Supmap on your mobile device to enjoy
                    full navigation functionality on the go.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                            <h4 className="font-medium text-white flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2 text-blue-400"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                                </svg>
                                iOS Installation
                            </h4>
                        </div>
                        <div className="p-5">
                            <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                                <li>Open the App Store on your iOS device</li>
                                <li>Search for "Supmap Navigation"</li>
                                <li>Tap "Get" or the download icon</li>
                                <li>Authenticate with Apple ID if prompted</li>
                                <li>Wait for the installation to complete</li>
                                <li>
                                    Open the app and sign in to your account
                                </li>
                            </ol>

                            <div className="mt-4 text-sm text-gray-400">
                                <p className="font-medium">
                                    System Requirements:
                                </p>
                                <ul className="list-disc list-inside mt-1 ml-1 space-y-1">
                                    <li>iOS 14.0 or later</li>
                                    <li>
                                        Compatible with iPhone, iPad, and iPod
                                        touch
                                    </li>
                                    <li>
                                        Approximately 150MB of storage space
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                            <h4 className="font-medium text-white flex items-center">
                                <svg
                                    className="w-5 h-5 mr-2 text-green-400"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M17.523 15.34l.503 1.05-9.726 4.63-.67-1.393 9.893-4.288zM6.47 14.32l1.373-.598 4.625 2.215-1.373.598L6.47 14.32zm10.39-8.698l1.374-.598 1.644 3.786-1.373.598-1.644-3.786zM3.544 9.082l1.644-3.786 1.373.598-1.644 3.786-1.373-.598zm7.863-6.48l1.05.504-4.63 9.726-1.394-.67L11.407 2.6zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 11-16 0 8 8 0 0116 0z" />
                                </svg>
                                Android Installation
                            </h4>
                        </div>
                        <div className="p-5">
                            <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                                <li>
                                    Open the Google Play Store on your Android
                                    device
                                </li>
                                <li>Search for "Supmap Navigation"</li>
                                <li>Tap "Install"</li>
                                <li>Review and accept permissions</li>
                                <li>Wait for the installation to complete</li>
                                <li>
                                    Open the app and sign in to your account
                                </li>
                            </ol>

                            <div className="mt-4 text-sm text-gray-400">
                                <p className="font-medium">
                                    System Requirements:
                                </p>
                                <ul className="list-disc list-inside mt-1 ml-1 space-y-1">
                                    <li>Android 8.0 (Oreo) or later</li>
                                    <li>Google Play Services installed</li>
                                    <li>
                                        Approximately 100MB of storage space
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-4 mb-6">
                    <h4 className="text-indigo-400 font-medium flex items-center mb-2">
                        <Download className="w-5 h-5 mr-2" />
                        Direct Download
                    </h4>
                    <p className="text-gray-300 text-sm">
                        You can also download the app directly from our website
                        at{" "}
                        <span className="text-indigo-400">
                            supmap.com/download
                        </span>
                        . This is useful for Android users without Google Play
                        or for downloading specific versions. iOS users will
                        still need to use the App Store due to Apple's
                        restrictions.
                    </p>
                </div>
            </div>

            <div id="mobile-app#sync" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Syncing with Web
                </h2>

                <p className="text-gray-300 mb-6">
                    Supmap allows seamless synchronization between the web and
                    mobile applications, letting you plan routes on your
                    computer and navigate with your phone.
                </p>

                <h3 className="text-xl font-medium text-white mb-4">
                    Sync Features
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3 flex items-center">
                            <Globe className="w-5 h-5 mr-2 text-indigo-400" />
                            What Syncs Automatically
                        </h4>
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
                                Account information and preferences
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
                                Saved locations (home, work, favorites)
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
                                Recent searches and destinations
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
                                Contribution history and reputation
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3 flex items-center">
                            <Smartphone className="w-5 h-5 mr-2 text-blue-400" />
                            Send to Phone
                        </h4>
                        <p className="text-gray-300 mb-3 text-sm">
                            Planning a route on web and want to use it on
                            mobile? Here's how:
                        </p>
                        <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside ml-1">
                            <li>Plan your route on the web application</li>
                            <li>Click the "Send to Phone" button</li>
                            <li>Scan the QR Code</li>
                        </ol>
                    </div>
                </div>

                <h3 className="text-xl font-medium text-white mb-4">
                    QR Code Sharing
                </h3>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <svg
                                className="w-5 h-5 mr-2 text-indigo-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                ></path>
                            </svg>
                            Using QR Codes for Route Sharing
                        </h4>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h5 className="text-white font-medium mb-2">
                                    Generate a QR Code
                                </h5>
                                <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside ml-1">
                                    <li>Create a route on web</li>
                                    <li>Click the share icon</li>
                                    <li>Select "Generate QR Code"</li>
                                    <li>A QR code will appear on screen</li>
                                </ol>
                            </div>

                            <div>
                                <h5 className="text-white font-medium mb-2">
                                    Scan a QR Code
                                </h5>
                                <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside ml-1">
                                    <li>Open the Supmap mobile app</li>
                                    <li>Tap the search bar</li>
                                    <li>Select the QR code icon</li>
                                    <li>Point your camera at the QR code</li>
                                </ol>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-indigo-900/30 rounded-lg">
                            <p className="text-gray-300 text-sm">
                                QR codes are perfect for sharing routes with
                                friends, family, or colleagues. They can be
                                printed, sent via messaging apps, or shown from
                                one screen to another.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="mobile-app#offline" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Offline Usage
                </h2>

                <p className="text-gray-300 mb-6">
                    Supmap offers robust offline capabilities to ensure you can
                    navigate even when you're in areas with poor or no
                    connectivity.
                </p>

                <h3 className="text-xl font-medium text-white mb-4">
                    Offline Capabilities
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3 flex items-center">
                            <Map className="w-5 h-5 mr-2 text-green-400" />
                            Available Offline
                        </h4>
                        <ul className="text-gray-300 space-y-2 text-sm">
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-green-400 mr-2 mt-0.5"
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
                                Full map display
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-green-400 mr-2 mt-0.5"
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
                                Turn-by-turn navigation
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-green-400 mr-2 mt-0.5"
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
                                Address search
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-green-400 mr-2 mt-0.5"
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
                                Saved routes and places
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3 flex items-center">
                            <svg
                                className="w-5 h-5 mr-2 text-yellow-400"
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
                            Limited Offline
                        </h4>
                        <ul className="text-gray-300 space-y-2 text-sm">
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-yellow-400 mr-2 mt-0.5"
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
                                POI search (basic only)
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-yellow-400 mr-2 mt-0.5"
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
                                Voice guidance (basic commands)
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-yellow-400 mr-2 mt-0.5"
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
                                Alternative routes (limited)
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-yellow-400 mr-2 mt-0.5"
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
                                Lane guidance (major roads only)
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3 flex items-center">
                            <svg
                                className="w-5 h-5 mr-2 text-red-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                            Requires Connection
                        </h4>
                        <ul className="text-gray-300 space-y-2 text-sm">
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-red-400 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                                Real-time traffic data
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-red-400 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                                Community alerts and reports
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-red-400 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                                Satellite view and 3D buildings
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-red-400 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                                Account sync and backup
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="mobile-app#battery" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Battery Optimization
                </h2>

                <p className="text-gray-300 mb-6">
                    Navigation apps can be power-intensive. Learn how to
                    minimize battery consumption while using Supmap for longer
                    journeys.
                </p>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <Battery className="w-5 h-5 mr-2 text-green-400" />
                            Battery Saving Tips
                        </h4>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h5 className="text-white font-medium mb-3">
                                    Phone Settings
                                </h5>
                                <ul className="text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-green-400 mr-2 mt-0.5"
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
                                        Enable "Battery Saver Mode" in Settings
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-green-400 mr-2 mt-0.5"
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
                                        Reduce screen brightness
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-green-400 mr-2 mt-0.5"
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
                                        Disable unnecessary notifications
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h5 className="text-white font-medium mb-3">
                                    General Tips
                                </h5>
                                <ul className="text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-green-400 mr-2 mt-0.5"
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
                                        Use device car charger during navigation
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-green-400 mr-2 mt-0.5"
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
                                        Close other power-intensive apps
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-green-400 mr-2 mt-0.5"
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
                                        Keep your phone at moderate temperature
                                    </li>
                                    <li className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-green-400 mr-2 mt-0.5"
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
                                        Turn off WiFi/Bluetooth if not needed
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                    <h4 className="text-yellow-500 font-medium flex items-center mb-2">
                        <Zap className="w-5 h-5 mr-2" />
                        Important
                    </h4>
                    <p className="text-gray-300 text-sm">
                        GPS navigation is inherently battery-intensive. For long
                        journeys, always keep a charger handy. Supmap is
                        optimized to use less battery than most navigation apps,
                        but it will still drain your battery faster than regular
                        phone use.
                    </p>
                </div>
            </div>

            <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-md shadow-lg border border-indigo-900/30 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                    Need a reminder ?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                        href="#getting-started"
                        onClick={(event) => handleLinkClick(event, 'getting-started')}
                        className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors"
                    >
                        <div className="mr-4 p-2 bg-green-500/10 rounded-lg text-green-400">
                            <BookOpenIcon size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white">
                                Getting Started
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Pick up the basics
                            </p>
                        </div>
                    </a>

                    <a
                        href="#navigation-guide"
                        onClick={(event) => handleLinkClick(event, 'navigation-guide')}
                        className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors"
                    >
                        <div className="mr-4 p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                            <Navigation size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white">
                                Navigation Guide
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Master the core navigation features
                            </p>
                        </div>
                    </a>

                    <a
                        href="#alerts-reporting"
                        onClick={(event) => handleLinkClick(event, 'alerts-reporting')}
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
                                Alerts & Reporting
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Contribute to the Supmap community
                            </p>
                        </div>
                    </a>

                    <a
                        href="#account-management"
                        onClick={(event) => handleLinkClick(event, 'account-management')}
                        className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors"
                    >
                        <div className="mr-4 p-2 bg-purple-500/10 rounded-lg text-purple-400">
                            <UserIcon size={18} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white">
                                Account Management
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Manage your profile and alert preferences
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MobileApp;
