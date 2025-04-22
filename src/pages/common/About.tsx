import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    GithubIcon,
    LinkedinIcon,
    MailIcon,
    CodeIcon,
    DatabaseIcon,
    LayersIcon,
    PaletteIcon,
    ArrowRightIcon,
    NavigationIcon
} from 'lucide-react';
import MapRouteAnimation from '../../component/animation/MapRouteAnimation.tsx';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    photoUrl: string;
    skills: string[];
    socialLinks: {
        github?: string;
        linkedin?: string;
        email?: string;
    };
    primaryColor: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Mathis DULIEU",
        role: "Lead Backend Developer & DevOps Engineer",
        bio: "Mathis led the backend development with Spring Boot and handled the deployment infrastructure using Docker and Railway. His full-stack expertise ensured seamless integration between the server and client applications, making him a cornerstone of the project's architecture.",
        photoUrl: "https://i.ibb.co/bg5rWPtw/1678623297438.jpg",
        skills: ["Java Spring Boot", "Docker", "React", "TypeScript", "Railway", "Git"],
        socialLinks: {
            github: "https://github.com/MathisDulieu",
            linkedin: "https://www.linkedin.com/in/mathis-dulieu/",
            email: "dulieu.mathis@gmail.com"
        },
        primaryColor: "indigo"
    },
    {
        id: 2,
        name: "Romain MICHAUX",
        role: "Frontend & Mobile Developer",
        bio: "Romain worked on both the web frontend and mobile application, bridging the gap between platforms to ensure a consistent user experience. His versatile development skills allowed the team to maintain unified code standards across multiple environments.",
        photoUrl: "https://i.ibb.co/N23N5yfW/1710084179007.png",
        skills: ["React", "TypeScript", "JavaScript", "React Native", "Docker", "Git"],
        socialLinks: {
            github: "https://github.com/Romain-18",
            linkedin: "https://www.linkedin.com/in/romain-michaux/",
            email: "romain.m935@gmail.com"
        },
        primaryColor: "blue"
    },
    {
        id: 3,
        name: "Louis CZERYBA--DUEZ",
        role: "Mobile Application Developer",
        bio: "Louis specialized in mobile development, focusing on creating an intuitive and responsive user interface for the application. His attention to detail and expertise in TypeScript helped deliver a smooth mobile experience with real-time functionality.",
        photoUrl: "https://i.ibb.co/qLxxdZmb/LCD-background.png",
        skills: ["TypeScript", "JavaScript", "React Native", "Docker", "Git", "Mobile UI/UX"],
        socialLinks: {
            github: "https://github.com/Lcd789",
            linkedin: "https://www.linkedin.com/in/louis-czeryba-duez/",
            email: "czerybaduez.louis@gmail.com"
        },
        primaryColor: "green"
    },
    {
        id: 4,
        name: "Titouan LEGRIS",
        role: "Mobile Application Developer",
        bio: "Titouan contributed to the mobile application development, implementing key features and ensuring compatibility across various devices. His collaborative approach and problem-solving skills were essential in overcoming technical challenges during the development process.",
        photoUrl: "https://i.ibb.co/wh9G3xMr/1637168955167.jpg",
        skills: ["TypeScript", "JavaScript", "React Native", "Docker", "Git", "Mobile Development"],
        socialLinks: {
            github: "https://github.com/Titouan-L",
            linkedin: "https://www.linkedin.com/in/titouan-legris-/",
            email: "titouan.legris@supinfo.com"
        },
        primaryColor: "purple"
    }
];

