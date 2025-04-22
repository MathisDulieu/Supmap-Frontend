import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LockIcon, EyeIcon, EyeOffIcon, AlertCircleIcon, CheckCircleIcon, ArrowLeftIcon, XIcon, CheckIcon } from 'lucide-react';
import MapRouteAnimation from '../../component/animation/MapRouteAnimation.tsx';

const ResetPassword: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [tokenValid, setTokenValid] = useState(true);
    const [tokenChecked, setTokenChecked] = useState(false);

    const [hasMinLength, setHasMinLength] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSpecial, setHasSpecial] = useState(false);

    const minLengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+\-={}';:",.<>?|`~]/;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}';:",.<>?|`~])[A-Za-z\d!@#$%^&*()_+\-={}';:",.<>?|`~]{8,}$/;

    useEffect(() => {
        const validateToken = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                setTokenValid(true);
                setTokenChecked(true);
            } catch (err) {
                setTokenValid(false);
                setTokenChecked(true);
                setError('Invalid or expired password reset link. Please request a new one.');
            }
        };

        validateToken();
    }, [token]);

    useEffect(() => {
        setHasMinLength(minLengthRegex.test(password));
        setHasUppercase(uppercaseRegex.test(password));
        setHasLowercase(lowercaseRegex.test(password));
        setHasNumber(numberRegex.test(password));
        setHasSpecial(specialCharRegex.test(password));
    }, [password]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const isPasswordValid = () => {
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isPasswordValid()) {
            setError('Password does not meet all requirements');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSuccess(true);

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError('Failed to reset password. Please try again or request a new reset link.');
        } finally {
            setLoading(false);
        }
    };

    const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
        <div className="flex items-center gap-2">
            {met ? (
                <CheckIcon size={14} className="text-green-400" />
            ) : (
                <XIcon size={14} className="text-red-400" />
            )}
            <span className={met ? "text-green-400" : "text-gray-400"}>{text}</span>
        </div>
    );

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
                            Reset Your Password
                        </h2>
                        <p className="mt-2 text-gray-400 text-sm">
                            Create a new secure password for your account
                        </p>
                    </div>

                    {!tokenChecked ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : !tokenValid ? (
                        <div className="mb-6 bg-red-900/20 border border-red-800/30 text-red-200 px-4 py-4 rounded-lg flex items-start gap-3 text-sm">
                            <AlertCircleIcon size={20} className="text-red-400 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-red-300 mb-1">Invalid Reset Link</h3>
                                <p>This password reset link is invalid or has expired. Please request a new link.</p>
                                <div className="mt-4">
                                    <Link
                                        to="/forgot-password"
                                        className="inline-flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg
                                            bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                                    >
                                        Request New Link
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : success ? (
                        <div className="mb-6 bg-green-900/20 border border-green-800/30 text-green-200 px-4 py-4 rounded-lg flex items-start gap-3 text-sm">
                            <CheckCircleIcon size={20} className="text-green-400 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-green-300 mb-1">Password Reset Successfully</h3>
                                <p>Your password has been successfully reset. You can now use your new password to log in.</p>
                                <p className="mt-2">Redirecting to login page...</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="mb-6 bg-red-900/20 border border-red-800/30 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                                    <AlertCircleIcon size={18} className="text-red-400" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockIcon size={18} className="text-indigo-400" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`pl-10 pr-10 py-2.5 w-full bg-indigo-900/30 border ${isPasswordValid() ? 'border-green-500/50' : 'border-indigo-800/50'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-300 focus:outline-none"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                        </button>
                                    </div>

                                    <div className="mt-3 p-3 bg-indigo-900/20 border border-indigo-800/30 rounded-lg text-xs">
                                        <h4 className="text-gray-300 font-medium mb-2">Password requirements:</h4>
                                        <div className="grid grid-cols-1 gap-2">
                                            <PasswordRequirement met={hasMinLength} text="At least 8 characters" />
                                            <PasswordRequirement met={hasUppercase} text="At least one uppercase letter (A-Z)" />
                                            <PasswordRequirement met={hasLowercase} text="At least one lowercase letter (a-z)" />
                                            <PasswordRequirement met={hasNumber} text="At least one number (0-9)" />
                                            <PasswordRequirement met={hasSpecial} text="At least one special character (!@#$%^&*...)" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockIcon size={18} className="text-indigo-400" />
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={`pl-10 pr-10 py-2.5 w-full bg-indigo-900/30 border ${password && confirmPassword && password === confirmPassword ? 'border-green-500/50' : 'border-indigo-800/50'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleConfirmPasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-300 focus:outline-none"
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        >
                                            {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                        </button>
                                    </div>
                                    {confirmPassword && password !== confirmPassword && (
                                        <p className="mt-1 text-xs text-red-400">
                                            Passwords do not match
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={loading || !isPasswordValid() || password !== confirmPassword}
                                        className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg
                                            bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium
                                            shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30
                                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                            transition-all duration-300 transform hover:-translate-y-0.5
                                            disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                                            overflow-hidden"
                                    >
                                        {loading ? (
                                            <span className="absolute inset-0 flex items-center justify-center">
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </span>
                                        ) : (
                                            <>
                                                <span className="relative z-10">Reset Password</span>
                                                <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                                </div>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
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

export default ResetPassword;