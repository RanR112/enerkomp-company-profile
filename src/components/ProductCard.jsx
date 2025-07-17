import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { generateSlug, getBrandName } from "../utils/productUtils";
import "../sass/components/ProductCard/ProductCard.css";

const ProductCard = ({ product, index, variants }) => {
    const { t } = useLanguage();
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
                <img src={product.image} alt={product.title} />
            </div>

            {/* Konten Produk */}
            <div className="product-content">
                <h3>{product.title}</h3>
                <p>{product.subtitle}</p>
                <motion.button
                    className="btn-outline"
                    onClick={handleDetailClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {t("home.products.viewDetailBtn")}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
