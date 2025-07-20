import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productBg, productHero } from "../assets/images";
import {
    Blovac,
    Horisan,
    IHI,
    NOP,
    SMK,
    SUTO,
    Teral,
    Trident,
} from "../assets/brands";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../sass/pages/Product/Product.css";
import ProductCard from "../components/ProductCard";
import { products } from "../utils/data/productData";
import Form from "../components/Form";
import { call } from "../assets/icons";
import { useLanguage } from "../hooks/useLanguage";

export default function Product() {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeBrand, setActiveBrand] = useState("all");
    const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
    const productSectionRef = useRef(null);

    const brandLogos = [
        { id: "blovac", name: "Blovac", logo: Blovac },
        { id: "horisan", name: "Horisan", logo: Horisan },
        { id: "ihi", name: "IHI", logo: IHI },
        { id: "nop", name: "NOP", logo: NOP },
        { id: "smk", name: "SMK", logo: SMK },
        { id: "suto", name: "SUTO", logo: SUTO },
        { id: "teral", name: "Teral", logo: Teral },
        { id: "trident", name: "Trident", logo: Trident },
    ];

    // Auto slide brands every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBrandIndex((prevIndex) =>
                prevIndex >= brandLogos.length - 5 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [brandLogos.length]);

    // Sample product categories
    const productCategories = [
        { id: "all", name: t("products.categories.all") },
        { id: "compressor", name: t("products.categories.compressor") },
        { id: "air-dryer", name: t("products.categories.airDryer") },
        { id: "impact-tools", name: t("products.categories.impactTools") },
        { id: "oil-pump", name: t("products.categories.oilPump") },
        {
            id: "industrial-vacuum",
            name: t("products.categories.industrialVacuum"),
        },
    ];

    // Filter products based on category and brand
    const filteredProducts = products.filter((product) => {
        const categoryMatch =
            activeCategory === "all" || product.category === activeCategory;
        const brandMatch =
            activeBrand === "all" || product.brand === activeBrand;
        return categoryMatch && brandMatch;
    });

    // Get visible brands for carousel
    const getVisibleBrands = () => {
        const visible = [];
        for (let i = 0; i < 5; i++) {
            const index = (currentBrandIndex + i) % brandLogos.length;
            visible.push(brandLogos[index]);
        }
        return visible;
    };

    // Handle category change with scroll to product section
    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        scrollToProductSection();
    };

    // Handle brand selection
    const handleBrandClick = (brandId) => {
        setActiveBrand(brandId);
        scrollToProductSection();
    };

    // Handle brand navigation
    const handlePrevBrand = () => {
        setCurrentBrandIndex((prevIndex) =>
            prevIndex <= 0 ? brandLogos.length - 5 : prevIndex - 1
        );
    };

    const handleNextBrand = () => {
        setCurrentBrandIndex((prevIndex) =>
            prevIndex >= brandLogos.length - 5 ? 0 : prevIndex + 1
        );
    };

    // Scroll to product section
    const scrollToProductSection = () => {
        setTimeout(() => {
            if (productSectionRef.current) {
                const navbarHeight = 80;
                const elementPosition = productSectionRef.current.offsetTop;
                const offsetPosition = elementPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        }, 100);
    };

    // Get dynamic category title
    const getCategoryTitle = () => {
        if (activeCategory === "all" && activeBrand === "all") {
            return t("products.catalog.allProducts");
        }
        if (activeCategory !== "all" && activeBrand === "all") {
            return productCategories.find((cat) => cat.id === activeCategory)
                ?.name;
        }
        if (activeCategory === "all" && activeBrand !== "all") {
            const brandName = brandLogos.find(
                (brand) => brand.id === activeBrand
            )?.name;
            return t("products.catalog.brandProducts", { brandName });
        }
        if (activeCategory !== "all" && activeBrand !== "all") {
            const brandName = brandLogos.find(
                (brand) => brand.id === activeBrand
            )?.name;
            const categoryName = productCategories.find(
                (cat) => cat.id === activeCategory
            )?.name;
            return `${brandName} - ${categoryName}`;
        }
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.3,
            },
        },
    };

    const cardAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" },
        },
    };

    const slideAnimation = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
        exit: {
            opacity: 0,
            x: -50,
            transition: { duration: 0.3, ease: "easeIn" },
        },
    };

    return (
        <div className="product-page">
            {/* Hero Section */}
            <motion.section
                className="hero-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="hero-background">
                    <img
                        src={productBg}
                        alt={t("products.hero.backgroundAlt")}
                        className="hero-bg-image"
                    />
                    <div className="hero-overlay"></div>
                </div>

                <div className="hero-content">
                    <motion.div
                        className="hero-container"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="hero-image-wrapper-product"
                            variants={fadeInUp}
                        >
                            <img
                                src={productHero}
                                alt={t("products.hero.imageAlt")}
                                className="hero-image"
                            />
                        </motion.div>

                        <motion.div
                            className="hero-text-wrapper"
                            variants={fadeInUp}
                        >
                            <h1 className="hero-title">
                                {t("products.hero.title.part1")}
                                <span className="highlight">
                                    {" "}
                                    {t("products.hero.title.highlight")}{" "}
                                </span>
                                {t("products.hero.title.part2")}
                            </h1>
                            <p className="hero-description-product">
                                {t("products.hero.description")}
                            </p>
                            <div className="hero-buttons">
                                <motion.button
                                    className="btn-primary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        const targetElement =
                                            document.getElementById("product");
                                        targetElement?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }}
                                >
                                    {t("products.hero.buttons.viewProducts")}
                                </motion.button>
                                <motion.button
                                    className="btn-secondary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        const targetElement =
                                            document.getElementById("catalog");
                                        targetElement?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }}
                                >
                                    {t("products.hero.buttons.getCatalog")}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Brand Carousel Section */}
            <motion.section
                className="brand-carousel-section"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                id="product"
            >
                <div className="brand-carousel-container">
                    <div className="brand-carousel-wrapper">
                        <motion.button
                            className="brand-nav-button prev"
                            onClick={handlePrevBrand}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={t("products.brandCarousel.prevButton")}
                        >
                            <ChevronLeft size={24} />
                        </motion.button>

                        <div className="brand-carousel">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentBrandIndex}
                                    className="brand-logos-container"
                                    variants={slideAnimation}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {getVisibleBrands().map((brand, index) => (
                                        <motion.div
                                            key={`${brand.id}-${currentBrandIndex}-${index}`}
                                            className={`brand-logo-item ${
                                                activeBrand === brand.id
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleBrandClick(brand.id)
                                            }
                                            whileHover={{
                                                scale: 1.1,
                                                y: -5,
                                                transition: { duration: 0.2 },
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <img
                                                src={brand.logo}
                                                alt={brand.name}
                                                className="brand-logo"
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <motion.button
                            className="brand-nav-button next"
                            onClick={handleNextBrand}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={t("products.brandCarousel.nextButton")}
                        >
                            <ChevronRight size={24} />
                        </motion.button>
                    </div>
                </div>
            </motion.section>

            {/* Product Catalog Section */}
            <motion.section
                className="catalog-section"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                ref={productSectionRef}
            >
                <div className="catalog-container">
                    {/* Sidebar Categories */}
                    <motion.div
                        className="sidebar-categories"
                        variants={fadeInUp}
                    >
                        <h3 className="sidebar-title">
                            {t("products.sidebar.categories")}
                        </h3>
                        <div className="category-list">
                            {productCategories.map((category) => (
                                <motion.button
                                    key={category.id}
                                    className={`category-item ${
                                        activeCategory === category.id
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleCategoryChange(category.id)
                                    }
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {category.name}
                                </motion.button>
                            ))}
                        </div>

                        <h3 className="sidebar-title brand-title">
                            {t("products.sidebar.brands")}
                        </h3>
                        <div className="brand-list">
                            <motion.button
                                className={`brand-item ${
                                    activeBrand === "all" ? "active" : ""
                                }`}
                                onClick={() => handleBrandClick("all")}
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t("products.sidebar.allBrands")}
                            </motion.button>
                            {brandLogos.map((brand) => (
                                <motion.button
                                    key={brand.id}
                                    className={`brand-item ${
                                        activeBrand === brand.id ? "active" : ""
                                    }`}
                                    onClick={() => handleBrandClick(brand.id)}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {brand.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Grid */}
                    <div className="product-content-area">
                        <motion.div
                            className="category-header"
                            variants={fadeInUp}
                        >
                            <h2 className="category-title">
                                {getCategoryTitle()}
                            </h2>
                            {(activeCategory !== "all" ||
                                activeBrand !== "all") && (
                                <p className="filter-info">
                                    {t("products.catalog.showingResults", {
                                        count: filteredProducts.length,
                                    })}
                                </p>
                            )}
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeCategory}-${activeBrand}`}
                                className="product-grid"
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product, index) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            variants={cardAnimation}
                                        />
                                    ))
                                ) : (
                                    <motion.div
                                        className="no-products"
                                        variants={fadeInUp}
                                    >
                                        <p>
                                            {t("products.catalog.noProducts")}
                                        </p>
                                        <motion.button
                                            className="reset-filter-btn"
                                            onClick={() => {
                                                setActiveCategory("all");
                                                setActiveBrand("all");
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {t("products.catalog.resetFilter")}
                                        </motion.button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.section>

            <section className="catalog-form" id="catalog">
                <h3 className="catalog-form-title">
                    {t("products.catalogForm.title.part1")}{" "}
                    <span className="highlight">
                        {t("products.catalogForm.title.highlight")}
                    </span>
                </h3>
                <Form type="catalog" />
            </section>
        </div>
    );
}
