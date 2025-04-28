import React, { useState, useEffect } from 'react';
import { useAuth } from '../../services/AuthContext.tsx';
import AppHeader from '../../component/mobile/AppHeader.tsx';
import PhoneMockups from '../../component/mobile/PhoneMockups.tsx';
import DownloadSection from '../../component/mobile/DownloadSection.tsx';
import FaqSection from '../../component/mobile/FaqSection.tsx';
import RateApp from '../../component/mobile/RateApp.tsx';

const MobileApp: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'ios' | 'android'>('android');
    const { isAuthenticated } = useAuth();
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 300) {
                setHasScrolled(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0c15] text-white pt-24 pb-16">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c15] via-[#12152e]/40 to-[#0a0c15]"></div>

                <div className="absolute top-1/3 left-1/5 w-72 h-72 rounded-full bg-indigo-900/10 filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/5 w-72 h-72 bg-indigo-900/5 rounded-full filter blur-3xl"></div>

                <div className="absolute top-20 right-1/4 w-2 h-2 rounded-full bg-indigo-400/50 animate-pulse"></div>
                <div className="absolute bottom-40 left-1/3 w-2 h-2 rounded-full bg-indigo-400/50 animate-ping"></div>
                <div className="absolute top-1/2 right-1/6 w-2 h-2 rounded-full bg-indigo-400/50 animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AppHeader />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
                    <PhoneMockups activeTab={activeTab} />

                    <DownloadSection
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>

                {isAuthenticated && hasScrolled && (
                    <div className="mb-20">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                                    Your Opinion Matters
                                </h2>
                                <p className="mt-4 text-gray-300">
                                    Help us improve Supmap by sharing your feedback
                                </p>
                            </div>

                            <RateApp className="max-w-md mx-auto" />
                        </div>
                    </div>
                )}

                <FaqSection />
            </div>
        </div>
    );
};

export default MobileApp;