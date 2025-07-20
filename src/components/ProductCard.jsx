import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { generateSlug, getBrandName } from "../utils/productUtils";
import "../sass/components/ProductCard/ProductCard.css";

const ProductCard = ({ product, index, variants }) => {
    const { t, currentLanguage } = useLanguage();
    const navigate = useNavigate();

    // Handle detail button click
    const handleDetailClick = () => {
        // Jika product sudah memiliki slug, gunakan itu
        const slug = product.slug || generateSlug(product.brand, product.title);
        navigate(`/product/${slug}`);
    };

    // Handle card click (optional - jika ingin seluruh card bisa diklik)
    const handleCardClick = () => {
        const slug = product.slug || generateSlug(product.brand, product.title);
        navigate(`/product/${slug}`);
    };

    // Get translated product content
    const getTranslatedContent = () => {
        // Check if product has translations
        if (product.translations && product.translations[currentLanguage]) {
            return {
                title:
                    product.translations[currentLanguage].title ||
                    product.title,
                subtitle:
                    product.translations[currentLanguage].subtitle ||
                    product.subtitle,
            };
        }

        // Fallback to original content
        return {
            title: product.title,
            subtitle: product.subtitle,
        };
    };

    const { title, subtitle } = getTranslatedContent();

    return (
        <motion.div
            className="product-card"
            variants={variants}
            whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
            }}
            // Uncomment baris di bawah jika ingin seluruh card bisa diklik
            // onClick={handleCardClick}
            // style={{ cursor: 'pointer' }}
        >
            <div className="shimmer"></div>

            {/* Logo Brand Section */}
            <div className="product-logo">
                <img src={product.brandLogo} alt="Brand Logo" />
            </div>

            {/* Gambar Produk */}
            <div className="product-image">
                <img src={product.image} alt={title} />
            </div>

            {/* Konten Produk */}
            <div className="product-content">
                <h3>{title}</h3>
                <p>{subtitle}</p>
                <motion.button
                    className="btn-outline"
                    onClick={handleDetailClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {t("products.detail.viewDetails") ||
                        t("home.products.viewDetailBtn")}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
