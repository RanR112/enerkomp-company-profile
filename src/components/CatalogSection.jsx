// src/components/CatalogSection.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCatalogs } from "../hooks/useCatalogs";
import { useLanguage } from "../hooks/useLanguage";
import "../sass/components/CatalogSelection/CatalogSelection.css";
import Form from "./Form";

const CatalogSection = () => {
    const { t } = useLanguage();
    const [selectedCatalog, setSelectedCatalog] = useState(null);
    const { catalogs, loading, error } = useCatalogs();

    // Handle error & loading
    if (loading) {
        return (
            <section className="catalog-section" id="catalog">
                <motion.div
                    className="loading"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    Loading catalogs...
                </motion.div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="catalog-section" id="catalog">
                <motion.div
                    className="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    Failed to load catalogs. Please try again.
                </motion.div>
            </section>
        );
    }

    // Mode 1: Daftar Katalog (Cards tanpa gambar)
    if (!selectedCatalog) {
        return (
            <section className="catalog-section" id="catalog">
                <motion.h3
                    className="catalog-form-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {t("products.catalogForm.title.part1")}{" "}
                    <span className="highlight">
                        {t("products.catalogForm.title.highlight")}
                    </span>
                </motion.h3>
                <div className="catalog-grid">
                    {catalogs.length === 0 ? (
                        <motion.p
                            className="no-catalogs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            {t("products.catalogForm.noCatalogs")}
                        </motion.p>
                    ) : (
                        catalogs.map((catalog, index) => (
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                    ease: "easeOut",
                                }}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    className="catalog-card-icon"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1 + 0.2,
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                >
                                    📋
                                </motion.div>
                                <div className="catalog-card-content">
                                    <h4 className="catalog-card-title">
                                        {catalog.name}
                                    </h4>
                                    {catalog.description && (
                                        <p className="catalog-card-desc">
                                            {catalog.description.length > 100
                                                ? catalog.description.slice(
                                                      0,
                                                      100
                                                  ) + "..."
                                                : catalog.description}
                                        </p>
                                    )}
                                    <motion.button
                                        className="catalog-card-btn"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {t("products.catalogForm.selectBtn")}
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>
        );
    }

    // Mode 2: Form (Setelah Pilih Katalog)
    return (
        <motion.section
            className="catalog-form-section"
            id="catalog-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="form-header"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <motion.button
                    type="button"
                    className="back-btn"
                    onClick={() => setSelectedCatalog(null)}
                    aria-label={t("products.catalogForm.backBtn")}
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ← {t("products.catalogForm.backBtn")}
                </motion.button>
                <h3 className="form-title">
                    {t("products.catalogForm.formTitle")}{" "}
                    <span className="highlight">"{selectedCatalog.name}"</span>
                </h3>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                {/* Kirim catalogId ke Form */}
                <Form type="catalog" catalogId={selectedCatalog.id} />
            </motion.div>
        </motion.section>
    );
};

export default CatalogSection;
