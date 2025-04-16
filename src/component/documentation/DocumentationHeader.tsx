import React from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, SearchIcon, NavigationIcon } from 'lucide-react';

interface DocumentationHeaderProps {
    toggleSidebar: () => void;
}

const DocumentationHeader: React.FC<DocumentationHeaderProps> = ({ toggleSidebar }) => {
    return (
        <div className="sticky top-20 z-30 py-3 px-4 sm:px-6 lg:px-8 bg-[rgba(10,12,20,0.8)] backdrop-blur-md border-b border-indigo-900/30 shadow-sm shadow-indigo-900/20">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        className="mr-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-indigo-500/20 lg:hidden transition-colors"
                        onClick={toggleSidebar}
                        aria-label="Toggle menu"
                    >
                        <MenuIcon size={20} />
                    </button>

                    <h1 className="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent hidden sm:block">
                        Supmap Documentation
                    </h1>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchIcon size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="search"
                            className="py-2 pl-10 pr-4 bg-[rgba(20,24,35,0.8)] border border-indigo-900/30 rounded-lg text-sm text-white w-64 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-500"
                            placeholder="Search documentation..."
                        />
                    </div>

                    <Link
                        to="/navigation"
                        className="inline-flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg
                                   bg-indigo-600 hover:bg-indigo-700 text-white transition-colors
                                   shadow-sm shadow-indigo-900/30"
                    >
                        <NavigationIcon size={16} className="mr-2" />
                        <span>Try Supmap</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DocumentationHeader;