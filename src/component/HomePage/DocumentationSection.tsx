import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, MapIcon, AlertTriangleIcon, SettingsIcon,
    UserIcon, BellIcon, ChevronRightIcon, ChevronDownIcon } from 'lucide-react';

const documentationTopics = [
    {
        id: 'getting-started',
        icon: <BookOpenIcon size={20} className="text-indigo-400" />,
        title: 'Getting Started',
        description: 'Learn the basics of Supmap and set up your account',
        subtopics: [
            { title: 'Creating an account', link: '/documentation/getting-started/create-account' },
            { title: 'Setting up your profile', link: '/documentation/getting-started/profile-setup' },
            { title: 'Navigation basics', link: '/documentation/getting-started/navigation-basics' },
            { title: 'Understanding the interface', link: '/documentation/getting-started/interface' }
        ]
    },
    {
        id: 'navigation',
        icon: <MapIcon size={20} className="text-green-400" />,
        title: 'Navigation Features',
        description: 'Discover all navigation capabilities and route options',
        subtopics: [
            { title: 'Planning a route', link: '/documentation/navigation/planning' },
            { title: 'Route preferences', link: '/documentation/navigation/preferences' },
            { title: 'Saving favorite locations', link: '/documentation/navigation/favorites' },
            { title: 'Voice navigation', link: '/documentation/navigation/voice' }
        ]
    },
    {
        id: 'alerts',
        icon: <AlertTriangleIcon size={20} className="text-yellow-400" />,
        title: 'Alerts & Reporting',
        description: 'How to receive, report and verify traffic incidents',
        subtopics: [
            { title: 'Reporting incidents', link: '/documentation/alerts/reporting' },
            { title: 'Verifying community alerts', link: '/documentation/alerts/verification' },
            { title: 'Alert types explained', link: '/documentation/alerts/types' },
            { title: 'Alert notifications settings', link: '/documentation/alerts/notifications' }
        ]
    },
    {
        id: 'settings',
        icon: <SettingsIcon size={20} className="text-red-400" />,
        title: 'Settings & Preferences',
        description: 'Customize Supmap to match your needs',
        subtopics: [
            { title: 'App settings', link: '/documentation/settings/app' },
            { title: 'Map appearance', link: '/documentation/settings/map' },
            { title: 'Navigation preferences', link: '/documentation/settings/navigation' },
            { title: 'Privacy settings', link: '/documentation/settings/privacy' }
        ]
    },
    {
        id: 'account',
        icon: <UserIcon size={20} className="text-purple-400" />,
        title: 'Account Management',
        description: 'Manage your profile, privacy, and subscription',
        subtopics: [
            { title: 'Profile management', link: '/documentation/account/profile' },
            { title: 'Privacy controls', link: '/documentation/account/privacy' },
            { title: 'Subscription options', link: '/documentation/account/subscription' },
            { title: 'Data export & deletion', link: '/documentation/account/data' }
        ]
    },
    {
        id: 'notifications',
        icon: <BellIcon size={20} className="text-blue-400" />,
        title: 'Notifications',
        description: 'Configure how and when you receive alerts',
        subtopics: [
            { title: 'Notification types', link: '/documentation/notifications/types' },
            { title: 'Setting up alerts', link: '/documentation/notifications/setup' },
            { title: 'Custom alert areas', link: '/documentation/notifications/custom-areas' },
            { title: 'Silent hours', link: '/documentation/notifications/silent-hours' }
        ]
    }
];

const DocumentationSection: React.FC = () => {
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

    const toggleTopic = (topicId: string) => {
        if (expandedTopic === topicId) {
            setExpandedTopic(null);
        } else {
            setExpandedTopic(topicId);
        }
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
                                                <Link
                                                    to={subtopic.link}
                                                    className="flex items-center text-gray-300 hover:text-indigo-300 transition-colors duration-300"
                                                >
                                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                                                    <span>{subtopic.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        to={`/documentation/${topic.id}`}
                                        className="mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-300 group"
                                    >
                                        <span className="text-sm">View all {topic.title.toLowerCase()} docs</span>
                                        <ChevronRightIcon size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                                    </Link>
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