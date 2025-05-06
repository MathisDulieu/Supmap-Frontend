import React, { useState } from 'react';
import { SendIcon, CheckIcon, XIcon, MailMinusIcon } from 'lucide-react';
import { subscribeToNewsletter, unsubscribeFromNewsletter } from '../../hooks/contact/contact.ts';

const NewsletterSection: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [showUnsubscribe, setShowUnsubscribe] = useState(false);
    const [unsubscribeEmail, setUnsubscribeEmail] = useState('');
    const [unsubscribeStatus, setUnsubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [unsubscribeErrorMessage, setUnsubscribeErrorMessage] = useState('');
    const [isUnsubscribing, setIsUnsubscribing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setSubmitStatus('error');
            setErrorMessage('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await subscribeToNewsletter(email);
            setSubmitStatus('success');
            setEmail('');
        } catch (error: any) {
            setSubmitStatus('error');
            setErrorMessage(error.message || 'Failed to subscribe. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUnsubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!unsubscribeEmail || !/^\S+@\S+\.\S+$/.test(unsubscribeEmail)) {
            setUnsubscribeStatus('error');
            setUnsubscribeErrorMessage('Please enter a valid email address');
            return;
        }

        setIsUnsubscribing(true);
        setUnsubscribeStatus('idle');

        try {
            await unsubscribeFromNewsletter(unsubscribeEmail);
            setUnsubscribeStatus('success');
            setUnsubscribeEmail('');

            setTimeout(() => {
                if (unsubscribeStatus === 'success') {
                    setShowUnsubscribe(false);
                    setUnsubscribeStatus('idle');
                }
            }, 3000);
        } catch (error: any) {
            setUnsubscribeStatus('error');
            setUnsubscribeErrorMessage(error.message || 'Failed to unsubscribe. Please try again later.');
        } finally {
            setIsUnsubscribing(false);
        }
    };

    const toggleUnsubscribe = () => {
        setShowUnsubscribe(!showUnsubscribe);
        setUnsubscribeStatus('idle');
        setUnsubscribeEmail('');
    };

    return (
        <section className="py-24 relative">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c15] via-transparent to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-xl shadow-2xl border border-indigo-900/30 rounded-2xl
                                    overflow-hidden p-8 md:p-12 relative">
                        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full border border-indigo-500/10 animate-[spin_60s_linear_infinite]"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 rounded-full border border-indigo-500/5 animate-[spin_40s_linear_infinite_reverse]"></div>

                        <div className="relative">
                            <div className="flex flex-col md:flex-row items-center">
                                <div className="md:w-2/3 md:pr-8 mb-8 md:mb-0 text-center md:text-left">
                                    <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                                        {!showUnsubscribe ? 'Stay Updated with Supmap' : 'Unsubscribe from Updates'}
                                    </h2>
                                    {!showUnsubscribe ? (
                                        <>
                                            <p className="text-lg text-gray-300 mb-2">
                                                Subscribe to our newsletter for the latest features, traffic trends, and navigation tips.
                                            </p>
                                            <p className="text-gray-400">
                                                No spam, just valuable content to improve your daily commute.
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-lg text-gray-300 mb-2">
                                                We're sorry to see you go. Enter your email address to unsubscribe.
                                            </p>
                                            <p className="text-gray-400">
                                                You can resubscribe anytime to get our updates again.
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="md:w-1/3 w-full">
                                    {!showUnsubscribe ? (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Your email address"
                                                    className="pl-4 pr-12 py-3.5 w-full bg-indigo-900/30 border border-indigo-800/50 rounded-lg
                                                         text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                                         focus:border-indigo-500/50 transition-all duration-300"
                                                    disabled={isSubmitting}
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <SendIcon size={18} className="text-indigo-400" />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                                                    bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium
                                                    shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30
                                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                                    transition-all duration-300 transform hover:-translate-y-0.5
                                                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                                                    overflow-hidden"
                                            >
                                                {isSubmitting ? (
                                                    <span className="absolute inset-0 flex items-center justify-center">
                                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    </span>
                                                ) : (
                                                    <>
                                                        <span className="relative z-10">Subscribe</span>
                                                        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                                        </div>
                                                    </>
                                                )}
                                            </button>

                                            {submitStatus === 'success' && (
                                                <div className="bg-green-900/20 border border-green-800/30 text-green-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                                                    <CheckIcon size={18} className="text-green-400" />
                                                    <span>Successfully subscribed to the newsletter!</span>
                                                </div>
                                            )}

                                            {submitStatus === 'error' && (
                                                <div className="bg-red-900/20 border border-red-800/30 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                                                    <XIcon size={18} className="text-red-400" />
                                                    <span>{errorMessage}</span>
                                                </div>
                                            )}
                                        </form>
                                    ) : (
                                        <form onSubmit={handleUnsubscribe} className="space-y-4">
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={unsubscribeEmail}
                                                    onChange={(e) => setUnsubscribeEmail(e.target.value)}
                                                    placeholder="Enter email to unsubscribe"
                                                    className="pl-4 pr-12 py-3.5 w-full bg-indigo-900/30 border border-indigo-800/50 rounded-lg
                                                         text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                                         focus:border-indigo-500/50 transition-all duration-300"
                                                    disabled={isUnsubscribing}
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <MailMinusIcon size={18} className="text-indigo-400" />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isUnsubscribing}
                                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                                                    bg-gradient-to-r from-rose-600 to-rose-500 text-white font-medium
                                                    shadow-lg shadow-rose-600/20 hover:shadow-xl hover:shadow-rose-600/30
                                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500
                                                    transition-all duration-300 transform hover:-translate-y-0.5
                                                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                                                    overflow-hidden"
                                            >
                                                {isUnsubscribing ? (
                                                    <span className="absolute inset-0 flex items-center justify-center">
                                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    </span>
                                                ) : (
                                                    <>
                                                        <span className="relative z-10">Unsubscribe</span>
                                                        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-rose-500/0 via-rose-500/30 to-rose-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                                        </div>
                                                    </>
                                                )}
                                            </button>

                                            {unsubscribeStatus === 'success' && (
                                                <div className="bg-green-900/20 border border-green-800/30 text-green-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                                                    <CheckIcon size={18} className="text-green-400" />
                                                    <span>Successfully unsubscribed from the newsletter.</span>
                                                </div>
                                            )}

                                            {unsubscribeStatus === 'error' && (
                                                <div className="bg-red-900/20 border border-red-800/30 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                                                    <XIcon size={18} className="text-red-400" />
                                                    <span>{unsubscribeErrorMessage}</span>
                                                </div>
                                            )}
                                        </form>
                                    )}

                                    <div className="mt-4 flex justify-between items-center">
                                        <p className="text-xs text-gray-500 leading-relaxed flex-1">
                                            By subscribing, you agree to our <a href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300">Privacy Policy</a>.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={toggleUnsubscribe}
                                            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-300 ml-2 font-medium"
                                        >
                                            {showUnsubscribe ? 'Back to subscribe' : 'Unsubscribe'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;