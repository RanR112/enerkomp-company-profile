import React, { useEffect } from "react";
import "../sass/components/CatalogTab/CatalogTab.css";
import { useLanguage } from "../hooks/useLanguage";
import { useSearchParams } from "react-router-dom";

const CatalogLoader = () => {
    const { t } = useLanguage();
    const [params] = useSearchParams();
    const status = params.get("status");

    useEffect(() => {
        if (status === "emailsent") {
            // Tutup otomatis setelah 5 detik
            setTimeout(() => {
                window.close();
            }, 5000);
        }
    }, [status]);

    return (
        <div className="catalog-loader">
            {/* Background Layer */}
            <div className="catalog-loader__background">
                <div className="catalog-loader__bg-gradient"></div>

                {/* Floating Elements */}
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div
                        key={n}
                        className={`catalog-loader__floating catalog-loader__floating--${n}`}
                        style={{ animationDelay: `${n * 0.35}s` }}
                    ></div>
                ))}
            </div>

            {/* Content */}
            {status === "emailsent" ? (
                <div className="catalog-loader__content">
                    <div className="checkmark-container">
                        <svg className="checkmark" viewBox="0 0 52 52">
                            <circle
                                className="checkmark__circle"
                                cx="26"
                                cy="26"
                                r="23"
                                fill="none"
                            />
                            <path
                                className="checkmark__check"
                                fill="none"
                                d="M14 27l7 7 17-17"
                            />
                        </svg>
                    </div>
                    
                    <h1 className="catalog-loader__title">
                        {t("form.catalogTab.successTitle")}
                    </h1>

                    <p className="catalog-loader__text">
                        {t("form.catalogTab.success")}
                    </p>
                </div>
            ) : (
                <div className="catalog-loader__content">
                    <div className="catalog-loader__spinner">
                        <div className="ring"></div>
                        <div className="ring"></div>
                        <div className="ring"></div>
                    </div>

                    <h1 className="catalog-loader__title">
                        {t("form.catalogTab.title")}
                    </h1>

                    <p className="catalog-loader__text">
                        {t("form.catalogTab.loading")}
                    </p>
                </div>
            )}

            {/* Decorative shapes similar to NotFound */}
            <div className="catalog-loader__shapes">
                <div className="catalog-loader__shape catalog-loader__shape--1"></div>
                <div className="catalog-loader__shape catalog-loader__shape--2"></div>
                <div className="catalog-loader__shape catalog-loader__shape--3"></div>
                <div className="catalog-loader__shape catalog-loader__shape--4"></div>
            </div>
        </div>
    );
};

export default CatalogLoader;
