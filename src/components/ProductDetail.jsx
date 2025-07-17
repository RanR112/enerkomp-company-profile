import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone, Download } from "lucide-react";
import { findProductBySlug, getRelatedProducts } from "../utils/productUtils";
import "../sass/components/ProductDetail/ProductDetail.css";

// Import images (sesuaikan dengan struktur project Anda)
import {
    turboCompressor,
    // tambahkan import gambar lainnya sesuai kebutuhan
} from "../assets/images";

import {
    Blivac,
    Horisan,
    IHI,
    NOP,
    SMK,
    SUTO,
    Teral,
    Trident,
} from "../assets/brands";
import { products } from "../utils/data/productData";
import ProductCard from "./ProductCard";

export default function ProductDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    // Function to generate slug from product name
    const generateSlug = (brandName, productTitle) => {
        return `${brandName.toLowerCase()}-${productTitle.toLowerCase()}`
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-");
    };

    // Find product by slug
    useEffect(() => {
        const foundProduct = findProductBySlug(products, slug);
        if (foundProduct) {
            setProduct(foundProduct);
            // Find related products
            const related = getRelatedProducts(products, foundProduct, 3);
            setRelatedProducts(related);
        }
        setIsLoading(false);
    }, [slug]);

    // Handle image navigation
    const nextImage = () => {
        if (product && product.images.length > 1) {
            setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
        }
    };

    const prevImage = () => {
        if (product && product.images.length > 1) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? product.images.length - 1 : prev - 1
            );
        }
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    const slideIn = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 },
        },
    };

    if (isLoading) {
        return (
            <div className="product-detail-loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Produk tidak ditemukan</h2>
                <button onClick={() => navigate("/products")}>
                    Kembali ke Produk
                </button>
            </div>
        );
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
                <span onClick={() => navigate("/")}>Home</span>
                <span>/</span>
                <span onClick={() => navigate("/products")}>Produk</span>
                <span>/</span>
                <span>{product.title}</span>
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
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={product.images[currentImageIndex]}
                                alt={product.title}
                                className="main-product-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>

                        {product.images.length > 1 && (
                            <>
                                <button
                                    className="image-nav-btn prev"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    className="image-nav-btn next"
                                    onClick={nextImage}
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Image thumbnails */}
                    {product.images.length > 1 && (
                        <div className="image-thumbnails">
                            {product.images.map((image, index) => (
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
                                        alt={`${product.title} ${index + 1}`}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <motion.div className="product-info-section" variants={slideIn}>
                    {/* Brand Logo */}
                    <div className="brand-header">
                        <img
                            src={product.brandLogo}
                            alt={product.brandName}
                            className="brand-logo-detail"
                        />
                    </div>

                    {/* Product Title */}
                    <h1 className="product-title">{product.title}</h1>
                    <p className="product-subtitle">{product.subtitle}</p>

                    {/* Product Description */}
                    <div className="product-description">
                        {product.description
                            .split("\n\n")
                            .map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="product-actions">
                        <motion.button
                            className="btn-primary contact-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Phone size={20} />
                            Hubungi Kami
                        </motion.button>

                        <motion.button
                            className="btn-secondary download-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={20} />
                            Download Katalog
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Product Specifications */}
            <motion.div
                className="product-specifications"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <h2>Spesifikasi Produk</h2>
                <div className="specs-grid">
                    {Object.entries(product.specifications).map(
                        ([key, value]) => (
                            <div key={key} className="spec-item">
                                <span className="spec-label">{key}:</span>
                                <span className="spec-value">{value}</span>
                            </div>
                        )
                    )}
                </div>
            </motion.div>

            {/* Product Features */}
            <motion.div
                className="product-features"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <h2>Fitur Unggulan</h2>
                <div className="features-grid">
                    {product.features.map((feature, index) => (
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

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <motion.div
                    className="related-products"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <h2>Produk Terkait</h2>
                    <div className="related-products-grid">
                        {relatedProducts.map((relatedProduct) => (
                            <ProductCard product={relatedProduct}/>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
