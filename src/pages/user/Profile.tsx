import React, { useState, useEffect } from 'react';
import { getAuthenticatedUserDetails } from '../../hooks/user/user.ts';
import ProfileHeader from '../../component/user/ProfileHeader.tsx';
import ProfileInfo from '../../component/user/ProfileInfo.tsx';
import DeleteAccountModal from '../../component/user/DeleteAccountModal.tsx';
import { AlertCircle } from 'lucide-react';

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
                <p className="text-indigo-300">Loading your profile...</p>
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="min-h-screen bg-[rgba(10,12,20,0.9)] text-white flex flex-col items-center justify-center p-4">
                <div className="bg-red-900/20 border border-red-800/30 text-red-200 px-6 py-4 rounded-lg flex items-center gap-3 max-w-md">
                    <AlertCircle size={24} className="text-red-400" />
                    <div>
                        <h2 className="font-semibold mb-1">Error Loading Profile</h2>
                        <p className="text-sm">{error || 'Unable to load profile information'}</p>
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

                <ProfileInfo
                    userData={userData}
                    onUpdate={fetchUserData}
                />

                <div className="mt-10 pt-10 border-t border-indigo-900/30">
                    <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-6 shadow-lg shadow-red-900/10">
                        <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
                        <p className="text-gray-400 mb-6">These actions are irreversible. Please proceed with caution.</p>

                        <button
                            type="button"
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="w-full py-2.5 px-4 border border-red-500/50 rounded-lg text-red-400
                hover:bg-red-900/30 hover:text-red-300 transition-all duration-300"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>

                <DeleteAccountModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default Profile;