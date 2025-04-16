import React, { useState } from 'react';

const FaqSection: React.FC = () => {
    return (
        <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
                <FaqItem
                    question="Does the app work in all countries?"
                    answer="Supmap currently works in most major countries. Our coverage is best in North America, Europe, and parts of Asia. We're constantly expanding our coverage to new regions."
                />

                <FaqItem
                    question="How much battery does the app use?"
                    answer="Supmap is optimized for battery efficiency. While any navigation app will use more battery than standard apps due to GPS usage, our battery-saving mode can reduce consumption by up to 30% compared to other navigation apps."
                />

                <FaqItem
                    question="Is there a premium version available?"
                    answer="Yes, Supmap Premium offers additional features like voice guidance, ad-free experience, advanced route planning, and priority support. You can try Premium free for 30 days by downloading the app."
                />

                <FaqItem
                    question="Can I use the app offline?"
                    answer="Yes, Supmap allows you to download maps for offline use. Simply go to Settings &gt; Offline Maps and select the regions you need. While real-time traffic features require an internet connection, you can still navigate with downloaded maps in areas with poor connectivity."
                />

                <FaqItem
                    question="How accurate is the real-time traffic data?"
                    answer="Our traffic data comes from multiple sources including user reports, traffic sensors, and historical patterns. This multi-layered approach provides excellent accuracy, especially in urban areas with many Supmap users. Community verification also helps filter out false reports."
                />
            </div>
        </div>
    );
};

interface FaqItemProps {
    question: string;
    answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-[rgba(15,18,30,0.6)] backdrop-blur-sm border border-indigo-900/30 rounded-xl overflow-hidden">
            <button
                className="w-full text-left p-6 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">{question}</h3>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 text-indigo-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>

                <div className={`mt-2 text-gray-400 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p>{answer}</p>
                </div>
            </button>
        </div>
    );
};

export default FaqSection;