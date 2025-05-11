import React, { useState, useEffect } from 'react';
import {
    AppleIcon,
    Smartphone,
    CheckCircleIcon,
    ArrowRightIcon,
    DownloadIcon,
    AlertCircle
} from 'lucide-react';

interface DownloadSectionProps {
    activeTab: 'ios' | 'android';
    setActiveTab: React.Dispatch<React.SetStateAction<'ios' | 'android'>>;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ activeTab, setActiveTab }) => {
    const APK_DOWNLOAD_URL = '/download/app-release.apk';

    const [showInstallGuide, setShowInstallGuide] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

        if (/iPhone|iPad|iPod/i.test(userAgent)) {
            setActiveTab('ios');
        } else if (/Android/i.test(userAgent)) {
            setActiveTab('android');
        }
    }, [setActiveTab]);

    const handleAndroidDownload = () => {
        window.location.href = APK_DOWNLOAD_URL;

        setTimeout(() => {
            setShowInstallGuide(true);
        }, 2000);
    };

    const closeInstallGuide = () => {
        setShowInstallGuide(false);
    };

    return (
        <div className="flex flex-col justify-center">
            {showInstallGuide && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0f121e] rounded-2xl p-6 max-w-md w-full border border-indigo-900/50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Comment installer Supmap</h3>
                            <button
                                onClick={closeInstallGuide}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4 text-gray-300">
                            <div className="flex items-start space-x-3">
                                <div className="bg-indigo-900/50 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-indigo-300">1</span>
                                </div>
                                <p>Si vous êtes invité à choisir une application, sélectionnez votre navigateur.</p>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="bg-indigo-900/50 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-indigo-300">2</span>
                                </div>
                                <p>Appuyez sur "Oui" ou "Installer" lorsque vous êtes invité à installer l'application.</p>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="bg-indigo-900/50 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-indigo-300">3</span>
                                </div>
                                <p>Si vous recevez un avertissement de sécurité, appuyez sur "Paramètres" puis activez "Autoriser de cette source".</p>
                            </div>

                            <div className="flex items-start space-x-3">
                                <AlertCircle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                                <p className="text-amber-300">Si l'installation ne démarre pas automatiquement, vérifiez vos téléchargements et appuyez sur le fichier APK.</p>
                            </div>
                        </div>

                        <button
                            onClick={closeInstallGuide}
                            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
                        >
                            J'ai compris
                        </button>
                    </div>
                </div>
            )}

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
                            <>
                                <button
                                    onClick={handleAndroidDownload}
                                    className="group relative flex items-center justify-center py-3 px-6
                                             bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium
                                             rounded-lg shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30
                                             transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                                >
                                    <DownloadIcon size={20} className="mr-2 relative z-10"/>
                                    <span className="relative z-10">Download APK</span>
                                    <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    </div>
                                </button>

                                <a
                                    href="https://play.google.com/store/apps/details?id=com.supmap.navigation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center py-3 px-6
                                            border border-indigo-500/40 text-indigo-300 font-medium rounded-lg
                                            hover:bg-indigo-900/40 hover:border-indigo-500/60 transition-all duration-300"
                                >
                                    <span>Get on Google Play</span>
                                    <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300"/>
                                </a>
                            </>
                        ) : (
                            <a
                                href="https://apps.apple.com/app/supmap/id1234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center justify-center py-3 px-6
                                        bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium
                                        rounded-lg shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30
                                        transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                            >
                                <AppleIcon size={20} className="mr-2 relative z-10"/>
                                <span className="relative z-10">Download on App Store</span>
                                <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10"/>
                                <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
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
                            <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadSection;