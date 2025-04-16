import React from 'react';

const AppHeader: React.FC = () => {
    return (
        <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                Supmap Mobile App
            </h1>
            <p className="text-xl text-gray-300 mb-8">
                Experience seamless navigation and real-time traffic updates on your mobile device.
                Download the Supmap app today and never get stuck in traffic again.
            </p>
        </div>
    );
};

export default AppHeader;