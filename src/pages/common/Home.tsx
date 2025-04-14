import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavigationIcon } from 'lucide-react';
import HeroSection from '../../component/HomePage/HeroSection.tsx';
import FeaturesSection from '../../component/HomePage/FeaturesSection.tsx';
import ReviewsSection from '../../component/HomePage/ReviewsSection';
import DocumentationSection from '../../component/HomePage/DocumentationSection.tsx';
import CtaSection from '../../component/HomePage/CtaSection.tsx';
import FaqSection from '../../component/HomePage/FaqSection.tsx';
import NewsletterSection from '../../component/HomePage/NewsletterSection.tsx';

const Home: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative bg-[#0a0c15] text-white overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-200px] right-[-100px] w-64 h-64 rounded-full border border-indigo-500/10 animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute bottom-[-150px] left-[10%] w-48 h-48 rounded-full border border-indigo-500/5 animate-[spin_40s_linear_infinite_reverse]"></div>
                <div className="absolute top-1/4 left-[10%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
                <div className="absolute top-[70%] right-[20%] w-1 h-1 rounded-full bg-indigo-400/30 animate-ping"></div>
                <div className="absolute top-[30%] right-[40%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
            </div>

            <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Link
                    to="/navigation"
                    className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-600 to-indigo-500
                            rounded-full shadow-lg hover:shadow-indigo-500/40 transition-all duration-300
                            hover:scale-110 group"
                >
                    <NavigationIcon size={24} className="text-white" />
                    <span className="absolute right-16 bg-gray-900 text-white text-sm py-2 px-3 rounded
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                   whitespace-nowrap">
                        Start Navigation
                    </span>
                </Link>
            </div>

            <HeroSection />
            <FeaturesSection />
            <ReviewsSection />
            <DocumentationSection />
            <CtaSection />
            <FaqSection />
            <NewsletterSection />
        </div>
    );
};

export default Home;