import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
    {
        id: 1,
        question: "How does Supmap differ from other navigation apps?",
        answer: "Supmap stands out with its community-verified real-time alerts, advanced traffic prediction using historical data, and smart rerouting capabilities. Our focus on user reports and verification creates a more accurate and reliable navigation experience. Additionally, our route sharing and QR code generation features make it easy to send routes across devices."
    },
    {
        id: 2,
        question: "Is Supmap available on both iOS and Android?",
        answer: "Yes, Supmap is available on both iOS and Android platforms. We also offer a web version that syncs with your mobile app, allowing you to plan routes on your computer and send them directly to your phone for on-the-go navigation."
    },
    {
        id: 3,
        question: "How accurate are the traffic alerts?",
        answer: "Our traffic alerts are highly accurate thanks to our community verification system. When users report incidents, others can confirm or deny them, which helps filter out false reports. Additionally, our system automatically removes outdated alerts based on user feedback and time elapsed since the initial report."
    },
    {
        id: 4,
        question: "Can I use Supmap without creating an account?",
        answer: "Yes, you can use basic navigation features without an account. However, creating a free account unlocks additional features such as saving favorite locations, contributing to the community by reporting and verifying incidents, customizing route preferences, and syncing your data across devices."
    },
    {
        id: 5,
        question: "Does Supmap work in rural areas with poor connectivity?",
        answer: "Supmap is designed to work in areas with limited connectivity. The app downloads map data for your route in advance, allowing for basic navigation even when offline. While real-time traffic updates require a data connection, the core navigation features will continue to function in rural areas with spotty coverage."
    },
    {
        id: 6,
        question: "How can I report an incident or hazard on the road?",
        answer: "Reporting is simple! While navigating, tap the alert button on the screen, select the type of incident (accident, traffic jam, police, hazard, etc.), and submit. You can also add a brief description or photo. Your report will immediately help other Supmap users in the area."
    }
];

const FaqSection: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (id: number) => {
        if (openFaq === id) {
            setOpenFaq(null);
        } else {
            setOpenFaq(id);
        }
    };

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-300">
                        Find answers to common questions about Supmap and how to get the most out of our navigation platform.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="space-y-6">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-[rgba(15,18,30,0.6)] backdrop-blur-sm border border-indigo-900/30
                                          rounded-xl overflow-hidden transition-all duration-300"
                            >
                                <button
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                    onClick={() => toggleFaq(faq.id)}
                                    aria-expanded={openFaq === faq.id}
                                >
                                    <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                                    <span className="ml-4 flex-shrink-0">
                                        {openFaq === faq.id ? (
                                            <ChevronUpIcon size={22} className="text-indigo-400" />
                                        ) : (
                                            <ChevronDownIcon size={22} className="text-indigo-400" />
                                        )}
                                    </span>
                                </button>

                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                        openFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="px-6 pb-5">
                                        <div className="border-t border-indigo-900/30 pt-4">
                                            <p className="text-gray-300 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-400 mb-4">
                            Didn't find what you're looking for?
                        </p>
                        <Link
                            to="/support"
                            className="inline-flex items-center justify-center py-3 px-6
                                     bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium
                                     rounded-lg shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30
                                     transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-indigo-900/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-indigo-900/5 rounded-full filter blur-3xl"></div>
            </div>
        </section>
    );
};

export default FaqSection;