import React, { useState, useEffect } from 'react';
import { getAuthenticatedUserDetails } from '../../hooks/user/user.ts';
import ProfileHeader from '../../component/user/ProfileHeader.tsx';
import ProfileSettings from '../../component/user/ProfileSettings.tsx';
import { AlertCircle } from 'lucide-react';

const ProfileSettingsPage: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAuthenticatedUserDetails();
            setUserData(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load user data');
            console.error('Error fetching user data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[rgba(10,12,20,0.9)] text-white flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                <p className="text-indigo-300">Loading your settings...</p>
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="min-h-screen bg-[rgba(10,12,20,0.9)] text-white flex flex-col items-center justify-center p-4">
                <div className="bg-red-900/20 border border-red-800/30 text-red-200 px-6 py-4 rounded-lg flex items-center gap-3 max-w-md">
                    <AlertCircle size={24} className="text-red-400" />
                    <div>
                        <h2 className="font-semibold mb-1">Error Loading Settings</h2>
                        <p className="text-sm">{error || 'Unable to load settings information'}</p>
                        <button
                            onClick={fetchUserData}
                            className="mt-3 px-4 py-2 bg-indigo-600 rounded-lg text-white text-sm hover:bg-indigo-500 transition-colors duration-300"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[rgba(10,12,20,0.9)] text-white">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-200px] right-[-100px] w-64 h-64 rounded-full border border-indigo-500/10 animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute bottom-[-150px] left-[10%] w-48 h-48 rounded-full border border-indigo-500/5 animate-[spin_40s_linear_infinite_reverse]"></div>
                <div className="absolute top-1/4 left-[10%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
                <div className="absolute top-[70%] right-[20%] w-1 h-1 rounded-full bg-indigo-400/30 animate-ping"></div>
                <div className="absolute top-[30%] right-[40%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 py-12 relative z-10">
                <ProfileHeader
                    username={userData.username}
                    profileImage={userData.profileImage}
                />

                <ProfileSettings
                    navigationPreferences={userData.navigationPreferences}
                    notificationSettings={userData.notificationSettings}
                    onUpdate={fetchUserData}
                />
            </div>
        </div>
    );
};

export default ProfileSettingsPage;