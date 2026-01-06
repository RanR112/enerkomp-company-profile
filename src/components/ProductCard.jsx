import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import "../sass/components/ProductCard/ProductCard.css";
import { useDispatch } from "react-redux";
import { setSelectedProductId } from "../store/productDetailSlice";

const PHOTO_URL = import.meta.env.VITE_PHOTO_URL || "";

const ProductCard = ({ product, variants }) => {
    const { t, currentLanguage } = useLanguage();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!product) return null;

    // // Navigasi menggunakan product.id
    // const handleDetailClick = () => {
    //     if (!product.slug) return;
    //     navigate(`/product/${product.slug}`);
    // };

    const handleCardClick = () => {
        if (!product.slug) return;
        dispatch(setSelectedProductId(product.id));
        localStorage.setItem("selectedProductId", product.id);
        navigate(`/product/${product.slug}`);
    };

    // Ambil konten terjemahan dari product.translation
    const getTranslatedContent = () => {
        const tr = product.translation;
        if (tr) {
            return {
                title: /*tr.metaTitle ||*/ product.name,
                subtitle: tr.shortDescription || "",
            };
        }

        return {
            title: product.name || "Untitled",
            subtitle: "",
        };
    };

    const { title, subtitle } = getTranslatedContent();

    // Brand logo
    const getBrandLogo = () => {
        if (product.brand?.logo) return `${PHOTO_URL}${product.brand.logo}`;
        return null;
    };

    // Product image
    const getProductImage = () => {
        if (Array.isArray(product.images) && product.images.length > 0)
            return `${PHOTO_URL}${product.images[0]}`;
        if (product.image) return `${PHOTO_URL}${product.image}`;
        return null;
    };

    const brandLogo = getBrandLogo();
    const productImage = getProductImage();

    return (
        <motion.div
            className="product-card"
            variants={variants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}
        >
            <div className="shimmer"></div>

            {/* Brand Logo */}
            {brandLogo && (
                <div className="product-logo">
                    <img
                        src={brandLogo}
                        alt={product.brand?.name || "Brand"}
                        loading="lazy"
                    />
                </div>
            )}

            {/* Product Image */}
            {productImage && (
                <div className="product-image">
                    <img src={productImage} alt={title} loading="lazy" />
                </div>
            )}

            {/* Product Content */}
            <div className="product-content">
                <h3>{title}</h3>
                {subtitle && <p>{subtitle}</p>}
                <motion.button
                    className="btn-outline"
                    // onClick={handleDetailClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {t("products.detail.viewDetails") ||
                        t("home.products.viewDetailBtn") ||
                        "View Details"}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
