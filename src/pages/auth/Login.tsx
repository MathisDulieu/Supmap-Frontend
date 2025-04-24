import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, LockIcon, UserPlusIcon, AlertCircleIcon, ArrowRightIcon, EyeIcon, EyeOffIcon, CheckCircleIcon } from 'lucide-react';
import MapRouteAnimation from '../../component/animation/MapRouteAnimation.tsx';
import { login } from '../../hooks/auth/auth';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const message = await login(email, password);
            console.log('Login successful:', message);

            setSuccess('Login successful! Redirecting to dashboard...');

            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                            Log in to Supmap
                        </h2>
                        <p className="mt-2 text-gray-400 text-sm">
                            Enter your details to access your account
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-900/20 border border-red-800/30 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircleIcon size={18} className="text-red-400" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 bg-green-900/20 border border-green-800/30 text-green-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                            <CheckCircleIcon size={18} className="text-green-400" />
                            <span>{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MailIcon size={18} className="text-indigo-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 py-2.5 w-full bg-indigo-900/30 border border-indigo-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                                <Link to="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
                                    Forgot password?
                                </Link>
                            </div>
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
                                    className="pl-10 pr-10 py-2.5 w-full bg-indigo-900/30 border border-indigo-800/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
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
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
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
                                        <span className="relative z-10">Sign in</span>
                                        <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                                        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                        </div>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/register/email"
                            className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors duration-300"
                        >
                            Resend verification email
                        </Link>
                    </div>

                    <div className="mt-8 pt-6 border-t border-indigo-900/30 flex items-center justify-center">
                        <p className="text-sm text-gray-400">
                            Don't have an account?
                        </p>
                        <Link
                            to="/register"
                            className="ml-2 flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-300 group"
                        >
                            <span>Create account</span>
                            <UserPlusIcon size={16} className="ml-1 transition-transform duration-300 group-hover:scale-110" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;