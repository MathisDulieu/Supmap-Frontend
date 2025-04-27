import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserIcon, Settings } from 'lucide-react';

interface ProfileHeaderProps {
    username: string;
    profileImage?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, profileImage }) => {
    const location = useLocation();
    const isProfilePage = location.pathname === '/profile';
    const isSettingsPage = location.pathname === '/profile/settings';

    return (
        <div className="mb-8">
            <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt={`${username}'s profile`}
                            className="w-24 h-24 rounded-full border-4 border-indigo-500/30 object-cover shadow-lg shadow-indigo-900/20"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-indigo-900/50 border-4 border-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-900/20">
                            <UserIcon size={40} className="text-indigo-300" />
                        </div>
                    )}
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[rgba(15,18,30,0.95)]"></div>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                    {username}
                </h1>
            </div>

            <div className="flex justify-center mb-8">
                <div className="bg-[rgba(99,102,241,0.1)] rounded-xl p-1 flex">
                    <Link
                        to="/profile"
                        className={`px-6 py-2 rounded-lg flex items-center transition-all duration-300 ${
                            isProfilePage
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                                : 'text-indigo-300 hover:text-indigo-200'
                        }`}
                    >
                        <UserIcon size={18} className="mr-2" />
                        <span>Profile</span>
                    </Link>
                    <Link
                        to="/profile/settings"
                        className={`px-6 py-2 rounded-lg flex items-center transition-all duration-300 ${
                            isSettingsPage
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30'
                                : 'text-indigo-300 hover:text-indigo-200'
                        }`}
                    >
                        <Settings size={18} className="mr-2" />
                        <span>Settings</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;