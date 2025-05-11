import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpenIcon, MapIcon, AlertTriangleIcon, SettingsIcon,
    UserIcon, BellIcon, ChevronRightIcon, ChevronDownIcon } from 'lucide-react';

const documentationTopics = [
    {
        id: 'getting-started',
        icon: <BookOpenIcon size={20} className="text-indigo-400" />,
        title: 'Getting Started',
        description: 'Learn the basics of Supmap and set up your account',
        subtopics: [
            { title: 'Overview', link: '#getting-started#overview' },
            { title: 'Installation', link: '#getting-started#installation' },
            { title: 'Creating an account', link: '#getting-started#account-creation' },
            { title: 'First Steps', link: '#getting-started#first-steps' }
        ]
    },
    {
        id: 'navigation-guide',
        icon: <MapIcon size={20} className="text-green-400" />,
        title: 'Navigation Guide',
        description: 'Discover all navigation capabilities and route options',
        subtopics: [
            { title: 'Navigation Basics', link: '#navigation-guide#basics' },
            { title: 'Planning Routes', link: '#navigation-guide#planning-routes' },
            { title: 'Route Preferences', link: '#navigation-guide#preferences' },
            { title: 'Saving Favorites', link: '#navigation-guide#favorites' }
        ]
    },
    {
        id: 'alerts-reporting',
        icon: <AlertTriangleIcon size={20} className="text-yellow-400" />,
        title: 'Alerts & Reporting',
        description: 'How to receive, report and verify traffic incidents',
        subtopics: [
            { title: 'Receiving Alerts', link: '#alerts-reporting#receiving' },
            { title: 'Creating Reports', link: '#alerts-reporting#creating' },
            { title: 'Verifying Reports', link: '#alerts-reporting#verifying' },
            { title: 'Alert Types', link: '#alerts-reporting#types' }
        ]
    },
    {
        id: 'account-management',
        icon: <UserIcon size={20} className="text-purple-400" />,
        title: 'Account Management',
        description: 'Manage your profile, privacy, and subscription',
        subtopics: [
            { title: 'Profile Settings', link: '#account-management#profile' },
            { title: 'Privacy Controls', link: '#account-management#privacy' },
            { title: 'Data Management', link: '#account-management#data' }
        ]
    },
    {
        id: 'mobile-app',
        icon: <BellIcon size={20} className="text-blue-400" />,
        title: 'Mobile App',
        description: 'Configure your mobile experience and settings',
        subtopics: [
            { title: 'Installation', link: '#mobile-app#installation' },
            { title: 'Syncing with Web', link: '#mobile-app#sync' },
            { title: 'Offline Usage', link: '#mobile-app#offline' },
            { title: 'Battery Optimization', link: '#mobile-app#battery' }
        ]
    },
    {
        id: 'settings',
        icon: <SettingsIcon size={20} className="text-red-400" />,
        title: 'Settings & Preferences',
        description: 'Customize Supmap to match your needs',
        subtopics: [
            { title: 'Navigation Preferences', link: '#navigation-guide#preferences' },
            { title: 'Privacy Settings', link: '#account-management#privacy' },
            { title: 'App Settings', link: '#mobile-app#sync' },
            { title: 'Profile Settings', link: '#account-management#profile' }
        ]
    }
];

const DocumentationSection: React.FC = () => {
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
    const navigate = useNavigate();

    const toggleTopic = (topicId: string) => {
        if (expandedTopic === topicId) {
            setExpandedTopic(null);
        } else {
            setExpandedTopic(topicId);
        }
    };

    const handleLinkClick = (e, link) => {
        e.preventDefault();
        // Navigate to the documentation page with the appropriate hash
        navigate(`/documentation${link}`);
    };

    return (
        <section id="documentation" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-transparent"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                        Documentation
                    </h2>
                    <p className="text-lg text-gray-300">
                        Learn how to get the most out of Supmap with our comprehensive guides and tutorials.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documentationTopics.map((topic) => (
                        <div
                            key={topic.id}
                            className="bg-[rgba(15,18,30,0.6)] backdrop-blur-sm border border-indigo-900/30
                                      rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg
                                      hover:shadow-indigo-900/10 group"
                        >
                            <div
                                className="p-6 cursor-pointer"
                                onClick={() => toggleTopic(topic.id)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start">
                                        <div className="mt-1 mr-4">
                                            {topic.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">
                                                {topic.title}
                                            </h3>
                                            <p className="text-gray-400">
                                                {topic.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        {expandedTopic === topic.id ? (
                                            <ChevronDownIcon size={20} className="text-indigo-400" />
                                        ) : (
                                            <ChevronRightIcon size={20} className="text-indigo-400 group-hover:translate-x-1 transition-transform duration-300" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`transition-all duration-300 overflow-hidden ${
                                    expandedTopic === topic.id ? 'max-h-64' : 'max-h-0'
                                }`}
                            >
                                <div className="px-6 pb-6">
                                    <ul className="border-t border-indigo-900/30 pt-4 space-y-2">
                                        {topic.subtopics.map((subtopic, index) => (
                                            <li key={index}>
                                                <a
                                                    href={subtopic.link}
                                                    onClick={(e) => handleLinkClick(e, subtopic.link)}
                                                    className="flex items-center text-gray-300 hover:text-indigo-300 transition-colors duration-300"
                                                >
                                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                                                    <span>{subtopic.title}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={`#${topic.id}`}
                                        onClick={(e) => handleLinkClick(e, `#${topic.id}`)}
                                        className="mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-300 group"
                                    >
                                        <span className="text-sm">View all {topic.title.toLowerCase()} docs</span>
                                        <ChevronRightIcon size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        to="/documentation"
                        className="inline-flex items-center justify-center py-3 px-6
                                 border border-indigo-500/40 text-indigo-300 font-medium rounded-lg
                                 hover:bg-indigo-900/40 hover:border-indigo-500/60 transition-all duration-300 group"
                    >
                        <span>Browse full documentation</span>
                        <ChevronRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default DocumentationSection;