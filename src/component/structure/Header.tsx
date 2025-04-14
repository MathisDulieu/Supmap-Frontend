import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext.tsx';
import {
    Navigation,
    User,
    LogIn,
    Settings,
    Download,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';

const Header: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const isActive = (path: string) => {
        if (path === '/settings' && location.pathname.startsWith('/profile')) {
            return false;
        }

        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const getTransitionDelay = (index: number): string => {
        return `transition-all duration-300 delay-[${index * 50}ms]`;
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out backdrop-blur-md ${
            scrolled ? 'h-16 bg-[rgba(10,12,20,0.95)] shadow-lg shadow-indigo-900/20' : 'h-20 bg-[rgba(10,12,20,0.7)]'
        }`}>
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -top-32 left-1/4 w-64 h-64 rounded-full bg-indigo-600/5 filter blur-3xl transition-opacity duration-1000 ${scrolled ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`absolute -right-20 top-10 w-40 h-40 rounded-full bg-purple-600/5 filter blur-3xl transition-opacity duration-1000 ${scrolled ? 'opacity-0' : 'opacity-100'}`}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
                <div className="flex items-center">
                    <Link
                        to="/"
                        className="flex items-center gap-3 font-bold text-white transition-all duration-500 hover:-translate-y-0.5 hover:scale-105 group"
                    >
                        <div className="relative w-9 h-9 flex items-center justify-center">
                            <span className="absolute w-2 h-2 bg-indigo-500 rounded-full z-10 shadow-[0_0_15px_3px_rgba(99,102,241,0.8)] animate-pulse"></span>
                            <span className="absolute w-6 h-6 border-2 border-indigo-500/60 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                            <span className="absolute w-9 h-9 border border-indigo-500/30 rounded-full animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] animation-delay-300"></span>
                            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full filter blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </div>
                        <div className="relative">
                            <span className="text-xl font-extrabold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent relative z-10">
                                Supmap
                            </span>
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
                            <span className="absolute -bottom-0.5 left-0 right-0 h-[6px] bg-gradient-to-r from-indigo-600/0 via-indigo-600/20 to-indigo-600/0 blur-sm scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
                        </div>
                    </Link>
                </div>

                <button
                    className="lg:hidden flex items-center justify-center w-10 h-10 text-white focus:outline-none z-50 relative overflow-hidden group"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="absolute inset-0 bg-indigo-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    {menuOpen ? (
                        <X className="w-6 h-6 text-white transition-all duration-500 transform rotate-90 group-hover:rotate-0" />
                    ) : (
                        <Menu className="w-6 h-6 text-white transition-all duration-500 transform group-hover:rotate-90" />
                    )}
                </button>

                <div className="hidden lg:flex lg:items-center lg:space-x-3">
                    {[
                        { path: "/navigation", icon: <Navigation />, label: "Navigate" },
                        ...(isAuthenticated
                                ? [{ path: "/profile", icon: <User />, label: "Profile" }]
                                : [{ path: "/login", icon: <LogIn />, label: "Sign in" }]
                        )
                    ].map((item, index) => (
                        <NavItem
                            key={item.path}
                            path={item.path}
                            icon={item.icon}
                            label={item.label}
                            isActive={isActive(item.path)}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                            isHovered={hoverIndex === index}
                        />
                    ))}

                    <div className="flex items-center space-x-3 ml-3">
                        <ActionButton
                            to="/settings"
                            icon={<Settings className="w-4 h-4" />}
                            label="Settings"
                        />

                        <ActionButton
                            to="/mobile/app"
                            icon={<Download className="w-4 h-4" />}
                            label="Get App"
                        />
                    </div>
                </div>

                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => setMenuOpen(false)}
                    ></div>
                )}

                <div
                    className={`
                        lg:hidden
                        fixed top-0 right-0 w-64
                        bg-[rgba(10,12,20,0.95)] backdrop-blur-xl 
                        flex flex-col justify-start p-6 pt-24 
                        shadow-xl shadow-black/20
                        transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                        z-40
                        ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
                    `}
                >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                    <div className="absolute bottom-20 right-5 w-32 h-32 rounded-full bg-indigo-600/5 filter blur-2xl"></div>

                    <ul className="flex flex-col space-y-2 w-full">
                        {[
                            { path: "/navigation", icon: <Navigation />, label: "Navigate" },
                            ...(isAuthenticated
                                    ? [{ path: "/profile", icon: <User />, label: "Profile" }]
                                    : [{ path: "/login", icon: <LogIn />, label: "Sign in" }]
                            )
                        ].map((item, index) => (
                            <MobileNavItem
                                key={item.path}
                                path={item.path}
                                icon={item.icon}
                                label={item.label}
                                isActive={isActive(item.path)}
                                className={getTransitionDelay(index)}
                            />
                        ))}
                    </ul>

                    <div className="mt-6 flex flex-col gap-3">
                        <ActionButton
                            to="/settings"
                            icon={<Settings className="w-4 h-4" />}
                            label="Settings"
                        />

                        <ActionButton
                            to="/mobile/app"
                            icon={<Download className="w-4 h-4" />}
                            label="Get App"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-200px] right-[-100px] w-64 h-64 rounded-full border border-indigo-500/10 animate-[spin_40s_linear_infinite]"></div>
                <div className="absolute bottom-[-150px] left-[10%] w-48 h-48 rounded-full border border-indigo-500/5 animate-[spin_30s_linear_infinite_reverse]"></div>
                <div className="absolute top-[20%] left-[30%] w-24 h-24 rounded-full border border-indigo-500/10 animate-[spin_20s_linear_infinite]"></div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
                <div className="absolute top-1/2 left-[10%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
                <div className="absolute top-[70%] left-[20%] w-1 h-1 rounded-full bg-indigo-400/30 animate-ping"></div>
                <div className="absolute top-[30%] left-[80%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
            </div>
        </header>
    );
};

interface NavItemProps {
    path: string;
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    className?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    isHovered?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
                                             path,
                                             icon,
                                             label,
                                             isActive,
                                             className = "",
                                             onMouseEnter,
                                             onMouseLeave,
                                             isHovered
                                         }) => {
    return (
        <div
            className={className}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Link
                to={path}
                className={`
                    text-white/90 flex items-center gap-3 py-2.5 px-4 rounded-lg 
                    transition-all duration-300 
                    hover:bg-indigo-500/15 hover:text-white
                    relative overflow-hidden group
                    ${isActive ? 'text-white bg-indigo-500/20' : ''}
                    text-sm
                `}
            >
                <div className={`
                    relative w-5 h-5 transition-all duration-300 
                    ${isActive ? 'text-indigo-400' : ''} 
                    group-hover:scale-110 group-hover:-translate-y-0.5
                `}>
                    {icon}
                    {(isActive || isHovered) && (
                        <span className="absolute inset-0 bg-indigo-500/20 rounded-full filter blur-sm -z-10 animate-pulse"></span>
                    )}
                </div>

                <span className="relative font-medium">
                    {label}
                    {(isActive || isHovered) && (
                        <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-indigo-500/40"></span>
                    )}
                </span>

                {isActive && (
                    <ChevronRight className="ml-auto w-4 h-4 text-indigo-400/60" />
                )}

                <span className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 
                    bg-gradient-to-r from-transparent via-indigo-500 to-transparent
                    transition-all duration-500 opacity-0 scale-x-0 
                    ${isActive ? 'opacity-100 scale-x-100' : ''} 
                    group-hover:opacity-100 group-hover:scale-x-100
                `}></span>

                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
        </div>
    );
};

