import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CookiesPopUpProps {
    onAccept?: () => void;
    onReject?: () => void;
    showCookiesPopUp?: boolean;
}

const CookiesPopUp: React.FC<CookiesPopUpProps> = ({
                                                       onAccept = () => {},
                                                       onReject = () => {},
                                                       showCookiesPopUp = true
                                                   }) => {
    const [show, setShow] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (showCookiesPopUp) {
            const timer = setTimeout(() => {
                setIsAnimating(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [showCookiesPopUp]);

    const handleAccept = () => {
        setIsAnimating(false);
        localStorage.setItem('cookiesAccepted', 'true');

        setTimeout(() => {
            setShow(false);
            onAccept();
        }, 300);
    };

    const handleReject = () => {
        setIsAnimating(false);
        localStorage.setItem('cookiesRejected', 'true');

        setTimeout(() => {
            setShow(false);
            onReject();
        }, 300);
    };

    if (!show || !showCookiesPopUp) {
        return null;
    }

    return (
        <div className={`fixed bottom-5 left-5 right-5 sm:left-5 sm:right-auto z-50 transition-all duration-500 ease-in-out ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="max-w-md bg-[rgba(17,24,39,0.95)] backdrop-blur-xl border border-indigo-500/20 rounded-lg shadow-lg shadow-indigo-500/10 p-5 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full border border-indigo-500/10 animate-[spin_40s_linear_infinite]"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full border border-indigo-500/5 animate-[spin_30s_linear_infinite_reverse]"></div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center mb-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-500/20 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                                <path d="M8.5 8.5a4 4 0 0 0 0 7 4 4 0 0 0 7 0"/>
                            </svg>
                        </div>
                        <h4 className="text-white text-lg font-semibold">We respect your privacy</h4>
                    </div>

                    <div className="text-gray-300 text-sm mb-4">
                        <p className="mb-3">
                            By accepting, you allow Supmap to use cookies to improve your browsing experience,
                            personalize content, and analyze traffic. We also share data with
                            our partners for advertising and analytical purposes.
                        </p>

                        <div className="flex flex-wrap text-xs text-indigo-300 gap-4 mt-2">
                            <Link to="/terms-of-use" className="hover:text-indigo-200 transition-colors duration-300 relative group">
                                Terms of Use
                                <span className="absolute left-0 bottom-0 w-0 h-px bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link to="/cookies-policy" className="hover:text-indigo-200 transition-colors duration-300 relative group">
                                Cookie Policy
                                <span className="absolute left-0 bottom-0 w-0 h-px bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link to="/privacy-policy" className="hover:text-indigo-200 transition-colors duration-300 relative group">
                                Privacy Policy
                                <span className="absolute left-0 bottom-0 w-0 h-px bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end mt-4">
                        <button
                            onClick={handleReject}
                            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group"
                        >
                            <span className="relative z-10">Decline</span>
                            <span className="absolute left-0 bottom-0 h-px w-0 bg-gray-400 group-hover:w-full transition-all duration-300"></span>
                        </button>

                        <button
                            onClick={handleAccept}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:shadow-indigo-600/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:translate-y-0 active:scale-100 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <span className="relative z-10">Accept</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookiesPopUp;