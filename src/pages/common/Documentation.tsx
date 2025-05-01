import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DocumentationSidebar from "../../component/documentation/DocumentationSidebar";
import DocumentationHeader from "../../component/documentation/DocumentationHeader";
import GettingStarted from "../../component/documentation/GettingStarted";
import NavigationGuide from "../../component/documentation/NavigationGuide";
import AlertsReporting from "../../component/documentation/AlertsReporting";
import AccountManagement from "../../component/documentation/AccountManagement";
import MobileApp from "../../component/documentation/MobileApp";
import MapRouteAnimation from "../../component/animation/MapRouteAnimation";
import {
    BookOpenIcon,
    NavigationIcon,
    AlertTriangleIcon,
    UserIcon,
    SmartphoneIcon,
} from "lucide-react";

export interface Subsection {
    id: string;
    title: string;
}

export interface Section {
    id: string;
    title: string;
    icon: React.ReactNode;
    subsections: Subsection[];
}

interface SearchItems {
    id: string;
    title: string;
    content: string;
}

const Documentation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const gettingStartedRef = useRef<HTMLDivElement>(null);
    const navigationGuideRef = useRef<HTMLDivElement>(null);
    const alertsReportingRef = useRef<HTMLDivElement>(null);
    const accountManagementRef = useRef<HTMLDivElement>(null);
    const mobileAppRef = useRef<HTMLDivElement>(null);
    const mainContentRef = useRef<HTMLDivElement>(null);
    const [searchResults, setSearchResults] = useState<SearchItems[]>([]);

    const indexDocumentationContent = () => {
        const index: SearchItems[] = [];

        sections.forEach((section) => {
            const componentRef = {
                "getting-started": gettingStartedRef,
                "navigation-guide": navigationGuideRef,
                "alerts-reporting": alertsReportingRef,
                "account-management": accountManagementRef,
                "mobile-app": mobileAppRef,
            }[section.id];

            if (componentRef && componentRef.current) {
                const content = componentRef.current.textContent || "";
                index.push({ id: section.id, title: section.title, content });
                section.subsections.forEach((subsection) => {
                    const subElement = document.getElementById(subsection.id);
                    if (subElement) {
                        index.push({
                            id: subsection.id,
                            title: subsection.title,
                            content: subElement.textContent || "",
                        });
                    }
                });
            }
        });
        return index;
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query) {
            const index = indexDocumentationContent();
            const results = index.filter(
                (item) =>
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.content.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const [activeSection, setActiveSection] =
        useState<string>("getting-started");

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
        const storedState = localStorage.getItem("sidebarState");
        return storedState ? JSON.parse(storedState) : false;
    });

    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const hash = location.hash.replace("#", "");
        if (hash) {
            const mainSection = hash.split("#")[0];
            setActiveSection(mainSection || "getting-started");

            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
    }, [location]);

    useEffect(() => {
        localStorage.setItem("sidebarState", JSON.stringify(isSidebarOpen));
    }, [isSidebarOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.getElementById("documentation-sidebar");
            if (
                isSidebarOpen &&
                sidebar &&
                !sidebar.contains(event.target as Node) &&
                window.innerWidth < 1024
            ) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isSidebarOpen) {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isSidebarOpen]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
        window.scrollTo({ top: 0, behavior: "auto" });

        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }

        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    const handleSubsectionClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        subsectionId: string
    ) => {
        event.preventDefault();

        const mainSection = subsectionId.split("#")[0];
        setActiveSection(mainSection);
        navigate(`#${subsectionId}`);

        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }

        setTimeout(() => {
            const element = document.getElementById(subsectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    const handleLinkClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        section: string
    ) => {
        event.preventDefault();

        const mainSection = section.split("#")[0];

        setActiveSection(mainSection);
        navigate(`#${section}`);

        setTimeout(() => {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);
    };

    const sections: Section[] = [
        {
            id: "getting-started",
            title: "Getting Started",
            icon: <BookOpenIcon size={18} />,
            subsections: [
                { id: "getting-started#overview", title: "Overview" },
                { id: "getting-started#installation", title: "Installation" },
                {
                    id: "getting-started#account-creation",
                    title: "Creating an Account",
                },
                { id: "getting-started#first-steps", title: "First Steps" },
            ],
        },
        {
            id: "navigation-guide",
            title: "Navigation Guide",
            icon: <NavigationIcon size={18} />,
            subsections: [
                { id: "navigation-guide#basics", title: "Navigation Basics" },
                {
                    id: "navigation-guide#planning-routes",
                    title: "Planning Routes",
                },
                {
                    id: "navigation-guide#preferences",
                    title: "Route Preferences",
                },
                { id: "navigation-guide#favorites", title: "Saving Favorites" },
            ],
        },
        {
            id: "alerts-reporting",
            title: "Alerts & Reporting",
            icon: <AlertTriangleIcon size={18} />,
            subsections: [
                { id: "alerts-reporting#receiving", title: "Receiving Alerts" },
                { id: "alerts-reporting#creating", title: "Creating Reports" },
                {
                    id: "alerts-reporting#verifying",
                    title: "Verifying Reports",
                },
                { id: "alerts-reporting#types", title: "Alert Types" },
            ],
        },
        {
            id: "account-management",
            title: "Account Management",
            icon: <UserIcon size={18} />,
            subsections: [
                { id: "account-management#profile", title: "Profile Settings" },
                { id: "account-management#privacy", title: "Privacy Controls" },
                { id: "account-management#data", title: "Data Management" },
            ],
        },
        {
            id: "mobile-app",
            title: "Mobile App",
            icon: <SmartphoneIcon size={18} />,
            subsections: [
                { id: "mobile-app#installation", title: "Installation" },
                { id: "mobile-app#sync", title: "Syncing with Web" },
                { id: "mobile-app#offline", title: "Offline Usage" },
                { id: "mobile-app#battery", title: "Battery Optimization" },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-[#0a0c15] text-white pt-20">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute opacity-10">
                    <MapRouteAnimation />
                </div>

                <div className="absolute top-[-200px] right-[-100px] w-64 h-64 rounded-full border border-indigo-500/10 animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute bottom-[-150px] left-[10%] w-48 h-48 rounded-full border border-indigo-500/5 animate-[spin_40s_linear_infinite_reverse]"></div>
                <div className="absolute top-1/4 left-[30%] w-32 h-32 rounded-full border border-indigo-500/10 animate-[spin_30s_linear_infinite]"></div>

                <div className="absolute top-1/4 left-[10%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
                <div className="absolute top-[70%] right-[20%] w-1 h-1 rounded-full bg-indigo-400/30 animate-ping"></div>
                <div className="absolute top-[30%] right-[40%] w-1 h-1 rounded-full bg-indigo-400/30 animate-pulse"></div>
            </div>

            <div className="relative flex min-h-screen">
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        onClick={toggleSidebar}
                        aria-hidden="true"
                    ></div>
                )}

                <DocumentationSidebar
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                    isOpen={isSidebarOpen}
                    handleLinkClick={handleSubsectionClick}
                />

                <div className="flex-1 w-full lg:pl-64">
                    <DocumentationHeader
                        toggleSidebar={toggleSidebar}
                        onSearch={handleSearch}
                    />

                    <div
                        ref={mainContentRef}
                        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24"
                    >
                        {searchQuery && searchResults.length > 0 && (
                            <div className="mt-8 mb-8">
                                <h3 className="text-xl font-semibold mb-2">
                                    Résultats de la recherche pour "
                                    {searchQuery}"
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {searchResults.map((result) => (
                                        <li key={result.id}>
                                            <a
                                                href={`#${result.id}`}
                                                onClick={(e) =>
                                                    handleLinkClick(
                                                        e,
                                                        result.id
                                                    )
                                                }
                                                className="text-indigo-400 hover:underline"
                                            >
                                                {result.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div
                            ref={gettingStartedRef}
                            className={
                                activeSection === "getting-started"
                                    ? "block"
                                    : "hidden"
                            }
                        >
                            <GettingStarted
                                handleLinkClick={handleLinkClick}
                                searchQuery={searchQuery}
                            />
                        </div>
                        <div
                            ref={navigationGuideRef}
                            className={
                                activeSection === "navigation-guide"
                                    ? "block"
                                    : "hidden"
                            }
                        >
                            <NavigationGuide
                                handleLinkClick={handleLinkClick}
                                searchQuery={searchQuery}
                            />
                        </div>
                        <div
                            ref={alertsReportingRef}
                            className={
                                activeSection === "alerts-reporting"
                                    ? "block"
                                    : "hidden"
                            }
                        >
                            <AlertsReporting
                                handleLinkClick={handleLinkClick}
                                searchQuery={searchQuery}
                            />
                        </div>
                        <div
                            ref={accountManagementRef}
                            className={
                                activeSection === "account-management"
                                    ? "block"
                                    : "hidden"
                            }
                        >
                            <AccountManagement
                                handleLinkClick={handleLinkClick}
                                searchQuery={searchQuery}
                            />
                        </div>
                        <div
                            ref={mobileAppRef}
                            className={
                                activeSection === "mobile-app"
                                    ? "block"
                                    : "hidden"
                            }
                        >
                            <MobileApp
                                handleLinkClick={handleLinkClick}
                                searchQuery={searchQuery}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documentation;