const MobileNavItem: React.FC<NavItemProps & { className?: string }> = ({
                                                                            path,
                                                                            icon,
                                                                            label,
                                                                            isActive,
                                                                            className = ""
                                                                        }) => {
    return (
        <li className={`${className} animate-fadeIn opacity-100`}>
            <Link
                to={path}
                className={`
                    text-white flex items-center gap-3 py-3 px-4 rounded-lg 
                    transition-all duration-300 
                    hover:bg-indigo-500/15 
                    relative overflow-hidden group
                    ${isActive ? 'text-white bg-indigo-500/20' : ''}
                    w-full
                `}
            >
                <div className={`
                    relative w-5 h-5 transition-all duration-300 
                    ${isActive ? 'text-indigo-400' : ''} 
                    group-hover:scale-110 group-hover:-translate-y-0.5
                `}>
                    {icon}
                    {isActive && (
                        <span className="absolute inset-0 bg-indigo-500/20 rounded-full filter blur-sm -z-10 animate-pulse"></span>
                    )}
                </div>

                <span className="relative font-medium">
                    {label}
                    {isActive && (
                        <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-indigo-500/40"></span>
                    )}
                </span>

                {isActive && (
                    <ChevronRight className="ml-auto w-4 h-4 text-indigo-400/60" />
                )}

                <span className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 
                    bg-gradient-to-r from-transparent via-indigo-500 to-transparent
                    transition-all duration-300 opacity-0 scale-x-0 
                    ${isActive ? 'opacity-100 scale-x-100' : ''} 
                    group-hover:opacity-100 group-hover:scale-x-100
                `}></span>
            </Link>
        </li>
    );
};

interface ActionButtonProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ to, icon, label, className = "" }) => {
    return (
        <Link
            to={to}
            className={`
                ${className}
                flex items-center justify-center gap-2 rounded-lg
                bg-gradient-to-r from-indigo-600 to-indigo-500 text-white
                font-semibold py-2.5 px-5 text-sm 
                shadow-lg shadow-indigo-600/20
                hover:shadow-xl hover:shadow-indigo-600/30
                active:translate-y-0 active:shadow-md
                transition-all duration-300 overflow-hidden relative
                border border-indigo-400/20
                group
            `}
        >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="relative z-10 flex items-center gap-2">
                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {icon}
                </div>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">{label}</span>
            </div>
        </Link>
    );
};

export default Header;