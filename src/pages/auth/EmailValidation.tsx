import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircleIcon, AlertCircleIcon, ArrowLeftIcon, RefreshCwIcon } from 'lucide-react';
import MapRouteAnimation from '../../component/animation/MapRouteAnimation.tsx';
import { confirmEmail } from '../../hooks/auth/auth';

const EmailValidation: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const validateEmail = async () => {
            if (!token) {
                setError('No validation token provided.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const responseMessage = await confirmEmail(token);

                setSuccess(true);
                setMessage(responseMessage);
                setLoading(false);
            } catch (err: any) {
                console.error('Email validation error:', err);
                setError(err.message || 'Invalid or expired validation link. Please request a new one.');
                setLoading(false);
                setSuccess(false);
            }
        };

        validateEmail();
    }, [token]);

    const handleResendValidation = async () => {
        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setError('');
            setLoading(false);
            navigate('/register-email');
        } catch (err) {
            setError('Failed to process your request. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-[rgba(10,12,20,0.9)]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <MapRouteAnimation />

                <div className="absolute top-[-200px] right-[-100px] w-64 h-64 rounded-full border border-indigo-500/10 animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute bottom-[-150px] left-[10%] w-48 h-48 rounded-full border border-indigo-500/5 animate-[spin_40s_linear_infinite_reverse]"></div>

                <div className="absolute top-1/4 left-[10%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
                <div className="absolute top-[70%] right-[20%] w-1 h-1 rounded-full bg-indigo-400/30 animate-ping"></div>
                <div className="absolute top-[30%] right-[40%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-[rgba(15,18,30,0.95)] backdrop-blur-xl shadow-xl shadow-indigo-900/20 rounded-2xl p-8 border border-indigo-900/30">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <span className="absolute w-3 h-3 bg-indigo-500 rounded-full z-10 shadow-[0_0_15px_3px_rgba(99,102,241,0.8)] animate-pulse"></span>
                                <span className="absolute w-8 h-8 border-2 border-indigo-500/60 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                                <span className="absolute w-12 h-12 border border-indigo-500/30 rounded-full animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] animation-delay-300"></span>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                            Email Validation
                        </h2>
                        <p className="mt-2 text-gray-400 text-sm">
                            Verifying your email address
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                            <p className="text-gray-300">Validating your email...</p>
                        </div>
                    ) : success ? (
                        <div className="mb-6 bg-green-900/20 border border-green-800/30 text-green-200 px-4 py-4 rounded-lg flex items-start gap-3 text-sm">
                            <CheckCircleIcon size={20} className="text-green-400 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-green-300 mb-1">Email Validated Successfully</h3>
                                <p>{message || "Your email has been successfully verified. Your account is now active."}</p>
                                <div className="mt-4">
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg
                                            bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                                    >
                                        Continue to Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-6 bg-red-900/20 border border-red-800/30 text-red-200 px-4 py-4 rounded-lg flex items-start gap-3 text-sm">
                            <AlertCircleIcon size={20} className="text-red-400 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-red-300 mb-1">Validation Failed</h3>
                                <p>{error}</p>
                                <div className="mt-4">
                                    <button
                                        onClick={handleResendValidation}
                                        className="inline-flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg
                                            bg-indigo-600 hover:bg-indigo-700 text-white transition-colors mr-3"
                                    >
                                        <RefreshCwIcon size={16} className="mr-1" />
                                        Request New Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex items-center justify-center">
                        <Link
                            to="/login"
                            className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors duration-300 flex items-center"
                        >
                            <ArrowLeftIcon size={16} className="mr-1" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailValidation;