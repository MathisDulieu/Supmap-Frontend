import React from 'react';
import { NavigationIcon, UsersIcon, ShieldCheckIcon,
    BellIcon, RefreshCcwIcon,
    MapPinIcon, AlertTriangleIcon, ThumbsUpIcon, EyeIcon,
    ZapIcon, ShareIcon, BarChartIcon } from 'lucide-react';

const features = [
    {
        icon: <NavigationIcon size={24} className="text-indigo-400" />,
        title: "Real-time Navigation",
        description: "Get the fastest routes based on current traffic conditions, with automatic recalculation when traffic changes.",
        color: "from-indigo-500 to-blue-500"
    },
    {
        icon: <BellIcon size={24} className="text-red-400" />,
        title: "Live Traffic Alerts",
        description: "Receive instant notifications about accidents, traffic jams, and road closures along your route.",
        color: "from-red-500 to-pink-500"
    },
    {
        icon: <AlertTriangleIcon size={24} className="text-yellow-400" />,
        title: "Hazard Reporting",
        description: "Report and view hazards on the road including accidents, police controls, and obstacles.",
        color: "from-yellow-400 to-orange-500"
    },
    {
        icon: <UsersIcon size={24} className="text-green-400" />,
        title: "Community Verification",
        description: "Confirm or deny reports from other users to ensure information accuracy and relevance.",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: <RefreshCcwIcon size={24} className="text-purple-400" />,
        title: "Automatic Rerouting",
        description: "When traffic conditions change, Supmap automatically finds a faster alternative route for you.",
        color: "from-purple-500 to-violet-500"
    },
    {
        icon: <MapPinIcon size={24} className="text-cyan-400" />,
        title: "Favorite Locations",
        description: "Save your most frequent destinations for quick and easy route planning.",
        color: "from-cyan-500 to-blue-500"
    },
    {
        icon: <ThumbsUpIcon size={24} className="text-emerald-400" />,
        title: "Route Preferences",
        description: "Customize your routes based on preferences like avoiding tolls, highways.",
        color: "from-emerald-500 to-green-500"
    },
    {
        icon: <EyeIcon size={24} className="text-blue-400" />,
        title: "Traffic Predictions",
        description: "Plan ahead with traffic predictions based on historical data and current patterns.",
        color: "from-blue-500 to-indigo-500"
    },
    {
        icon: <ShareIcon size={24} className="text-pink-400" />,
        title: "Route Sharing",
        description: "Share your route with friends by sending it directly to your mobile device with a QR code.",
        color: "from-pink-500 to-rose-500"
    },
    {
        icon: <BarChartIcon size={24} className="text-amber-400" />,
        title: "Traffic Analytics",
        description: "Access detailed traffic statistics and patterns to plan your journeys more effectively.",
        color: "from-amber-500 to-yellow-500"
    },
    {
        icon: <ShieldCheckIcon size={24} className="text-violet-400" />,
        title: "Secure Authentication",
        description: "Enjoy peace of mind with our secure login options, including OAuth and standard authentication.",
        color: "from-violet-500 to-purple-500"
    },
    {
        icon: <ZapIcon size={24} className="text-rose-400" />,
        title: "Fast Performance",
        description: "Experience responsive navigation with minimal lag, even in areas with poor connectivity.",
        color: "from-rose-500 to-red-500"
    }
];

const FeaturesSection: React.FC = () => {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                        Supmap Features
                    </h2>
                    <p className="text-lg text-gray-300">
                        Discover how Supmap's powerful features can transform your daily commute
                        and make every journey smoother and more predictable.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative group bg-[rgba(15,18,30,0.6)] backdrop-blur-sm border border-indigo-900/30
                                       rounded-xl p-6 hover:shadow-xl hover:shadow-indigo-900/10 transition-all duration-300
                                       hover:-translate-y-1 overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color.split(" ")[0].split("-")[1]} to-${feature.color.split(" ")[1].split("-")[1]} opacity-0 group-hover:opacity-10 transition-opacity duration-300 
                                           pointer-events-none rounded-xl`}>
                            </div>

                            <div className="relative z-10">
                                <div className="bg-[rgba(30,33,45,0.8)] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>

                                <h3 className="text-xl font-semibold mb-3 text-white">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-400">
                                    {feature.description}
                                </p>
                            </div>

                            <div className="absolute -bottom-1 -right-1 w-20 h-20 rounded-full border border-indigo-500/20
                                           opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a href="/documentation" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
                        <span className="mr-2">Learn more about our features</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </a>
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-900/20 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-indigo-900/10 rounded-full filter blur-3xl"></div>
            </div>
        </section>
    );
};

export default FeaturesSection;