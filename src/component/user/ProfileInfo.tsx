import React, { useState } from 'react';
import { MapPinIcon, MailIcon, Star, CheckCircle, AlertCircle, Edit2Icon, Clock, ThumbsUp, Medal } from 'lucide-react';
import { updateAuthenticatedUserDetails, setProfileImage } from '../../hooks/user/user.ts';

interface ProfileInfoProps {
    userData: {
        username: string;
        email: string;
        profileImage?: string;
        role: string;
        favoriteLocations: any[];
        stats: any;
        isValidEmail: boolean;
    };
    onUpdate: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userData, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(userData.username);
    const [email, setEmail] = useState(userData.email);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await updateAuthenticatedUserDetails(
                username,
                email,
                oldPassword || null,
                newPassword || null
            );
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
            onUpdate();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = (e.target.files as FileList)[0];
        setImageLoading(true);

        try {
            await setProfileImage(file);
            onUpdate();
            setSuccess('Profile image updated successfully!');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setImageLoading(false);
        }
    };

    const renderStatCard = (title: string, value: number | string, icon: React.ReactNode) => (
        <div className="bg-[rgba(99,102,241,0.1)] border border-indigo-900/30 rounded-xl p-4 flex flex-col backdrop-blur-sm hover:bg-[rgba(99,102,241,0.15)] transition-colors duration-300">
            <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-900/50 flex items-center justify-center mr-2">
                    {icon}
                </div>
                <span className="text-gray-400 text-sm">{title}</span>
            </div>
            <div className="text-xl font-semibold text-white">{value}</div>
        </div>
    );

    const formatDistanceOrTime = (value: number, isDistance = false) => {
        if (isDistance) {
            return value >= 1000 ? `${(value/1000).toFixed(1)} km` : `${value} m`;
        } else {
            if (value >= 60) {
                const hours = Math.floor(value / 60);
                const mins = value % 60;
                return `${hours}h ${mins}m`;
            }
            return `${value} min`;
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-[rgba(15,18,30,0.95)] border border-indigo-900/30 rounded-xl p-6 shadow-lg shadow-indigo-900/10 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">Personal Information</h2>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                        >
                            <Edit2Icon size={16} className="mr-1" />
                            <span>Edit</span>
                        </button>
                    )}
                </div>

                {error && (
                    <div className="mb-4 bg-red-900/20 border border-red-800/30 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                        <AlertCircle size={18} className="text-red-400" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="mb-4 bg-green-900/20 border border-green-800/30 text-green-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                        <CheckCircle size={18} className="text-green-400" />
                        <span>{success}</span>
                    </div>
                )}

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="profile-image" className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
                            <div className="flex items-center">
                                <div className="relative w-16 h-16 mr-4">
                                    {userData.profileImage ? (
                                        <img
                                            src={userData.profileImage}
                                            alt="Profile"
                                            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/30"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-indigo-900/50 rounded-full flex items-center justify-center border-2 border-indigo-500/30">
                                          <span className="text-indigo-300 text-xl font-semibold">
                                            {userData.username.charAt(0).toUpperCase()}
                                          </span>
                                        </div>
                                    )}
                                    {imageLoading && (
                                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="profile-image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-gray-400
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-medium
                                        file:bg-indigo-600 file:text-white
                                        hover:file:bg-indigo-500
                                        file:cursor-pointer file:transition-colors file:duration-300"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="py-2.5 px-4 w-full bg-indigo-900/30 border border-indigo-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="py-2.5 px-4 w-full bg-indigo-900/30 border border-indigo-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                            />
                        </div>

                        <div className="pt-4 border-t border-indigo-900/30">
                            <p className="text-gray-400 text-sm mb-4">Change Password (leave blank to keep current)</p>

                            <div className="mb-4">
                                <label htmlFor="old-password" className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                                <input
                                    id="old-password"
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="py-2.5 px-4 w-full bg-indigo-900/30 border border-indigo-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                                <input
                                    id="new-password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="py-2.5 px-4 w-full bg-indigo-900/30 border border-indigo-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-2.5 px-4 rounded-lg
                                  bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium
                                  shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30
                                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                  transition-all duration-300 transform hover:-translate-y-0.5
                                  disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    </div>
                                ) : 'Save Changes'}
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="flex-1 py-2.5 px-4 border border-indigo-600/50 rounded-lg text-indigo-400 hover:text-indigo-300 hover:border-indigo-500 transition-all duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-indigo-900/50 flex items-center justify-center mr-3">
                                <MapPinIcon size={18} className="text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Role</p>
                                <p className="text-white">{userData.role}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-indigo-900/50 flex items-center justify-center mr-3">
                                <MailIcon size={18} className="text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <div className="flex items-center">
                                    <p className="text-white mr-2">{userData.email}</p>
                                    {userData.isValidEmail ? (
                                        <span className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                                          <CheckCircle size={12} className="mr-1" />
                                          Verified
                                        </span>
                                    ) : (
                                        <span className="bg-yellow-900/30 text-yellow-400 text-xs px-2 py-1 rounded-full flex items-center">
                                          <AlertCircle size={12} className="mr-1" />
                                          Unverified
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* User Rank Card */}
            <div className="bg-[rgba(15,18,30,0.95)] border border-indigo-900/30 rounded-xl p-6 shadow-lg shadow-indigo-900/10 backdrop-blur-sm">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-lg bg-indigo-900/50 flex items-center justify-center mr-4">
                        <Medal size={24} className="text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Current Rank</p>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                            {userData.stats.rank}
                        </h3>
                    </div>
                    {userData.stats.rankImage && (
                        <img
                            src={userData.stats.rankImage}
                            alt={userData.stats.rank}
                            className="h-16 w-16 ml-auto"
                        />
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-4">Your Stats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderStatCard('Reports Submitted', userData.stats.totalReportsSubmitted, <Star size={16} className="text-indigo-400" />)}
                    {renderStatCard('Validated Reports', userData.stats.validatedReports, <CheckCircle size={16} className="text-indigo-400" />)}
                    {renderStatCard('Reports Validated By Others', userData.stats.reportsValidatedByOthers, <ThumbsUp size={16} className="text-indigo-400" />)}
                    {renderStatCard('Routes Completed', userData.stats.totalRoutesCompleted, <MapPinIcon size={16} className="text-indigo-400" />)}
                    {renderStatCard('Distance Traveled', formatDistanceOrTime(userData.stats.totalDistanceTraveled, true), <MapPinIcon size={16} className="text-indigo-400" />)}
                    {renderStatCard('Time Saved', formatDistanceOrTime(userData.stats.totalTimeSaved), <Clock size={16} className="text-indigo-400" />)}
                </div>
            </div>

            {/* Favorite Locations */}
            {userData.favoriteLocations.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Favorite Locations</h2>
                    <div className="space-y-4">
                        {userData.favoriteLocations.map((location, index) => (
                            <div
                                key={index}
                                className="bg-[rgba(15,18,30,0.95)] border border-indigo-900/30 rounded-xl p-4 shadow-lg shadow-indigo-900/10 backdrop-blur-sm hover:bg-[rgba(20,23,35,0.95)] transition-colors duration-300"
                            >
                                <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-900/50 flex items-center justify-center mr-2">
                                        <MapPinIcon size={16} className="text-indigo-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-white">{location.name}</h3>
                                    <span className="ml-auto text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded-full">
                                        {location.locationType}
                                    </span>
                                </div>
                                <p className="text-gray-400 ml-10">{location.formattedAddress}</p>
                                <div className="mt-2 ml-10 text-xs text-gray-500">
                                    <span className="inline-block">
                                        Lat: {location.coordinates.latitude.toFixed(6)}
                                    </span>
                                    <span className="inline-block ml-3">
                                        Lng: {location.coordinates.longitude.toFixed(6)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileInfo;