import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DocumentationSidebar from '../../component/documentation/DocumentationSidebar.tsx';
import DocumentationHeader from '../../component/documentation/DocumentationHeader.tsx';
import GettingStarted from '../../component/documentation/GettingStarted.tsx';
import NavigationGuide from '../../component/documentation/NavigationGuide.tsx';
import AlertsReporting from '../../component/documentation/AlertsReporting.tsx';
import AccountManagement from '../../component/documentation/AccountManagement.tsx';
import MobileApp from '../../component/documentation/MobileApp.tsx';
import MapRouteAnimation from '../../component/animation/MapRouteAnimation.tsx';

const Documentation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState<string>('getting-started');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>( () => {
        const storedState = localStorage.getItem('sidebarState');
        return storedState ? JSON.parse(storedState) : false;
    });

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        if (hash) {
            setActiveSection(hash);
        }
    }, [location]);

    useEffect(() => {
        localStorage.setItem('sidebarState', JSON.stringify(isSidebarOpen));
    }, [isSidebarOpen]);

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
        navigate(`#${section}`);
        window.scrollTo(0, 0);
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, section: string) => {
        event.preventDefault();
        handleSectionChange(section);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'getting-started':
                return <GettingStarted handleLinkClick={handleLinkClick} />;
            case 'navigation-guide':
                return <NavigationGuide handleLinkClick={handleLinkClick} />;
            case 'alerts-reporting':
                return <AlertsReporting handleLinkClick={handleLinkClick} />;
            case 'account-management':
                return <AccountManagement handleLinkClick={handleLinkClick} />;
            case 'mobile-app':
                return <MobileApp handleLinkClick={handleLinkClick} />;
            default:
                return <GettingStarted handleLinkClick={handleLinkClick} />;
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