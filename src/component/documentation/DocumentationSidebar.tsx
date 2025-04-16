import React from 'react';
import {
    BookOpenIcon,
    NavigationIcon,
    AlertTriangleIcon,
    UserIcon,
    SmartphoneIcon,
    CodeIcon,
    ChevronRightIcon
} from 'lucide-react';

interface DocumentationSidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
    isOpen: boolean;
}

interface SidebarSection {
    id: string;
    title: string;
    icon: React.ReactNode;
    subsections: { id: string; title: string }[];
}

const DocumentationSidebar: React.FC<DocumentationSidebarProps> = ({
                                                                       activeSection,
                                                                       onSectionChange,
                                                                       isOpen
                                                                   }) => {
    const sections: SidebarSection[] = [
        {
            id: 'getting-started',
            title: 'Getting Started',
            icon: <BookOpenIcon size={18} />,
            subsections: [
                { id: 'getting-started#overview', title: 'Overview' },
                { id: 'getting-started#installation', title: 'Installation' },
                { id: 'getting-started#account-creation', title: 'Creating an Account' },
                { id: 'getting-started#first-steps', title: 'First Steps' }
            ]
        },
        {
            id: 'navigation-guide',
            title: 'Navigation Guide',
            icon: <NavigationIcon size={18} />,
            subsections: [
                { id: 'navigation-guide#basics', title: 'Navigation Basics' },
                { id: 'navigation-guide#planning-routes', title: 'Planning Routes' },
                { id: 'navigation-guide#preferences', title: 'Route Preferences' },
                { id: 'navigation-guide#favorites', title: 'Saving Favorites' },
                { id: 'navigation-guide#voice-navigation', title: 'Voice Navigation' }
            ]
        },
        {
            id: 'alerts-reporting',
            title: 'Alerts & Reporting',
            icon: <AlertTriangleIcon size={18} />,
            subsections: [
                { id: 'alerts-reporting#receiving', title: 'Receiving Alerts' },
                { id: 'alerts-reporting#creating', title: 'Creating Reports' },
                { id: 'alerts-reporting#verifying', title: 'Verifying Reports' },
                { id: 'alerts-reporting#types', title: 'Alert Types' }
            ]
        },
        {
            id: 'account-management',
            title: 'Account Management',
            icon: <UserIcon size={18} />,
            subsections: [
                { id: 'account-management#profile', title: 'Profile Settings' },
                { id: 'account-management#privacy', title: 'Privacy Controls' },
                { id: 'account-management#notifications', title: 'Notification Settings' },
                { id: 'account-management#data', title: 'Data Management' }
            ]
        },
        {
            id: 'mobile-app',
            title: 'Mobile App',
            icon: <SmartphoneIcon size={18} />,
            subsections: [
                { id: 'mobile-app#installation', title: 'Installation' },
                { id: 'mobile-app#sync', title: 'Syncing with Web' },
                { id: 'mobile-app#offline', title: 'Offline Usage' },
                { id: 'mobile-app#battery', title: 'Battery Optimization' }
            ]
        },
        {
            id: 'api',
            title: 'API Reference',
            icon: <CodeIcon size={18} />,
            subsections: [
                { id: 'api#authentication', title: 'Authentication' },
                { id: 'api#routes', title: 'Routes API' },
                { id: 'api#alerts', title: 'Alerts API' },
                { id: 'api#rate-limits', title: 'Rate Limits' }
            ]
        }
    ];

    return (
        <div className={`
            fixed top-0 left-0 z-40 w-64 h-screen pt-20 pb-4
            bg-[rgba(10,12,20,0.95)] backdrop-blur-md
            border-r border-indigo-900/30
            transition-transform duration-300 ease-in-out
            overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-900/30 scrollbar-track-transparent
            ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
            <div className="h-full px-3 py-4">
                <h2 className="mb-4 px-4 text-lg font-semibold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                    Documentation
                </h2>

                <ul className="space-y-2">
                    {sections.map((section) => {
                        const isActive = activeSection === section.id;

                        return (
                            <li key={section.id}>
                                <button
                                    onClick={() => onSectionChange(section.id)}
                                    className={`
                                        flex items-center w-full p-2 text-base rounded-lg
                                        group transition-colors duration-300
                                        ${isActive
                                        ? 'bg-indigo-500/20 text-white'
                                        : 'text-gray-300 hover:bg-indigo-500/10'}
                                    `}
                                >
                                    <span className={`${isActive ? 'text-indigo-400' : 'text-gray-400'} mr-3`}>
                                        {section.icon}
                                    </span>
                                    <span className="flex-1 text-left whitespace-nowrap">{section.title}</span>
                                    <ChevronRightIcon size={16} className={`
                                        transition-transform duration-300
                                        ${isActive ? 'text-indigo-400 rotate-90' : 'text-gray-400'}
                                    `} />
                                </button>

                                {isActive && (
                                    <ul className="py-2 space-y-1 pl-11">
                                        {section.subsections.map((subsection) => (
                                            <li key={subsection.id}>
                                                <a
                                                    href={`#${subsection.id}`}
                                                    className="block p-1 text-sm text-gray-400 hover:text-indigo-300 transition-colors duration-300"
                                                >
                                                    {subsection.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default DocumentationSidebar;