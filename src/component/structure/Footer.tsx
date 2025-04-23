import React from 'react';
import { Link } from 'react-router-dom';
import {
    MailIcon,
    PhoneIcon,
    HelpCircleIcon,
    FileTextIcon,
    ShieldIcon,
    RocketIcon,
    NavigationIcon,
    BookOpenIcon,
    InfoIcon,
    HomeIcon,
    GithubIcon,
    TwitterIcon,
    LinkedinIcon,
    InstagramIcon
} from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[rgba(10,12,20,0.97)] text-white pt-10 overflow-hidden mt-auto">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-[-200px] right-[-100px] w-64 h-64 rounded-full border border-indigo-500/10 animate-[spin_60s_linear_infinite_reverse]"></div>
                <div className="absolute top-[-150px] left-[10%] w-48 h-48 rounded-full border border-indigo-500/5 animate-[spin_40s_linear_infinite]"></div>
                <div className="absolute top-[50%] left-[70%] w-32 h-32 rounded-full border border-indigo-500/10 animate-[spin_30s_linear_infinite_reverse]"></div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
                <div className="absolute bottom-[30%] left-[20%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
                <div className="absolute bottom-[40%] right-[30%] w-1 h-1 rounded-full bg-indigo-400/30 animate-ping"></div>
                <div className="absolute bottom-[20%] left-[80%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>

            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-indigo-900/30">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative w-8 h-8 flex items-center justify-center">
                                <span className="absolute w-2 h-2 bg-indigo-500 rounded-full z-10 shadow-[0_0_15px_3px_rgba(99,102,241,0.8)]"></span>
                                <span className="absolute w-5 h-5 border-2 border-indigo-500/60 rounded-full"></span>
                                <span className="absolute w-8 h-8 border border-indigo-500/30 rounded-full"></span>
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                                Supmap
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Explore the future of navigation with Supmap. Our advanced technology helps you discover the world in a whole new way.
                        </p>
                        <div className="flex space-x-3">
                            <SocialLink href="https://github.com/MathisDulieu?tab=repositories" icon={<GithubIcon size={18} />} label="Github" />
                            <SocialLink href="https://twitter.com" icon={<TwitterIcon size={18} />} label="Twitter" />
                            <SocialLink href="https://www.linkedin.com/in/mathis-dulieu/" icon={<LinkedinIcon size={18} />} label="LinkedIn" />
                            <SocialLink href="https://instagram.com" icon={<InstagramIcon size={18} />} label="Instagram" />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-2">
                            <FooterLink to="/" icon={<HomeIcon size={16} />} label="Home" />
                            <FooterLink to="/navigation" icon={<NavigationIcon size={16} />} label="Navigate" />
                            <FooterLink to="/about" icon={<InfoIcon size={16} />} label="About Us" />
                            <FooterLink to="/documentation" icon={<BookOpenIcon size={16} />} label="Documentation" />
                            <FooterLink to="/support" icon={<HelpCircleIcon size={16} />} label="Support" />
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Legal</h3>
                        <ul className="space-y-2">
                            <FooterLink to="/terms-of-use" icon={<FileTextIcon size={16} />} label="Terms of Use" />
                            <FooterLink to="/privacy-policy" icon={<ShieldIcon size={16} />} label="Privacy Policy" />
                            <FooterLink to="/cookies-policy" icon={<FileTextIcon size={16} />} label="Cookies Policy" />
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-3">Subscribe to our newsletter to receive our latest updates</p>
                        <form className="flex flex-col space-y-2">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="py-2 px-4 pr-10 w-full bg-indigo-900/30 border border-indigo-800/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 placeholder-gray-500"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1 top-1 bottom-1 px-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                                >
                                    <RocketIcon size={16} />
                                </button>
                            </div>
                        </form>
                        <div className="mt-4">
                            <ContactItem
                                icon={<MailIcon size={16} />}
                                label="supmap.application@gmail.com"
                                href="mailto:supmap.application@gmail.com"
                            />
                            <ContactItem
                                icon={<PhoneIcon size={16} />}
                                label="0614129625"
                                href="tel:+33614129625"
                            />
                        </div>
                    </div>
                </div>

                <div className="py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <div className="mb-4 md:mb-0">
                        &copy; {currentYear} Supmap. All rights reserved.
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/terms-of-use" className="hover:text-indigo-400 transition-colors duration-300">Terms</Link>
                        <Link to="/privacy-policy" className="hover:text-indigo-400 transition-colors duration-300">Privacy</Link>
                        <Link to="/cookies-policy" className="hover:text-indigo-400 transition-colors duration-300">Cookies</Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
        </footer>
    );
};

interface FooterLinkProps {
    to: string;
    label: string;
    icon: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label, icon }) => {
    return (
        <li>
            <Link
                to={to}
                className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors duration-300 group"
            >
                <span className="text-indigo-500/70 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">{icon}</span>
                <span>{label}</span>
            </Link>
        </li>
    );
};

interface SocialLinkProps {
    href: string;
    label: string;
    icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label, icon }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-900/50 text-indigo-400 hover:bg-indigo-800 hover:text-white transition-all duration-300 border border-indigo-800/30 group"
            aria-label={label}
        >
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">{icon}</div>
        </a>
    );
};

interface ContactItemProps {
    icon: React.ReactNode;
    label: string;
    href: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, href }) => {
    return (
        <a
            href={href}
            className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 text-sm mt-1 transition-colors duration-300 group"
        >
            <span className="text-indigo-500/70 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300">{icon}</span>
            <span>{label}</span>
        </a>
    );
};

export default Footer;