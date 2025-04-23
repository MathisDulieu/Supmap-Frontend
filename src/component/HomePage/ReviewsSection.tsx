import React, { useState, useEffect } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "Emma Johnson",
        role: "Daily Commuter",
        avatar: "https://i.ibb.co/bnDJZRF/t-l-chargement-3.jpg",
        rating: 5,
        comment: "Supmap has completely transformed my daily commute. The real-time traffic updates and rerouting have saved me countless hours stuck in traffic. The community alerts about police checks are incredibly accurate!",
        date: "2 weeks ago"
    },
    {
        id: 2,
        name: "David Chen",
        role: "Delivery Driver",
        avatar: "https://i.ibb.co/FbnmQmCZ/t-l-chargement-4.jpg",
        rating: 5,
        comment: "As a delivery driver, efficiency is everything. Supmap helps me avoid traffic jams and construction zones that other navigation apps miss. The hazard reporting feature is a game-changer for my job.",
        date: "1 month ago"
    },
    {
        id: 3,
        name: "Sophie Martinez",
        role: "Sales Representative",
        avatar: "https://i.ibb.co/N6gyS4sc/t-l-chargement-5.jpg",
        rating: 4,
        comment: "I drive to different client locations daily, and Supmap has been invaluable. The ability to save favorite locations and quick rerouting when traffic builds up has made my job so much easier.",
        date: "3 weeks ago"
    },
    {
        id: 4,
        name: "Thomas Wright",
        role: "Rideshare Driver",
        avatar: "https://i.ibb.co/0psJJVVc/t-l-chargement-1.jpg",
        rating: 5,
        comment: "The community-verified traffic alerts are what set Supmap apart. I can trust the information because it's verified by multiple users. As a rideshare driver, accurate ETAs are crucial for my ratings.",
        date: "2 months ago"
    },
    {
        id: 5,
        name: "Olivia Parker",
        role: "Parent",
        avatar: "https://i.ibb.co/q3ZhGTXc/t-l-chargement-2.jpg",
        rating: 5,
        comment: "School runs used to be stressful until I found Supmap. Now I know exactly when to leave to avoid traffic, and the alerts about accidents near schools have been so helpful for planning alternate routes.",
        date: "1 week ago"
    },
    {
        id: 6,
        name: "Michael Dawson",
        role: "Business Traveler",
        avatar: "https://i.ibb.co/35dSgYJp/t-l-chargement-6.jpg",
        rating: 4,
        comment: "I travel to unfamiliar cities for work, and Supmap has made navigating new places so much easier. The traffic predictions feature helps me plan meeting times with confidence.",
        date: "1 month ago"
    }
];

const ReviewsSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const visibleReviews = 3;

    useEffect(() => {
        let interval: number | undefined;

        if (autoplay) {
            interval = window.setInterval(() => {
                setActiveIndex((current) =>
                    current === reviews.length - visibleReviews ? 0 : current + 1
                );
            }, 5000);
        }

        return () => {
            if (interval) window.clearInterval(interval);
        };
    }, [autoplay]);

    const handleNext = () => {
        setAutoplay(false);
        setActiveIndex((current) =>
            current === reviews.length - visibleReviews ? 0 : current + 1
        );
    };

    const handlePrev = () => {
        setAutoplay(false);
        setActiveIndex((current) =>
            current === 0 ? reviews.length - visibleReviews : current - 1
        );
    };

    return (
        <section className="py-24 relative bg-[#0c0e1a]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-transparent"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                        What Our Users Say
                    </h2>
                    <p className="text-lg text-gray-300">
                        Don't just take our word for it. Here's what the Supmap community has to say about their experience.
                    </p>
                </div>

                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${activeIndex * (100 / visibleReviews)}%)` }}
                        >
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                                >
                                    <div className="h-full bg-[rgba(15,18,30,0.6)] backdrop-blur-sm border border-indigo-900/30 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-indigo-500/40">
                                                <img
                                                    src={review.avatar}
                                                    alt={review.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold">{review.name}</h3>
                                                <p className="text-sm text-indigo-400">{review.role}</p>
                                            </div>
                                        </div>

                                        <div className="flex mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <StarIcon
                                                    key={i}
                                                    size={18}
                                                    className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                                                />
                                            ))}
                                        </div>

                                        <p className="text-gray-300 mb-4 leading-relaxed">"{review.comment}"</p>

                                        <p className="text-sm text-gray-500">{review.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2
                                   w-12 h-12 rounded-full bg-[rgba(15,18,30,0.8)] backdrop-blur-sm
                                   border border-indigo-900/50 items-center justify-center
                                   text-indigo-400 hover:text-indigo-300 transition-colors duration-300
                                   focus:outline-none z-20 sm:flex hidden"
                    >
                        <ChevronLeftIcon size={24} />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2
                                   w-12 h-12 rounded-full bg-[rgba(15,18,30,0.8)] backdrop-blur-sm
                                   border border-indigo-900/50 items-center justify-center
                                   text-indigo-400 hover:text-indigo-300 transition-colors duration-300
                                   focus:outline-none z-20 sm:flex hidden"
                    >
                        <ChevronRightIcon size={24} />
                    </button>
                </div>

                <div className="flex justify-center mt-8 space-x-2">
                    {[...Array(reviews.length - visibleReviews + 1)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setAutoplay(false);
                                setActiveIndex(i);
                            }}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                activeIndex === i ? 'bg-indigo-500 w-6' : 'bg-indigo-900'
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;