import React, { useState, useEffect } from "react";
import { Search, X, Globe, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "../sass/components/Navbar/Navbar.css";
import { LogoPrimary, LogoWhite } from "../assets/images";
import { languages } from "../utils/constants/navbar";
import { en, id } from "../assets/icons";
import { useLanguage } from "../hooks/useLanguage";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentLanguage, changeLanguage, t } = useLanguage();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Navigation items using translations
    const navItems = [
        { name: t("nav.home"), path: "/" },
        { name: t("nav.about"), path: "/about" },
        { name: t("nav.products"), path: "/products" },
        // { name: t("nav.services"), path: "/service" },
        { name: t("nav.contact"), path: "/contact" },
        // { name: t("nav.blog"), path: "/blog" },
    ];

    // Check if current route is product detail
    const isProductDetailRoute = location.pathname.startsWith("/product/");

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight * 6;
            setIsScrolled(window.scrollY > heroHeight * 0.1);
        };

        // If on product detail route, force isScrolled to true
        if (isProductDetailRoute) {
            setIsScrolled(true);
        } else {
            // Only add scroll listener for other routes
            window.addEventListener("scroll", handleScroll);
            // Set initial scroll state
            handleScroll();
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isProductDetailRoute]);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Close language dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".navbar__language")) {
                setIsLangDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };

    const handleSearchClose = () => {
        setIsSearchOpen(false);
        setSearchQuery("");
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to search results page or perform search
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            handleSearchClose();
        }
    };

    const handleLanguageChange = (langCode) => {
        changeLanguage(langCode);
        setIsLangDropdownOpen(false);
    };

    const handleNavClick = (path) => {
        navigate(path);
    };

    // Check if current route is active
    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    const icons = {
        en,
        id,
    };

    const langCode = currentLanguage.toLowerCase();
    const iconSrc = icons[langCode] || en;

    return (
        <>
            <nav
                className={`navbar ${
                    isScrolled ? "navbar--scrolled" : "navbar--transparent"
                }`}
            >
                <div className="navbar__container">
                    {/* Logo - Click to go home */}
                    <div
                        className="navbar__logo"
                        onClick={() => navigate("/")}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="navbar__logo-icon">
                            <img
                                src={isScrolled ? LogoPrimary : LogoWhite}
                                alt=""
                            />
                        </div>
                        <span className="navbar__logo-text">
                            ENERKOMP PERSADA RAYA
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="navbar__nav">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                className={`navbar__nav-item ${
                                    isActiveRoute(item.path)
                                        ? "navbar__nav-item--active"
                                        : ""
                                }`}
                                onClick={() => handleNavClick(item.path)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="navbar__actions">
                        {/* Language Selector */}
                        <div className="navbar__language">
                            <button
                                className="navbar__language-toggle"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsLangDropdownOpen(!isLangDropdownOpen);
                                }}
                            >
                                <span>{currentLanguage}</span>
                                <img
                                    src={iconSrc}
                                    alt={currentLanguage}
                                    style={{ width: "16px" }}
                                />
                            </button>

                            {isLangDropdownOpen && (
                                <div className="navbar__language-dropdown">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            className={`navbar__language-option ${
                                                currentLanguage === lang.code
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleLanguageChange(lang.code)
                                            }
                                        >
                                            <img
                                                className="flag"
                                                src={lang.flag}
                                                alt={lang.name}
                                            />
                                            <span>{lang.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search */}
                        <button
                            className="navbar__search-btn"
                            onClick={handleSearchClick}
                        >
                            <Search size={20} />
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="navbar__mobile-toggle"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="navbar__mobile-menu">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                className={`navbar__mobile-item ${
                                    isActiveRoute(item.path)
                                        ? "navbar__mobile-item--active"
                                        : ""
                                }`}
                                onClick={() => handleNavClick(item.path)}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* Search Modal */}
            {isSearchOpen && (
                <div className="search-modal" onClick={handleSearchClose}>
                    <div
                        className="search-modal__content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="search-modal__close"
                            onClick={handleSearchClose}
                        >
                            <X size={24} />
                        </button>

                        <div className="search-modal__form">
                            <div className="search-modal__input-wrapper">
                                <Search
                                    size={24}
                                    className="search-modal__input-icon"
                                />
                                <input
                                    type="text"
                                    placeholder={t("search.placeholder")}
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    onKeyPress={(e) =>
                                        e.key === "Enter" &&
                                        handleSearchSubmit(e)
                                    }
                                    className="search-modal__input"
                                    autoFocus
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
