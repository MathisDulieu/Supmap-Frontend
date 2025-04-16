import React, { useState, useEffect } from 'react';
import {
    MailIcon,
    InfoIcon,
    MessageSquareIcon,
    SendIcon,
    AlertCircleIcon,
    CheckCircleIcon,
    XCircleIcon,
    PhoneIcon,
    ClockIcon,
    HelpCircleIcon
} from 'lucide-react';

const Support: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const MAX_CHAR_COUNT = 500;

    const [formErrors, setFormErrors] = useState({
        email: '',
        subject: '',
        content: ''
    });

    useEffect(() => {
        setFormErrors(prev => ({ ...prev, email: '' }));
    }, [email]);

    useEffect(() => {
        setFormErrors(prev => ({ ...prev, subject: '' }));
    }, [subject]);

    useEffect(() => {
        setFormErrors(prev => ({ ...prev, content: '' }));
    }, [content]);

    const isFormValid = () => {
        let isValid = true;
        const errors = {
            email: '',
            subject: '',
            content: ''
        };

        if (!email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!subject.trim()) {
            errors.subject = 'Subject is required';
            isValid = false;
        }

        if (!content.trim()) {
            errors.content = 'Message is required';
            isValid = false;
        } else if (content.length > MAX_CHAR_COUNT) {
            errors.content = `Message is too long (max ${MAX_CHAR_COUNT} characters)`;
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSubmitStatus('success');
            setEmail('');
            setSubject('');
            setContent('');
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen relative bg-[#0a0c15] text-white">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c15] via-[#12152e]/50 to-[#0a0c15]"></div>
                <div className="absolute top-[-200px] right-[-100px] w-64 h-64 rounded-full border border-indigo-500/10 animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute bottom-[-150px] left-[10%] w-48 h-48 rounded-full border border-indigo-500/5 animate-[spin_40s_linear_infinite_reverse]"></div>
                <div className="absolute top-1/4 left-[10%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
                <div className="absolute top-[70%] right-[20%] w-1 h-1 rounded-full bg-indigo-400/30 animate-ping"></div>
                <div className="absolute top-[30%] right-[40%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                            Support
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Need help with Supmap? Our team is here to assist you.
                            Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3">
                            <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-xl shadow-xl border border-indigo-900/30 rounded-2xl p-8">
                                <h2 className="text-2xl font-semibold mb-6 text-white">
                                    Contact Support
                                </h2>

                                {submitStatus === 'success' ? (
                                    <div className="bg-green-900/20 border border-green-800/30 text-green-200 px-6 py-5 rounded-lg flex items-start gap-4">
                                        <CheckCircleIcon size={24} className="text-green-400 mt-0.5" />
                                        <div>
                                            <h3 className="font-semibold text-white mb-1">Message Sent Successfully!</h3>
                                            <p>Thank you for contacting us. Our support team will review your message and get back to you as soon as possible.</p>
                                            <button
                                                onClick={() => setSubmitStatus('idle')}
                                                className="mt-4 text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                                            >
                                                Send another message
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {submitStatus === 'error' && (
                                            <div className="bg-red-900/20 border border-red-800/30 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm mb-4">
                                                <XCircleIcon size={18} className="text-red-400" />
                                                <span>{errorMessage}</span>
                                            </div>
                                        )}

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
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={`pl-10 py-2.5 w-full bg-indigo-900/30 border ${
                                                        formErrors.email ? 'border-red-500/50' : 'border-indigo-800/50'
                                                    } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300`}
                                                    placeholder="your.email@example.com"
                                                />
                                            </div>
                                            {formErrors.email && (
                                                <p className="mt-1 text-red-400 text-sm">{formErrors.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <InfoIcon size={18} className="text-indigo-400" />
                                                </div>
                                                <input
                                                    id="subject"
                                                    name="subject"
                                                    type="text"
                                                    value={subject}
                                                    onChange={(e) => setSubject(e.target.value)}
                                                    className={`pl-10 py-2.5 w-full bg-indigo-900/30 border ${
                                                        formErrors.subject ? 'border-red-500/50' : 'border-indigo-800/50'
                                                    } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300`}
                                                    placeholder="How can we help you?"
                                                />
                                            </div>
                                            {formErrors.subject && (
                                                <p className="mt-1 text-red-400 text-sm">{formErrors.subject}</p>
                                            )}
                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label htmlFor="content" className="block text-sm font-medium text-gray-300">Message</label>
                                                <span className={`text-xs ${
                                                    content.length > MAX_CHAR_COUNT ? 'text-red-400' : 'text-gray-400'
                                                }`}>
                                                    {content.length}/{MAX_CHAR_COUNT}
                                                </span>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                                    <MessageSquareIcon size={18} className="text-indigo-400" />
                                                </div>
                                                <textarea
                                                    id="content"
                                                    name="content"
                                                    rows={6}
                                                    value={content}
                                                    onChange={handleContentChange}
                                                    className={`pl-10 py-2.5 w-full bg-indigo-900/30 border ${
                                                        formErrors.content || content.length > MAX_CHAR_COUNT ? 'border-red-500/50' : 'border-indigo-800/50'
                                                    } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300`}
                                                    placeholder="Please describe your issue in detail..."
                                                />
                                            </div>
                                            {formErrors.content && (
                                                <p className="mt-1 text-red-400 text-sm">{formErrors.content}</p>
                                            )}
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg
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
                                                        <span className="relative z-10">Send Message</span>
                                                        <SendIcon size={18} className="ml-2 relative z-10" />
                                                        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                                        </div>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-[rgba(15,18,30,0.8)] backdrop-blur-xl shadow-xl border border-indigo-900/30 rounded-2xl p-8">
                                <h2 className="text-2xl font-semibold mb-6 text-white">
                                    Support Information
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="bg-indigo-900/60 rounded-full p-2.5 mr-4">
                                            <ClockIcon size={20} className="text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white mb-1">Response Time</h3>
                                            <p className="text-gray-400 text-sm">
                                                We typically respond to all inquiries within 24-48 hours during business days.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-indigo-900/60 rounded-full p-2.5 mr-4">
                                            <MailIcon size={20} className="text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white mb-1">Email Support</h3>
                                            <p className="text-gray-400 text-sm">
                                                For direct contact: <br />
                                                <a href="mailto:supmap.application@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
                                                    supmap.application@gmail.com
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-indigo-900/60 rounded-full p-2.5 mr-4">
                                            <PhoneIcon size={20} className="text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white mb-1">Phone Support</h3>
                                            <p className="text-gray-400 text-sm">
                                                Available Monday to Friday, 9AM to 5PM (GMT+1): <br />
                                                <a href="tel:+33614129625" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
                                                    +33 6 14 12 96 25
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-indigo-900/60 rounded-full p-2.5 mr-4">
                                            <HelpCircleIcon size={20} className="text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white mb-1">FAQ</h3>
                                            <p className="text-gray-400 text-sm">
                                                Check our <a href="/documentation" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300">documentation</a> for answers to frequently asked questions.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-indigo-900/30">
                                    <div className="bg-indigo-900/40 rounded-xl p-4">
                                        <div className="flex items-center mb-2">
                                            <AlertCircleIcon size={18} className="text-indigo-400 mr-2" />
                                            <h3 className="font-medium text-white">Important Note</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm">
                                            For emergency assistance related to safety concerns while navigating,
                                            please contact local emergency services directly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
                            Frequently Asked Questions
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[rgba(15,18,30,0.6)] backdrop-blur-sm border border-indigo-900/30 rounded-xl p-6">
                                <h3 className="text-lg font-medium text-white mb-3">How do I report an incorrect route?</h3>
                                <p className="text-gray-400">
                                    While navigating, you can tap the alert icon and select "Incorrect Route"
                                    to report any issues with the suggested path. Our team regularly reviews
                                    these reports to improve navigation accuracy.
                                </p>
                            </div>

                            <div className="bg-[rgba(15,18,30,0.6)] backdrop-blur-sm border border-indigo-900/30 rounded-xl p-6">
                                <h3 className="text-lg font-medium text-white mb-3">Can I use Supmap offline?</h3>
                                <p className="text-gray-400">
                                    Yes, Supmap allows you to download maps for offline use.
                                    Navigate to Settings &gt; Offline Maps and select the regions you
                                    want to download. Note that real-time traffic updates require
                                    an internet connection.
                                </p>
                            </div>

                            <div className="bg-[rgba(15,18,30,0.6)] backdrop-blur-sm border border-indigo-900/30 rounded-xl p-6">
                                <h3 className="text-lg font-medium text-white mb-3">How do I recover my account?</h3>
                                <p className="text-gray-400">
                                    If you've forgotten your password, use the "Forgot Password" option on the
                                    login screen. If you're experiencing other account access issues,
                                    please contact our support team through this form for assistance.
                                </p>
                            </div>

                            <div className="bg-[rgba(15,18,30,0.6)] backdrop-blur-sm border border-indigo-900/30 rounded-xl p-6">
                                <h3 className="text-lg font-medium text-white mb-3">How can I improve battery life while using Supmap?</h3>
                                <p className="text-gray-400">
                                    To optimize battery usage, go to Settings &gt; Battery Optimization and
                                    enable "Battery Saving Mode". You can also reduce screen brightness
                                    and disable unused features like 3D buildings or satellite view.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;