import React from 'react';
import {
    AppleIcon,
    Smartphone,
    ShoppingBag,
    CheckCircleIcon,
    ArrowRightIcon
} from 'lucide-react';

interface DownloadSectionProps {
    activeTab: 'ios' | 'android';
    setActiveTab: React.Dispatch<React.SetStateAction<'ios' | 'android'>>;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex flex-col justify-center">
            <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-xl shadow-xl border border-indigo-900/30 rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                    Download for your device
                </h2>

                <div className="mb-8">
                    <div className="flex border-b border-indigo-900/30">
                        <button
                            onClick={() => setActiveTab('android')}
                            className={`flex items-center justify-center py-3 px-5 font-medium text-sm transition-colors duration-300 ${
                                activeTab === 'android'
                                    ? 'text-indigo-400 border-b-2 border-indigo-500'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            <Smartphone size={18} className="mr-2"/>
                            <span>Android</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('ios')}
                            className={`flex items-center justify-center py-3 px-5 font-medium text-sm transition-colors duration-300 ${
                                activeTab === 'ios'
                                    ? 'text-indigo-400 border-b-2 border-indigo-500'
                                    : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            <AppleIcon size={18} className="mr-2"/>
                            <span>iOS</span>
                        </button>
                    </div>

                    <div className="py-6">
                        {activeTab === 'android' ? (
                            <div className="space-y-2">
                                <p className="text-gray-300 mb-4">
                                    The Supmap Android app offers robust navigation and traffic monitoring
                                    with special features for Android devices.
                                </p>
                                <div className="flex items-center">
                                    <CheckCircleIcon size={16} className="text-green-500 mr-2"/>
                                    <span className="text-gray-300">Compatible with Android 8.0 and above</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircleIcon size={16} className="text-green-500 mr-2"/>
                                    <span className="text-gray-300">Supports Android Auto integration</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircleIcon size={16} className="text-green-500 mr-2"/>
                                    <span className="text-gray-300">Background navigation with battery optimization</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircleIcon size={16} className="text-green-500 mr-2"/>
                                    <span className="text-gray-300">Works with Wear OS for smartwatch alerts</span>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-gray-300 mb-4">
                                    The Supmap iOS app is designed specifically for iPhone and iPad devices,
                                    offering seamless integration with Apple Maps and Siri.
                                </p>
                                <div className="flex items-center">
                                    <CheckCircleIcon size={16} className="text-green-500 mr-2"/>
                                    <span className="text-gray-300">Compatible with iOS 14.0 and above</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircleIcon size={16} className="text-green-500 mr-2"/>
                                    <span className="text-gray-300">Optimized for iPhone 12, 13, 14, and 15 series</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircleIcon size={16} className="text-green-500 mr-2"/>
                                    <span className="text-gray-300">Supports CarPlay for hands-free navigation</span>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircleIcon size={16} className="text-green-500 mr-2"/>
                                    <span className="text-gray-300">Works with Apple Watch for quick alerts</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        {activeTab === 'android' ? (
                            <a
                                href="https://drive.google.com/uc?export=download&id=18RoG-AFaTijAaqAVxlheoRVDdQWOSQnt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center justify-center py-3 px-6
                                         bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium
                                         rounded-lg shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30
                                         transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                            >
                                <ShoppingBag size={20} className="mr-2 relative z-10"/>
                                <span className="relative z-10">Download Supmap APK</span>
                                <ArrowRightIcon size={18}
                                                className="ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10"/>
                                <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                    <div
                                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                </div>
                            </a>
                        ) : (
                            <a
                                href="https://apps.apple.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center justify-center py-3 px-6
                                         bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium
                                         rounded-lg shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30
                                         transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                            >
                                <AppleIcon size={20} className="mr-2 relative z-10"/>
                                <span className="relative z-10">Download on App Store</span>
                                <ArrowRightIcon size={18}
                                                className="ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10"/>
                                <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                    <div
                                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                </div>
                            </a>
                        )}

                        <button
                            className="group flex items-center justify-center py-3 px-6
                                     border border-indigo-500/40 text-indigo-300 font-medium rounded-lg
                                     hover:bg-indigo-900/40 hover:border-indigo-500/60 transition-all duration-300"
                            onClick={() => window.location.href = '/support'}
                        >
                            <span>Need Help?</span>
                            <ArrowRightIcon size={18}
                                            className="ml-2 group-hover:translate-x-1 transition-transform duration-300"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadSection;