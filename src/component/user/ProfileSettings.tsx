import React, { useState } from 'react';
import {
    Map, Car, Truck, Bike, PersonStanding,
    AlertCircle, CheckCircle, Bell
} from 'lucide-react';
import { updateUserNavigationPreferences } from '../../hooks/map/map.ts';
import { updateAuthenticatedUserNotificationPreferences } from '../../hooks/notification/notification.ts';

interface ProfileSettingsProps {
    navigationPreferences: {
        avoidTolls: boolean;
        avoidHighways: boolean;
        avoidTraffic: boolean;
        showUsers: boolean;
        proximityAlertDistance: number;
        preferredTransportMode: string;
    };
    notificationSettings: {
        emailEnabled: boolean;
    };
    onUpdate: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
                                                             navigationPreferences,
                                                             notificationSettings,
                                                             onUpdate
                                                         }) => {
    const [navPrefs, setNavPrefs] = useState({...navigationPreferences});
    const [notifications, setNotifications] = useState({...notificationSettings});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const transportModes = [
        { value: 'CAR', label: 'Car', icon: <Car size={20} /> },
        { value: 'TRUCK', label: 'Truck', icon: <Truck size={20} /> },
        { value: 'BICYCLE', label: 'Bicycle', icon: <Bike size={20} /> },
        { value: 'WALKING', label: 'Walking', icon: <PersonStanding size={20} /> },
    ];

    const handleNavPrefSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await updateUserNavigationPreferences(
                navPrefs.avoidTolls,
                navPrefs.avoidHighways,
                navPrefs.avoidTraffic,
                navPrefs.showUsers,
                navPrefs.proximityAlertDistance,
                navPrefs.preferredTransportMode
            );
            setSuccess('Navigation preferences updated successfully!');
            onUpdate();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNotificationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await updateAuthenticatedUserNotificationPreferences(
                notifications.emailEnabled.toString()
            );
            setSuccess('Notification settings updated successfully!');
            onUpdate();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (field: keyof typeof navPrefs) => {
        setNavPrefs(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setNavPrefs(prev => ({
            ...prev,
            proximityAlertDistance: value
        }));
    };

    const handleTransportModeChange = (mode: string) => {
        setNavPrefs(prev => ({
            ...prev,
            preferredTransportMode: mode
        }));
    };

    const handleNotificationToggle = () => {
        setNotifications(prev => ({
            ...prev,
            emailEnabled: !prev.emailEnabled
        }));
    };

    const ToggleSwitch = ({ toggled, onToggle }: { toggled: boolean, onToggle: () => void }) => (
        <button
            type="button"
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                toggled ? 'bg-indigo-500' : 'bg-indigo-900/50'
            } transition-colors duration-300 focus:outline-none`}
        >
      <span
          className={`${
              toggled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`}
      />
        </button>
    );

    return (
        <div className="space-y-6">
            {error && (
                <div className="bg-red-900/20 border border-red-800/30 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                    <AlertCircle size={18} className="text-red-400" />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="bg-green-900/20 border border-green-800/30 text-green-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                    <CheckCircle size={18} className="text-green-400" />
                    <span>{success}</span>
                </div>
            )}

            {/* Navigation Preferences */}
            <div className="bg-[rgba(15,18,30,0.95)] border border-indigo-900/30 rounded-xl p-6 shadow-lg shadow-indigo-900/10">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-lg bg-indigo-900/50 flex items-center justify-center mr-3">
                        <Map size={20} className="text-indigo-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Navigation Preferences</h2>
                </div>

                <form onSubmit={handleNavPrefSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-medium">Avoid Tolls</h3>
                                <p className="text-gray-400 text-sm">Routes will avoid toll roads when possible</p>
                            </div>
                            <ToggleSwitch toggled={navPrefs.avoidTolls} onToggle={() => handleToggle('avoidTolls')} />
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-medium">Avoid Highways</h3>
                                <p className="text-gray-400 text-sm">Routes will avoid highways when possible</p>
                            </div>
                            <ToggleSwitch toggled={navPrefs.avoidHighways} onToggle={() => handleToggle('avoidHighways')} />
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-medium">Avoid Traffic</h3>
                                <p className="text-gray-400 text-sm">Routes will try to avoid traffic congestion</p>
                            </div>
                            <ToggleSwitch toggled={navPrefs.avoidTraffic} onToggle={() => handleToggle('avoidTraffic')} />
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-medium">Show Other Users</h3>
                                <p className="text-gray-400 text-sm">Display other Supmap users on the map</p>
                            </div>
                            <ToggleSwitch toggled={navPrefs.showUsers} onToggle={() => handleToggle('showUsers')} />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-indigo-900/30">
                        <h3 className="text-white font-medium mb-2">Proximity Alert Distance</h3>
                        <p className="text-gray-400 text-sm mb-4">Get alerted when approaching points of interest</p>

                        <div className="mb-2 flex justify-between text-gray-400 text-xs">
                            <span>200m</span>
                            <span>500m</span>
                            <span>1000m</span>
                            <span>2000m</span>
                        </div>

                        <input
                            type="range"
                            min="200"
                            max="2000"
                            step="50"
                            value={navPrefs.proximityAlertDistance}
                            onChange={handleDistanceChange}
                            className="w-full h-2 bg-indigo-900/50 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                        <p className="text-center text-indigo-300 mt-2">{navPrefs.proximityAlertDistance}m</p>
                    </div>

                    <div className="pt-4 border-t border-indigo-900/30">
                        <h3 className="text-white font-medium mb-4">Preferred Transport Mode</h3>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {transportModes.map((mode) => (
                                <button
                                    key={mode.value}
                                    type="button"
                                    onClick={() => handleTransportModeChange(mode.value)}
                                    className={`p-3 rounded-lg border flex flex-col items-center transition-all duration-300 ${
                                        navPrefs.preferredTransportMode === mode.value
                                            ? 'bg-indigo-600/30 border-indigo-500 text-white'
                                            : 'bg-indigo-900/30 border-indigo-900/50 text-gray-400 hover:bg-indigo-900/50'
                                    }`}
                                >
                                    {mode.icon}
                                    <span className="mt-2 text-sm">{mode.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 px-4 rounded-lg
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
                        ) : 'Save Navigation Preferences'}
                    </button>
                </form>
            </div>

            <div className="bg-[rgba(15,18,30,0.95)] border border-indigo-900/30 rounded-xl p-6 shadow-lg shadow-indigo-900/10">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-lg bg-indigo-900/50 flex items-center justify-center mr-3">
                        <Bell size={20} className="text-indigo-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
                </div>

                <form onSubmit={handleNotificationSubmit} className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-white font-medium">Email Notifications</h3>
                            <p className="text-gray-400 text-sm">Receive important updates via email</p>
                        </div>
                        <ToggleSwitch toggled={notifications.emailEnabled} onToggle={handleNotificationToggle} />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 px-4 rounded-lg
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
                        ) : 'Save Notification Settings'}
                    </button>
                </form>
            </div>

            <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-6 shadow-lg shadow-red-900/10">
                <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
                <p className="text-gray-400 mb-6">These actions are irreversible. Please proceed with caution.</p>

                <button
                    type="button"
                    className="w-full py-2.5 px-4 border border-red-500/50 rounded-lg text-red-400
            hover:bg-red-900/30 hover:text-red-300 transition-all duration-300"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default ProfileSettings;