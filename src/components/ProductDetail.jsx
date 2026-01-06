// src/components/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone, Download } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useProductDetail } from "../hooks/useProductDetail"; // hook sudah refactor pakai id
import { useAnalytics } from "../hooks/useAnalytics";
import ProductCard from "./ProductCard";
import "../sass/components/ProductDetail/ProductDetail.css";
import ProductDetailSkeleton from "./ProductDetailSkeleton";

const PHOTO_URL = import.meta.env.VITE_PHOTO_URL || "";

export default function ProductDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { t, currentLanguage } = useLanguage();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Gunakan hook baru untuk fetch data dari API menggunakan id
    const { product, relatedProducts, loading, error, refetch } =
        useProductDetail();

    const getTranslatedContent = () => {
        if (!product) return {};

        if (product.translation) {
            const tr = product.translation;
            return {
                title: /*tr.metaTitle ||*/ product.name,
                subtitle: tr.shortDescription || "",
                description: tr.longDescription || "",
                specifications: tr.specifications || null,
                features: tr.features || [],
                metaTitle: tr.metaTitle || product.name,
                metaDescription: tr.metaDescription || "",
                metaKeywords: tr.metaKeywords || "",
            };
        }

        return {
            title: product.name || "Untitled",
            subtitle: "",
            description: "",
            specifications: null,
            features: [],
            metaTitle: product.name || "Product",
            metaDescription: "",
            metaKeywords: "",
        };
    };

    const {
        title,
        subtitle,
        description,
        specifications,
        features,
        metaTitle,
        metaDescription,
        metaKeywords,
    } = getTranslatedContent();

    // Update document title dan meta tags
    useEffect(() => {
        if (product && metaTitle) {
            document.title = `${metaTitle} | Enerkomp Persada Raya`;

            let metaDescTag = document.querySelector(
                'meta[name="description"]'
            );
            if (!metaDescTag) {
                metaDescTag = document.createElement("meta");
                metaDescTag.name = "description";
                document.head.appendChild(metaDescTag);
            }
            metaDescTag.content = metaDescription;

            let metaKeywordsTag = document.querySelector(
                'meta[name="keywords"]'
            );
            if (!metaKeywordsTag) {
                metaKeywordsTag = document.createElement("meta");
                metaKeywordsTag.name = "keywords";
                document.head.appendChild(metaKeywordsTag);
            }
            metaKeywordsTag.content = metaKeywords;
        }

        return () => {
            document.title = "Enerkomp Persada Raya";
        };
    }, [product, metaTitle, metaDescription, metaKeywords]);

    // Analytics
    useAnalytics(`/product/${slug}`, `Product ${title}`);

    // Reset image index saat product berubah
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [slug]);

    const getProductImages = () => {
        if (!product) return [];
        if (product.images && product.images.length > 0) {
            return product.images.map((img) => `${PHOTO_URL}${img}`);
        }
        return [];
    };

    const productImages = getProductImages();

    const nextImage = () => {
        if (productImages.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
        }
    };

    const prevImage = () => {
        if (productImages.length > 1) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? productImages.length - 1 : prev - 1
            );
        }
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };
    const slideIn = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    // if (loading) {
    //     return (
    //         <div className="product-detail-loading">
    //             <div className="loading-spinner"></div>
    //             <p>{t("products.detail.loading") || "Loading..."}</p>
    //         </div>
    //     );
    // }

    if (error || !product) {
        return <ProductDetailSkeleton />;
    }

    return (
        <div className="product-detail-page">
            {/* Breadcrumb */}
            <motion.div
                className="breadcrumb"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <span onClick={() => navigate("/")}>
                    {t("nav.home") || "Home"}
                </span>
                <span>/</span>
                <span onClick={() => navigate("/products")}>
                    {t("nav.products") || "Products"}
                </span>
                <span>/</span>
                <span>{title}</span>
            </motion.div>

            {/* Product Detail Content */}
            <motion.div
                className="product-detail-container"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                {/* Product Images */}
                <div className="product-images-section">
                    <div className="main-image-container">
                        {productImages.length > 0 && (
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={productImages[currentImageIndex]}
                                    alt={title}
                                    className="main-product-image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>
                        )}

                        {productImages.length > 1 && (
                            <>
                                <button
                                    className="image-nav-btn prev"
                                    onClick={prevImage}
                                    aria-label={
                                        t("products.detail.previousImage") ||
                                        "Previous"
                                    }
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    className="image-nav-btn next"
                                    onClick={nextImage}
                                    aria-label={
                                        t("products.detail.nextImage") || "Next"
                                    }
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {productImages.length > 1 && (
                        <div className="image-thumbnails">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    className={`thumbnail ${
                                        index === currentImageIndex
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                >
                                    <img
                                        src={image}
                                        alt={`${title} ${index + 1}`}
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <motion.div className="product-info-section" variants={slideIn}>
                    {product.brand?.logo && (
                        <div className="brand-header">
                            <img
                                src={`${PHOTO_URL}${product.brand.logo}`}
                                alt={product.brand.name}
                                className="brand-logo-detail"
                            />
                        </div>
                    )}

                    <h1 className="product-title">{title}</h1>
                    {subtitle && <p className="product-subtitle">{subtitle}</p>}

                    <div
                        className="product-description"
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    />

                    <div className="product-actions">
                        <motion.button
                            className="btn-primary contact-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/contact")}
                        >
                            <Phone size={20} />
                            {t("products.detail.contactUs") || "Hubungi Kami"}
                        </motion.button>

                        {/* Download Catalog Button */}

                        {/* <motion.button
                            className="btn-secondary download-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={20} />
                            {t("products.detail.downloadCatalog") ||
                                "Download Katalog"}
                        </motion.button> */}
                    </div>
                </motion.div>
            </motion.div>

            {/* Specifications */}
            {specifications && Object.keys(specifications).length > 0 && (
                <motion.div
                    className="product-specifications"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <h2>
                        {t("products.detail.specifications") || "Spesifikasi"}
                    </h2>
                    <div className="specs-grid">
                        {Object.entries(specifications).map(([key, value]) => (
                            <div key={key} className="spec-item">
                                <span className="spec-label">{key}:</span>
                                <span className="spec-value">{value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Features */}
            {features && features.length > 0 && (
                <motion.div
                    className="product-features"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <h2>{t("products.detail.features") || "Fitur"}</h2>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="feature-item"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="feature-icon">✓</div>
                                <span>{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <motion.div
                    className="related-products"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <h2>
                        {t("products.detail.relatedProducts") ||
                            "Produk Terkait"}
                    </h2>
                    <div className="related-products-grid">
                        {relatedProducts.map((relatedProduct) => (
                            <ProductCard
                                key={relatedProduct.id}
                                product={relatedProduct}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
