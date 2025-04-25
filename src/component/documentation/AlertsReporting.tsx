import React from "react";
import {
    AlertTriangle,
    Eye,
    ThumbsUp,
    ThumbsDown,
    MapPin,
    Smartphone,
    Car,
    CloudLightning,
} from "lucide-react";

const AlertsReporting: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                Alerts & Reporting
            </h1>

            <p className="text-gray-300 mb-8 text-lg">
                Supmap's community-powered alert system helps drivers avoid
                hazards and delays through real-time reporting of traffic
                conditions and incidents on the road.
            </p>

            <div id="alerts-reporting#receiving" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Receiving Alerts
                </h2>

                <p className="text-gray-300 mb-6">
                    Supmap alerts you of various road conditions and incidents
                    that may affect your journey.
                </p>

                <h3 className="text-xl font-medium text-white mb-4">
                    Types of Alerts
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 mr-3">
                                <Car size={20} />
                            </div>
                            <div className="text-white font-medium">
                                Traffic Incidents
                            </div>
                        </div>
                        <ul className="text-gray-300 space-y-1 text-sm ml-1">
                            <li>• Accidents</li>
                            <li>• Traffic jams</li>
                            <li>• Stalled vehicles</li>
                            <li>• Road closures</li>
                        </ul>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 mr-3">
                                <AlertTriangle size={20} />
                            </div>
                            <div className="text-white font-medium">
                                Road Hazards
                            </div>
                        </div>
                        <ul className="text-gray-300 space-y-1 text-sm ml-1">
                            <li>• Weather conditions</li>
                            <li>• Objects on road</li>
                            <li>• Construction</li>
                            <li>• Poor road conditions</li>
                        </ul>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3">
                                <Eye size={20} />
                            </div>
                            <div className="text-white font-medium">
                                Other Alerts
                            </div>
                        </div>
                        <ul className="text-gray-300 space-y-1 text-sm ml-1">
                            <li>• Speed traps</li>
                            <li>• Street events</li>
                            <li>• Road closures</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="alerts-reporting#creating" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Creating Reports
                </h2>

                <p className="text-gray-300 mb-6">
                    Contributing to the Supmap community by reporting incidents
                    helps other drivers navigate more safely and efficiently.
                    Here's how to report incidents on the road :
                </p>

                <h3 className="text-xl font-medium text-white mb-4">
                    How to Report an Incident
                </h3>

                <div className="mb-8">
                    <div className="flex flex-col md:flex-row bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden">
                        <div className="p-5 md:w-1/3 flex flex-col justify-center items-center bg-indigo-900/20">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
                                <span className="text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-medium text-white text-center">
                                Tap the Report Button
                            </h3>
                        </div>
                        <div className="p-5 md:w-2/3 border-t md:border-t-0 md:border-l border-indigo-900/30">
                            <p className="text-gray-300 mb-2">
                                During navigation, tap the report button (red
                                icon) at the bottom right of your screen.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mt-4">
                        <div className="p-5 md:w-1/3 flex flex-col justify-center items-center bg-indigo-900/20">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
                                <span className="text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-medium text-white text-center">
                                Select Incident Type
                            </h3>
                        </div>
                        <div className="p-5 md:w-2/3 border-t md:border-t-0 md:border-l border-indigo-900/30">
                            <p className="text-gray-300 mb-3">
                                Choose the type of incident from the menu:
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <div className="bg-red-900/20 p-3 rounded-lg border border-red-800/30 text-center">
                                    <span className="text-white text-sm">
                                        Accident
                                    </span>
                                </div>
                                <div className="bg-orange-900/20 p-3 rounded-lg border border-orange-800/30 text-center">
                                    <span className="text-white text-sm">
                                        Traffic Jam
                                    </span>
                                </div>
                                <div className="bg-yellow-900/20 p-3 rounded-lg border border-yellow-800/30 text-center">
                                    <span className="text-white text-sm">
                                        Road Closure
                                    </span>
                                </div>
                                <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-800/30 text-center">
                                    <span className="text-white text-sm">
                                        Police
                                    </span>
                                </div>
                                <div className="bg-green-900/20 p-3 rounded-lg border border-green-800/30 text-center">
                                    <span className="text-white text-sm">
                                        Hazard
                                    </span>
                                </div>
                                <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-800/30 text-center">
                                    <span className="text-white text-sm">
                                        Other
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mt-4">
                        <div className="p-5 md:w-1/3 flex flex-col justify-center items-center bg-indigo-900/20">
                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
                                <span className="text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-medium text-white text-center">
                                Submit Report
                            </h3>
                        </div>
                        <div className="p-5 md:w-2/3 border-t md:border-t-0 md:border-l border-indigo-900/30">
                            <p className="text-gray-300 mb-3">
                                Tap "Submit" to send your report to the Supmap
                                community. The report will :
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
                                    Immediately appear on the map for nearby
                                    drivers
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
                                    Be available for verification by other users
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
                                    Help Supmap calculate better routes for
                                    everyone
                                </li>
                            </ul>
                        </div>
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
                        Safety First
                    </h4>
                    <p className="text-gray-300 text-sm">
                        Never use your phone while driving to report incidents.
                        Either have a passenger submit the report, or wait until
                        you are safely parked. Your safety and the safety of
                        others on the road is more important than reporting an
                        incident.
                    </p>
                </div>
            </div>

            <div id="alerts-reporting#verifying" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Verifying Reports
                </h2>

                <p className="text-gray-300 mb-6">
                    The accuracy of Supmap's alert system depends on community
                    verification. When you encounter an incident reported by
                    another user, you can confirm or deny its presence to help
                    maintain reliable information.
                </p>

                <h3 className="text-xl font-medium text-white mb-4">
                    How to Verify Reports
                </h3>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <ThumbsUp className="w-5 h-5 mr-2 text-green-400" />
                            Confirming an Incident
                        </h4>
                    </div>
                    <div className="p-5">
                        <p className="text-gray-300 mb-4">
                            When you pass by a reported incident and verify it's
                            still there:
                        </p>
                        <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                            <li>
                                When approaching a reported incident, a card
                                will appear on your screen
                                <div className="mt-1 ml-6 text-sm text-gray-400">
                                    Example: "Accident reported. Is it still
                                    there?"
                                </div>
                            </li>
                            <li>
                                Tap "Yes" to confirm the incident is still
                                present
                            </li>
                            <li>
                                Optionally add additional details or update the
                                report
                            </li>
                            <li>
                                Your confirmation helps keep the alert active
                                for other drivers
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="bg-[rgba(15,18,30,0.6)] rounded-lg border border-indigo-900/30 overflow-hidden mb-6">
                    <div className="p-4 bg-indigo-900/20 border-b border-indigo-900/30">
                        <h4 className="font-medium text-white flex items-center">
                            <ThumbsDown className="w-5 h-5 mr-2 text-red-400" />
                            Reporting a Cleared Incident
                        </h4>
                    </div>
                    <div className="p-5">
                        <p className="text-gray-300 mb-4">
                            When you pass by a reported incident location and
                            the incident is no longer there:
                        </p>
                        <ol className="text-gray-300 space-y-2 list-decimal list-inside ml-1">
                            <li>
                                When approaching a reported incident, a card
                                will appear on your screen
                            </li>
                            <li>
                                Tap "Not there" if the incident has been cleared
                            </li>
                            <li>
                                Your report helps remove outdated alerts from
                                the map
                            </li>
                            <li>
                                Multiple "Not there" reports will automatically
                                remove the alert
                            </li>
                        </ol>
                    </div>
                </div>

                <h3 className="text-xl font-medium text-white mb-4">
                    Impact of Verification
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3">
                            How Verification Works
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
                                Reports gain credibility with each confirmation
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
                                Highly confirmed reports appear more prominently
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
                                Multiple "Not there" reports will remove the
                                alert
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
                                Incidents automatically expire after a certain
                                time
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[rgba(15,18,30,0.6)] p-5 rounded-lg border border-indigo-900/30">
                        <h4 className="font-medium text-white mb-3">
                            Benefits of Verification
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
                                Improves accuracy of alerts for all users
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
                                Prevents outdated information from affecting
                                routes
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
                                Earns you community contribution points
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
                                Helps identify and discourage false reports
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                    <h4 className="text-yellow-500 font-medium flex items-center mb-2">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Important
                    </h4>
                    <p className="text-gray-300 text-sm">
                        Only verify reports when you can directly observe the
                        presence or absence of an incident. Never confirm or
                        deny based on assumption or outdated information.
                    </p>
                </div>
            </div>

            <div id="alerts-reporting#types" className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-indigo-900/30 pb-2">
                    Alert Types
                </h2>

                <p className="text-gray-300 mb-6">
                    Supmap supports a wide range of alert types to keep you
                    informed about road conditions and traffic situations.
                    Familiarize yourself with these alert types to better
                    understand what you're seeing on the map.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <h3 className="text-xl font-medium text-white mb-4">
                            Traffic Incidents
                        </h3>

                        <div className="space-y-4">
                            <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mr-3">
                                        <Car size={16} />
                                    </div>
                                    <div className="text-white font-medium">
                                        Accident
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Collision between vehicles or with objects.
                                    May include severity level (minor, major)
                                    and affected lanes.
                                </p>
                            </div>

                            <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 mr-3">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                        </svg>
                                    </div>
                                    <div className="text-white font-medium">
                                        Traffic Jam
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Slow-moving or stopped traffic. May include
                                    severity (light, moderate, heavy) and
                                    estimated delay time.
                                </p>
                            </div>

                            <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-3">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="text-white font-medium">
                                        Road Closure
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Road completely blocked or closed. May
                                    include reason (construction, event,
                                    accident) and estimated reopening time.
                                </p>
                            </div>

                            <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 mr-3">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="text-white font-medium">
                                        Stalled Vehicle
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Vehicle stopped on the road or shoulder due
                                    to breakdown. May include position (left
                                    lane, shoulder, etc.).
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-medium text-white mb-4">
                            Road Conditions
                        </h3>

                        <div className="space-y-4">
                            <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3">
                                        <CloudLightning />
                                    </div>
                                    <div className="text-white font-medium">
                                        Weather
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Weather conditions on the road. May include
                                    type (rain, snow, hail, fog) and severity
                                    (light, moderate, heavy).
                                </p>
                            </div>

                            <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 mr-3">
                                        <AlertTriangle size={16} />
                                    </div>
                                    <div className="text-white font-medium">
                                        Hazard
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Objects or conditions creating danger. May
                                    include type (debris, animal, spill) and
                                    position.
                                </p>
                            </div>

                            <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 mr-3">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="text-white font-medium">
                                        Construction
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Road work areas. May include expected
                                    duration, reduced lanes, and speed limit
                                    changes.
                                </p>
                            </div>

                            <div className="bg-[rgba(15,18,30,0.6)] p-4 rounded-lg border border-indigo-900/30">
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-white font-medium">
                                        Police
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Police presence on or near the road. May
                                    include type (speed trap, checkpoint,
                                    accident response).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-md shadow-lg border border-indigo-900/30 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                    Next Steps
                </h2>
                <p className="text-gray-300 mb-4">
                    Now that you understand how to use Supmap's alert system,
                    learn more about:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                        href="#account-management"
                        className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors"
                    >
                        <div className="mr-4 p-2 bg-purple-500/10 rounded-lg text-purple-400">
                            <MapPin size={20} />
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

                    <a
                        href="#mobile-app"
                        className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex items-center border border-indigo-900/30 hover:bg-[rgba(40,44,60,0.6)] transition-colors"
                    >
                        <div className="mr-4 p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <Smartphone size={20} />
                        </div>
                        <div>
                            <h3 className="font-medium text-white">
                                Mobile App
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Optimize mobile alerts and notifications
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AlertsReporting;
