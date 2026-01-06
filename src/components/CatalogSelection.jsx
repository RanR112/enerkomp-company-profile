// src/components/CatalogSection.js
import React, { useState } from "react";
import { useCatalogs } from "../hooks/useCatalogs";
import { useLanguage } from "../hooks/useLanguage";
import { motion, AnimatePresence } from "framer-motion";
import "../sass/components/CatalogSelection/CatalogSelection.css";
import Form from "./Form";

const CatalogSection = () => {
    const [selectedCatalog, setSelectedCatalog] = useState(null);
    const { t } = useLanguage();
    const { catalogs, loading, error } = useCatalogs({
        limit: 100,
        includeDeleted: false,
    });

    if (loading)
        return (
            <div className="catalog-section">
                <p>Loading catalogs...</p>
            </div>
        );

    if (error)
        return (
            <div className="catalog-section">
                <p className="error">{error}</p>
            </div>
        );

    return (
        <AnimatePresence mode="wait">
            {!selectedCatalog ? (
                // =================== LIST KATALOG ===================
                <motion.section
                    key="catalog-list"
                    className="catalog-section"
                    id="catalog"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="catalog-form-title">
                        {t("products.catalogForm.title.part1")}{" "}
                        <span className="highlight">
                            {t("products.catalogForm.title.highlight")}
                        </span>
                    </h3>

                    <motion.div
                        className="catalog-grid"
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.08,
                                },
                            },
                        }}
                    >
                        {catalogs.map((catalog) => (
                            <motion.div
                                key={catalog.id}
                                className="catalog-card"
                                onClick={() => setSelectedCatalog(catalog)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) =>
                                    e.key === "Enter" &&
                                    setSelectedCatalog(catalog)
                                }
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 },
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <div className="catalog-card-content">
                                    <h4 className="catalog-card-title">
                                        {catalog.name}
                                    </h4>

                                    {/* {catalog.description && (
                                        <p className="catalog-card-desc">
                                            {catalog.description}
                                        </p>
                                    )} */}

                                    <button className="catalog-card-btn">
                                        {t("products.catalogForm.selectBtn")}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>
            ) : (
                // =================== FORM ===================
                <motion.section
                    key="catalog-form"
                    className="catalog-form-section"
                    id="catalog-form"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="form-header">
                        <button
                            type="button"
                            className="back-btn"
                            onClick={() => setSelectedCatalog(null)}
                            aria-label={t("products.catalogForm.backBtn")}
                        >
                            ← {t("products.catalogForm.backBtn")}
                        </button>

                        <h3 className="form-title">
                            {t("products.catalogForm.formTitle")}{" "}
                            <span className="highlight">
                                "{selectedCatalog.name}"
                            </span>
                        </h3>
                    </div>

                    <Form type="catalog" catalogId={selectedCatalog.id} />
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default CatalogSection;
