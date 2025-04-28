import React, { useState } from 'react';
import { Star, CheckCircle, AlertCircle } from 'lucide-react';
import { rateApplication } from '../../hooks/user/user.ts';

interface RateAppProps {
    className?: string;
}

const RateApp: React.FC<RateAppProps> = ({ className = '' }) => {
    const [rating, setRating] = useState<number | null>(null);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRateApp = async (rate: number) => {
        setRating(rate);
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await rateApplication(rate);
            setSubmitStatus('success');
        } catch (error: any) {
            setSubmitStatus('error');
            setErrorMessage(error.message || 'Failed to submit rating. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === 'success') {
        return (
            <div className={`bg-[rgba(15,18,30,0.8)] backdrop-blur-xl shadow-xl border border-indigo-900/30 rounded-xl p-6 ${className}`}>
                <div className="flex items-center justify-center flex-col text-center">
                    <CheckCircle size={48} className="text-green-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Thanks for Your Feedback!</h3>
                    <p className="text-gray-300">Your rating helps us improve the app experience.</p>

                    <div className="flex mt-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={24}
                                className={`mx-1 ${star <= (rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-[rgba(15,18,30,0.8)] backdrop-blur-xl shadow-xl border border-indigo-900/30 rounded-xl p-6 ${className}`}>
            <div className="flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">Rate Your Experience</h3>
                <p className="text-gray-300 mb-6">How would you rate Supmap's mobile experience?</p>

                <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            disabled={isSubmitting}
                            onClick={() => handleRateApp(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(null)}
                            className="mx-1 transition-transform hover:scale-110 focus:outline-none disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <Star
                                size={32}
                                className={`
                  ${star <= (hoveredRating || rating || 0)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-500'}
                  transition-colors duration-200
                `}
                            />
                        </button>
                    ))}
                </div>

                {submitStatus === 'error' && (
                    <div className="bg-red-900/20 border border-red-800/30 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 text-sm w-full">
                        <AlertCircle size={18} className="text-red-400" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {isSubmitting && (
                    <div className="mt-2">
                        <svg className="animate-spin h-5 w-5 text-indigo-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RateApp;