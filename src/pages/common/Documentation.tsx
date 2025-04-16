import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DocumentationSidebar from '../../component/documentation/DocumentationSidebar.tsx';
import DocumentationHeader from '../../component/documentation/DocumentationHeader.tsx';
import GettingStarted from '../../component/documentation/GettingStarted.tsx';
import NavigationGuide from '../../component/documentation/NavigationGuide.tsx';
import AlertsReporting from '../../component/documentation/AlertsReporting.tsx';
import AccountManagement from '../../component/documentation/AccountManagement.tsx';
import MobileApp from '../../component/documentation/MobileApp.tsx';
import API from '../../component/documentation/API.tsx';
import MapRouteAnimation from '../../component/animation/MapRouteAnimation.tsx';

const Documentation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState<string>('getting-started');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            setActiveSection(hash);
        }
    }, [location]);

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
        navigate(`#${section}`);
        window.scrollTo(0, 0);
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'getting-started':
                return <GettingStarted />;
            case 'navigation-guide':
                return <NavigationGuide />;
            case 'alerts-reporting':
                return <AlertsReporting />;
            case 'account-management':
                return <AccountManagement />;
            case 'mobile-app':
                return <MobileApp />;
            case 'api':
                return <API />;
            default:
                return <GettingStarted />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0c15] text-white pt-20">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute opacity-10">
                    <MapRouteAnimation />
                </div>

                <div className="absolute top-[-200px] right-[-100px] w-64 h-64 rounded-full border border-indigo-500/10 animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute bottom-[-150px] left-[10%] w-48 h-48 rounded-full border border-indigo-500/5 animate-[spin_40s_linear_infinite_reverse]"></div>
                <div className="absolute top-1/4 left-[30%] w-32 h-32 rounded-full border border-indigo-500/10 animate-[spin_30s_linear_infinite]"></div>

                <div className="absolute top-1/4 left-[10%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
                <div className="absolute top-[70%] right-[20%] w-1 h-1 rounded-full bg-indigo-400/30 animate-ping"></div>
                <div className="absolute top-[30%] right-[40%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
            </div>

            <div className="relative flex min-h-screen">
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        onClick={toggleSidebar}
                    ></div>
                )}

                <DocumentationSidebar
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                    isOpen={isSidebarOpen}
                />

                <div className="flex-1 w-full lg:pl-64">
                    <DocumentationHeader toggleSidebar={toggleSidebar} />

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documentation;