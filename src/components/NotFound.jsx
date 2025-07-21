import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Search, ArrowLeft, MapPin, AlertCircle } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import "../sass/components/NotFound/NotFound.css";

const NotFound = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const isAnimated = true

    const handleGoHome = () => {
        navigate("/");
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSearch = () => {
        navigate("/search");
    };

    // Floating elements animation data
    const floatingElements = [
        { id: 1, delay: 0 },
        { id: 2, delay: 0.5 },
        { id: 3, delay: 1 },
        { id: 4, delay: 1.5 },
        { id: 5, delay: 2 },
        { id: 6, delay: 2.5 },
    ];

    return (
        <div className="not-found">
            {/* Animated Background */}
            <div className="not-found__background">
                <div className="not-found__bg-gradient"></div>
                {floatingElements.map((element) => (
                    <div
                        key={element.id}
                        className={`not-found__floating-element not-found__floating-element--${element.id}`}
                        style={{ animationDelay: `${element.delay}s` }}
                    ></div>
                ))}
            </div>

            <div className="not-found__container">
                {/* Main Content */}
                <div
                    className={`not-found__content ${
                        isAnimated ? "not-found__content--animated" : ""
                    }`}
                >
                    {/* 404 Number with Animation */}
                    <div className="not-found__number-container">
                        <div className="not-found__number">
                            <span className="not-found__digit not-found__digit--1">
                                4
                            </span>
                            <div className="not-found__digit not-found__digit--0">
                                <div className="not-found__zero">
                                    <div className="not-found__zero-inner"></div>
                                </div>
                            </div>
                            <span className="not-found__digit not-found__digit--4">
                                4
                            </span>
                        </div>

                        {/* Decorative Elements */}
                        <div className="not-found__decoration">
                            <AlertCircle
                                className="not-found__alert-icon"
                                size={24}
                            />
                            <div className="not-found__pulse-ring"></div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="not-found__text">
                        <h1 className="not-found__title">
                            {t("notFound.title") || "Oops! Page Not Found"}
                        </h1>
                        <p className="not-found__description">
                            {t("notFound.description") ||
                                "The page you're looking for seems to have wandered off into the digital wilderness. Don't worry, it happens to the best of us!"}
                        </p>

                        {/* Additional Info */}
                        <div className="not-found__info">
                            <div className="not-found__info-item">
                                <MapPin size={16} />
                                <span>
                                    {t("notFound.currentPath") ||
                                        "Current path:"}{" "}
                                    {window.location.pathname}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="not-found__actions">
                        <button
                            className="not-found__btn not-found__btn--primary"
                            onClick={handleGoHome}
                        >
                            <Home size={18} />
                            <span>{t("notFound.goHome") || "Go Home"}</span>
                        </button>

                        <button
                            className="not-found__btn not-found__btn--secondary"
                            onClick={handleGoBack}
                        >
                            <ArrowLeft size={18} />
                            <span>{t("notFound.goBack") || "Go Back"}</span>
                        </button>

                        <button
                            className="not-found__btn not-found__btn--tertiary"
                            onClick={handleSearch}
                        >
                            <Search size={18} />
                            <span>{t("notFound.search") || "Search"}</span>
                        </button>
                    </div>
                </div>

                {/* Help Section */}
                <div className="not-found__help">
                    <h3>{t("notFound.help.title") || "Need Help?"}</h3>
                    <div className="not-found__help-links">
                        <a href="/" className="not-found__help-link">
                            {t("notFound.help.home") || "Home Page"}
                        </a>
                        <a href="/about" className="not-found__help-link">
                            {t("notFound.help.about") || "About Us"}
                        </a>
                        <a href="/contact" className="not-found__help-link">
                            {t("notFound.help.contact") || "Contact Support"}
                        </a>
                        <a href="/products" className="not-found__help-link">
                            {t("notFound.help.products") || "Our Products"}
                        </a>
                    </div>
                </div>
            </div>

            {/* Decorative Shapes */}
            <div className="not-found__shapes">
                <div className="not-found__shape not-found__shape--1"></div>
                <div className="not-found__shape not-found__shape--2"></div>
                <div className="not-found__shape not-found__shape--3"></div>
                <div className="not-found__shape not-found__shape--4"></div>
            </div>
        </div>
    );
};

export default NotFound;
