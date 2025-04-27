import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { deleteAuthenticatedUserAccount } from '../../hooks/user/user.ts';

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
    const [confirmation, setConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleDelete = async () => {
        if (confirmation !== 'DELETE') {
            setError('Please type DELETE to confirm');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await deleteAuthenticatedUserAccount();

            localStorage.removeItem('authToken');
            document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';

            window.location.href = '/login';
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[rgba(15,18,30,0.95)] border border-red-800/30 rounded-xl p-6 shadow-xl shadow-red-900/20 animate-fadeIn">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-900/30 mr-3">
                            <AlertTriangle size={22} className="text-red-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Delete Account</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-300 focus:outline-none"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-300 mb-4">
                        This action is <span className="text-red-400 font-semibold">permanent and irreversible</span>.
                        All your data, including reports, favorites, and settings will be permanently deleted.
                    </p>

                    <div className="bg-red-900/20 border border-red-800/30 text-red-200 px-4 py-3 rounded-lg text-sm">
                        <p>To confirm, please type <span className="font-bold">DELETE</span> in the field below.</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 bg-red-900/20 border border-red-800/30 text-red-200 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="mb-6">
                    <label htmlFor="confirm-delete" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirmation
                    </label>
                    <input
                        id="confirm-delete"
                        type="text"
                        value={confirmation}
                        onChange={(e) => setConfirmation(e.target.value)}
                        placeholder="Type DELETE to confirm"
                        className="py-2.5 px-4 w-full bg-red-900/10 border border-red-800/30 rounded-lg text-white placeholder-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2.5 px-4 border border-indigo-600/50 rounded-lg text-indigo-400 hover:text-indigo-300 hover:border-indigo-500 transition-all duration-300"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading || confirmation !== 'DELETE'}
                        className="flex-1 py-2.5 px-4 rounded-lg bg-red-600 text-white
              shadow-lg shadow-red-600/20 hover:bg-red-500
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
              transition-all duration-300
              disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-red-600"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            </div>
                        ) : 'Delete Account'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;