const About: React.FC = () => {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const getGradientClass = (color: string) => {
        const colorMap: Record<string, string> = {
            'indigo': 'from-indigo-500 to-indigo-600',
            'blue': 'from-blue-500 to-blue-600',
            'green': 'from-green-500 to-green-600',
            'purple': 'from-purple-500 to-purple-600'
        };
        return colorMap[color] || 'from-indigo-500 to-indigo-600';
    };

    const getTextClass = (color: string) => {
        const colorMap: Record<string, string> = {
            'indigo': 'text-indigo-400',
            'blue': 'text-blue-400',
            'green': 'text-green-400',
            'purple': 'text-purple-400'
        };
        return colorMap[color] || 'text-indigo-400';
    };

    const getBgClass = (color: string) => {
        const colorMap: Record<string, string> = {
            'indigo': 'bg-indigo-500/10',
            'blue': 'bg-blue-500/10',
            'green': 'bg-green-500/10',
            'purple': 'bg-purple-500/10'
        };
        return colorMap[color] || 'bg-indigo-500/10';
    };

    return (
        <div className="min-h-screen bg-[#0a0c15] text-white pt-24 pb-20">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute opacity-30">
                    <MapRouteAnimation />
                </div>

                <div className="absolute top-[-200px] right-[-100px] w-64 h-64 rounded-full border border-indigo-500/10 animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute bottom-[-150px] left-[10%] w-48 h-48 rounded-full border border-indigo-500/5 animate-[spin_40s_linear_infinite_reverse]"></div>
                <div className="absolute top-1/4 left-[30%] w-32 h-32 rounded-full border border-indigo-500/10 animate-[spin_30s_linear_infinite]"></div>

                <div className="absolute top-1/4 left-[10%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
                <div className="absolute top-[70%] right-[20%] w-1 h-1 rounded-full bg-indigo-400/30 animate-ping"></div>
                <div className="absolute top-[30%] right-[40%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                        Our Team
                    </h1>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Meet the passionate team behind Supmap, an application developed as part of our
                        4th year engineering studies at Supinfo Lille.
                    </p>
                </div>

                <div className="mb-20">
                    <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-md shadow-xl border border-indigo-900/30 rounded-2xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                            The Supmap Project
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-gray-300 mb-4">
                                    Supmap is a real-time navigation application that provides users with
                                    accurate information about traffic, accidents, and obstacles on the road.
                                </p>
                                <p className="text-gray-300 mb-4">
                                    Our goal was to create a comprehensive platform that allows drivers
                                    to optimize their daily journeys using community data and intelligent
                                    traffic prediction algorithms.
                                </p>
                                <p className="text-gray-300">
                                    This project was completed as part of our education at Supinfo and represents
                                    the culmination of our skills in web and mobile development, and system architecture.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex flex-col items-center text-center">
                                    <NavigationIcon size={32} className="text-indigo-400 mb-3" />
                                    <h3 className="text-white font-semibold mb-1">Real-Time Navigation</h3>
                                    <p className="text-gray-400 text-sm">Optimized routes based on current traffic conditions</p>
                                </div>

                                <div className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex flex-col items-center text-center">
                                    <DatabaseIcon size={32} className="text-blue-400 mb-3" />
                                    <h3 className="text-white font-semibold mb-1">Data Analysis</h3>
                                    <p className="text-gray-400 text-sm">Traffic predictions based on historical data and trends</p>
                                </div>

                                <div className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex flex-col items-center text-center">
                                    <LayersIcon size={32} className="text-green-400 mb-3" />
                                    <h3 className="text-white font-semibold mb-1">Microservices Architecture</h3>
                                    <p className="text-gray-400 text-sm">Scalable infrastructure with Docker and Kubernetes</p>
                                </div>

                                <div className="bg-[rgba(30,33,45,0.6)] p-4 rounded-lg flex flex-col items-center text-center">
                                    <PaletteIcon size={32} className="text-purple-400 mb-3" />
                                    <h3 className="text-white font-semibold mb-1">Modern Design</h3>
                                    <p className="text-gray-400 text-sm">Intuitive and accessible user interface</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-12 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent text-center">
                    The Team Behind Supmap
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="relative group bg-[rgba(15,18,30,0.6)] backdrop-blur-sm border border-indigo-900/30
                                       rounded-xl overflow-hidden transition-all duration-300
                                       hover:shadow-lg hover:shadow-indigo-900/20 hover:-translate-y-1"
                            onClick={() => setSelectedMember(member)}
                        >
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getGradientClass(member.primaryColor)}`}></div>

                            <div className="p-6">
                                <div className="relative mb-6 w-full aspect-square overflow-hidden rounded-xl">
                                    <div className={`absolute inset-0 ${getBgClass(member.primaryColor)} animate-pulse`}></div>
                                    <img
                                        src={member.photoUrl}
                                        alt={member.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <p className={`text-sm ${getTextClass(member.primaryColor)} mb-4`}>{member.role}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {member.skills.slice(0, 3).map((skill, index) => (
                                        <span
                                            key={index}
                                            className={`text-xs py-1 px-2 rounded-full ${getBgClass(member.primaryColor)} ${getTextClass(member.primaryColor)}`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {member.skills.length > 3 && (
                                        <span className="text-xs py-1 px-2 rounded-full bg-gray-800/60 text-gray-400">
                                            +{member.skills.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="flex space-x-3">
                                    {member.socialLinks.github && (
                                        <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            <GithubIcon size={16} />
                                        </a>
                                    )}
                                    {member.socialLinks.linkedin && (
                                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            <LinkedinIcon size={16} />
                                        </a>
                                    )}
                                    {member.socialLinks.email && (
                                        <a href={`mailto:${member.socialLinks.email}`} className="text-gray-400 hover:text-white transition-colors">
                                            <MailIcon size={16} />
                                        </a>
                                    )}
                                </div>

                                <button
                                    className={`absolute bottom-4 right-4 w-8 h-8 rounded-full ${getBgClass(member.primaryColor)} 
                                               flex items-center justify-center ${getTextClass(member.primaryColor)}
                                               opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                >
                                    <ArrowRightIcon size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedMember && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div
                            className="bg-[rgba(15,18,30,0.95)] border border-indigo-900/30 rounded-xl shadow-2xl
                                      w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className={`h-1 bg-gradient-to-r ${getGradientClass(selectedMember.primaryColor)}`}></div>

                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="w-full md:w-1/3">
                                        <div className="relative aspect-square w-full overflow-hidden rounded-xl mb-4">
                                            <div className={`absolute inset-0 ${getBgClass(selectedMember.primaryColor)} animate-pulse`}></div>
                                            <img
                                                src={selectedMember.photoUrl}
                                                alt={selectedMember.name}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="flex justify-center space-x-4 mb-6">
                                            {selectedMember.socialLinks.github && (
                                                <a href={selectedMember.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                                    <GithubIcon size={20} />
                                                </a>
                                            )}
                                            {selectedMember.socialLinks.linkedin && (
                                                <a href={selectedMember.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                                    <LinkedinIcon size={20} />
                                                </a>
                                            )}
                                            {selectedMember.socialLinks.email && (
                                                <a href={`mailto:${selectedMember.socialLinks.email}`} className="text-gray-400 hover:text-white transition-colors">
                                                    <MailIcon size={20} />
                                                </a>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="text-gray-300 font-medium text-sm">Skills</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedMember.skills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className={`text-xs py-1 px-2 rounded-full ${getBgClass(selectedMember.primaryColor)} ${getTextClass(selectedMember.primaryColor)}`}
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-2/3">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h2 className="text-2xl font-bold text-white mb-1">{selectedMember.name}</h2>
                                                <p className={`${getTextClass(selectedMember.primaryColor)}`}>{selectedMember.role}</p>
                                            </div>
                                            <button
                                                onClick={() => setSelectedMember(null)}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="prose prose-invert max-w-none">
                                            <h3 className="text-xl font-semibold mb-4">Biography</h3>
                                            <p className="text-gray-300 leading-relaxed mb-6">
                                                {selectedMember.bio}
                                            </p>

                                            <h3 className="text-xl font-semibold mb-4">Project Contribution</h3>
                                            <p className="text-gray-300 leading-relaxed mb-6">
                                                For the Supmap project, {selectedMember.name.split(" ")[0]} contributed expertise in {selectedMember.skills.slice(0, 3).join(", ")} to create an
                                                innovative and performant navigation application. {selectedMember.name.split(" ")[0]} worked closely with the team to ensure seamless integration
                                                between the different components of the system.
                                            </p>

                                            <div className={`p-4 rounded-lg ${getBgClass(selectedMember.primaryColor)} mb-6`}>
                                                <p className={`${getTextClass(selectedMember.primaryColor)} italic`}>
                                                    "Our goal was to create an application that truly changes how people navigate daily,
                                                    combining advanced technologies with a simple and intuitive user experience."
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-24 max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                        Interested in our project?
                    </h2>
                    <p className="text-gray-300 mb-8">
                        Discover Supmap's features and start navigating smarter today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/navigation"
                            className="group relative w-full sm:w-auto flex items-center justify-center py-3 px-6
                                      bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium
                                      rounded-lg shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30
                                      transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                        >
                            <NavigationIcon size={18} className="mr-2 relative z-10" />
                            <span className="relative z-10">Try Supmap</span>
                            <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                            <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            </div>
                        </Link>

                        <Link
                            to="/documentation"
                            className="group w-full sm:w-auto flex items-center justify-center py-3 px-6
                                     border border-indigo-500/40 text-indigo-300 font-medium rounded-lg
                                     hover:bg-indigo-900/40 hover:border-indigo-500/60 transition-all duration-300"
                        >
                            <CodeIcon size={18} className="mr-2" />
                            <span>Documentation</span>
                            <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;