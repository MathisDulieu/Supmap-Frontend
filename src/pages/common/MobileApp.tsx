import React, { useState } from 'react';
import { PhoneIcon, ArrowRightIcon } from 'lucide-react';
import AppHeader from '../../component/mobile/AppHeader.tsx';
import PhoneMockups from '../../component/mobile/PhoneMockups.tsx';
import DownloadSection from '../../component/mobile/DownloadSection.tsx';
import FaqSection from '../../component/mobile/FaqSection.tsx';

const MobileApp: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'ios' | 'android'>('android');

    return (
        <div className="min-h-screen bg-[#0a0c15] text-white pt-24 pb-16">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c15] via-[#12152e]/40 to-[#0a0c15]"></div>

                <div className="absolute top-1/3 left-1/5 w-72 h-72 rounded-full bg-indigo-900/10 filter blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/5 w-72 h-72 bg-indigo-900/5 rounded-full filter blur-3xl"></div>

                <div className="absolute top-20 right-1/4 w-2 h-2 rounded-full bg-indigo-400/50 animate-pulse"></div>
                <div className="absolute bottom-40 left-1/3 w-2 h-2 rounded-full bg-indigo-400/50 animate-ping"></div>
                <div className="absolute top-1/2 right-1/6 w-2 h-2 rounded-full bg-indigo-400/50 animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hero Section */}
                <AppHeader />

                {/* App Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
                    {/* Phone Mockups */}
                    <PhoneMockups activeTab={activeTab} />

                    {/* Download Section */}
                    <DownloadSection
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </div>

                <FaqSection />
            </div>
        </div>
    );
};

export default MobileApp;