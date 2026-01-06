// src/pages/Product.jsx (REFACTORED - Backend Pagination)
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productBg, productHero } from "../assets/images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../sass/pages/Product/Product.css";
import ProductCard from "../components/ProductCard";
import CatalogSection from "../components/CatalogSelection";
import { useLanguage } from "../hooks/useLanguage";
import { useAnalytics } from "../hooks/useAnalytics";
import { useProducts } from "../hooks/useProducts";
import { useBrands } from "../hooks/useBrands";
import { useCategories } from "../hooks/useCategories";
import { useSearchParams } from "react-router-dom";

const PHOTO_URL = import.meta.env.VITE_PHOTO_URL || "";

export default function Product() {
    useAnalytics("/products", "Products");

    const { t, currentLanguage } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();
    const preferredLanguage =
        typeof window !== "undefined"
            ? localStorage.getItem("preferredLanguage") ||
              currentLanguage ||
              "ID"
            : currentLanguage || "ID";

    // ============================================================
    // 🔥 STATE: FILTER & PAGINATION
    // ============================================================
    const [activeCategory, setActiveCategory] = useState(() =>
        (searchParams.get("categories") || "all").toLowerCase()
    );

    const [activeBrand, setActiveBrand] = useState(() =>
        (searchParams.get("brands") || "all").toLowerCase()
    );

    const [currentPage, setCurrentPage] = useState(() => {
        const pageParam = searchParams.get("page");
        return pageParam ? parseInt(pageParam, 10) : 1;
    });

    const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
    const productSectionRef = useRef(null);

    // ============================================================
    // 🔥 FETCH DATA DENGAN BACKEND PAGINATION
    // ============================================================
    const productsPerPage = 9;

    // Build query params for useProducts
    const productQueryParams = useMemo(() => {
        const params = {
            page: currentPage,
            limit: productsPerPage,
        };

        // Only add filters if not "all"
        if (activeCategory !== "all") {
            params.categories = activeCategory;
        }
        if (activeBrand !== "all") {
            params.brands = activeBrand;
        }

        return params;
    }, [currentPage, activeCategory, activeBrand]);

    // Fetch products with backend pagination
    const {
        products,
        meta,
        loading: productsLoading,
        error: productsError,
    } = useProducts(productQueryParams);

    // Fetch brands & categories (keep limit 100 for filter options)
    const {
        brands,
        loading: brandsLoading,
        error: brandsError,
    } = useBrands({
        type: "PRODUCT",
        limit: 100,
    });

    const {
        categories,
        loading: categoriesLoading,
        error: categoriesError,
    } = useCategories({ limit: 100 });

    const errors = [productsError, brandsError, categoriesError].filter(
        Boolean
    );

    // ============================================================
    // 🔥 PAGINATION METADATA DARI BACKEND
    // ============================================================
    const totalPages = meta?.lastPage || 1;
    const totalProducts = meta?.total || 0;

    // Translation helper
    const pickTranslation = (entity) => {
        if (!entity) return null;
        if (entity.translation) return entity.translation;
        if (typeof entity.getTranslation === "function") {
            try {
                const fromGetter = entity.getTranslation(preferredLanguage);
                if (fromGetter) return fromGetter;
            } catch (e) {}
        }
        if (Array.isArray(entity.translations)) {
            return (
                entity.translations.find(
                    (tr) => tr.language === preferredLanguage
                ) ||
                entity.translations[0] ||
                null
            );
        }
        return null;
    };

    // Brand carousel data
    const brandLogos = useMemo(
        () =>
            (brands || []).map((brand) => {
                const brandTrans = pickTranslation(brand);
                return {
                    id: brand.id,
                    slug: brand.slug,
                    name:
                        (brandTrans &&
                            (brandTrans.name || brandTrans.metaTitle)) ||
                        brand.name ||
                        "",
                    logo: brand.logo || "",
                };
            }),
        [brands, preferredLanguage]
    );

    // Auto brand slider
    useEffect(() => {
        if (brandLogos.length <= 5) return;

        const interval = setInterval(() => {
            setCurrentBrandIndex((prevIndex) =>
                prevIndex >= brandLogos.length - 5 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [brandLogos.length]);

    // Categories list
    const productCategories = useMemo(() => {
        const base = [
            { id: "all", name: t("products.categories.all") || "Semua" },
        ];

        const mapped = (categories || []).map((cat) => {
            const catTrans = pickTranslation(cat);
            return {
                id: cat.id,
                slug: cat.slug,
                name:
                    (catTrans && (catTrans.name || catTrans.metaTitle)) ||
                    cat.name ||
                    "",
            };
        });

        return [...base, ...mapped];
    }, [categories, preferredLanguage, currentLanguage, t]);

    // ============================================================
    // 🔥 SYNC STATE DARI URL PARAMS
    // ============================================================
    useEffect(() => {
        const cat = (searchParams.get("categories") || "all").toLowerCase();
        const br = (searchParams.get("brands") || "all").toLowerCase();
        const pg = searchParams.get("page");
        const pageNum = pg ? parseInt(pg, 10) : 1;

        if (cat !== activeCategory) setActiveCategory(cat);
        if (br !== activeBrand) setActiveBrand(br);
        if (pageNum !== currentPage) setCurrentPage(pageNum);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    // ============================================================
    // 🔥 AUTO-SCROLL KE PRODUCT SAAT ADA FILTER/PAGINATION
    // ============================================================
    useEffect(() => {
        const shouldScroll = 
            activeCategory !== "all" || 
            activeBrand !== "all" || 
            currentPage > 1;

        if (shouldScroll && productSectionRef.current) {
            scrollToProductSection();
        }
    }, [activeCategory, activeBrand, currentPage]);

    // ============================================================
    // 🔥 UPDATE URL PARAMS
    // ============================================================
    const applyFiltersToParams = (category, brand, page = 1) => {
        setSearchParams(() => {
            const params = new URLSearchParams();

            if (category && category !== "all")
                params.set("categories", category);
            if (brand && brand !== "all") 
                params.set("brands", brand);
            if (page > 1)
                params.set("page", page);

            return params;
        });
    };

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        setCurrentPage(1); // Reset to page 1
        applyFiltersToParams(categoryId, activeBrand, 1);
        scrollToProductSection();
    };

    const handleBrandClick = (brandId) => {
        setActiveBrand(brandId);
        setCurrentPage(1); // Reset to page 1
        applyFiltersToParams(activeCategory, brandId, 1);
        scrollToProductSection();
    };

    // ============================================================
    // 🔥 PAGINATION HANDLERS
    // ============================================================
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        applyFiltersToParams(activeCategory, activeBrand, pageNumber);
        scrollToProductSection();
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) handlePageChange(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) handlePageChange(currentPage + 1);
    };

    // ============================================================
    // 🔥 SCROLL UTIL
    // ============================================================
    const scrollToProductSection = () => {
        setTimeout(() => {
            if (productSectionRef.current) {
                const offset = -120; // navbar height
                const elementTop =
                    productSectionRef.current.getBoundingClientRect().top +
                    window.scrollY;

                window.scrollTo({
                    top: elementTop + offset,
                    behavior: "smooth",
                });
            }
        }, 150);
    };

    // ============================================================
    // 🔥 BRAND CAROUSEL HANDLERS
    // ============================================================
    const getVisibleBrands = () => {
        if (brandLogos.length === 0) return [];
        const visibleCount = Math.min(5, brandLogos.length);
        const visible = [];
        for (let i = 0; i < visibleCount; i++) {
            const index = (currentBrandIndex + i) % brandLogos.length;
            visible.push(brandLogos[index]);
        }
        return visible;
    };

    const handlePrevBrand = () => {
        setCurrentBrandIndex((prevIndex) =>
            prevIndex <= 0 ? Math.max(0, brandLogos.length - 5) : prevIndex - 1
        );
    };

    const handleNextBrand = () => {
        setCurrentBrandIndex((prevIndex) =>
            prevIndex >= brandLogos.length - 5 ? 0 : prevIndex + 1
        );
    };

    // ============================================================
    // 🔥 CATEGORY TITLE
    // ============================================================
    const getCategoryTitle = () => {
        if (activeCategory === "all" && activeBrand === "all") {
            return t("products.catalog.allProducts") || "Semua Produk";
        }

        const brandName = brandLogos.find((b) => b.id === activeBrand)?.name;
        const categoryName = productCategories.find(
            (c) => c.id === activeCategory
        )?.name;

        if (activeCategory !== "all" && activeBrand === "all")
            return categoryName;
        if (activeCategory === "all" && activeBrand !== "all") 
            return brandName;

        return `${brandName} - ${categoryName}`;
    };

    // ============================================================
    // 🔥 ANIMATIONS
    // ============================================================
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
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
            transition: { staggerChildren: 0.1, duration: 0.3 },
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

    // ============================================================
    // 🔥 RENDER
    // ============================================================
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
                        alt="Enerkomp company catalog showcasing air compressors, dryers, and industrial equipment in Indonesia"
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
                                alt={
                                    t("products.hero.imageAlt") ||
                                    "Product Hero"
                                }
                                className="hero-image"
                            />
                        </motion.div>

                        <motion.div
                            className="hero-text-wrapper"
                            variants={fadeInUp}
                        >
                            <h1 className="hero-title">
                                {t("products.hero.title.text1")}
                                <span className="highlight">
                                    {" "}
                                    {t("products.hero.title.highlight")}{" "}
                                </span>
                                {t("products.hero.title.text2")}
                            </h1>
                            <p className="hero-description-product">
                                {t("products.hero.description")}
                            </p>
                            <div className="hero-buttons">
                                <motion.button
                                    className="btn-primary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                        document
                                            .getElementById("product")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            })
                                    }
                                >
                                    {t("products.hero.buttons.viewProducts") ||
                                        "Lihat Produk"}
                                </motion.button>
                                <motion.button
                                    className="btn-secondary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                        document
                                            .getElementById("catalog")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            })
                                    }
                                >
                                    {t("products.hero.buttons.getCatalog") ||
                                        "Dapatkan Katalog"}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Brand Carousel Section */}
            {brandLogos.length > 0 && (
                <motion.section
                    className="brand-carousel-section"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    id="product"
                >
                    <div className="brand-carousel-container">
                        <div className="brand-carousel-wrapper">
                            {brandLogos.length > 5 && (
                                <motion.button
                                    className="brand-nav-button prev"
                                    onClick={handlePrevBrand}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={
                                        t(
                                            "products.brandCarousel.prevButton"
                                        ) || "Previous"
                                    }
                                >
                                    <ChevronLeft size={24} />
                                </motion.button>
                            )}

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
                                        {getVisibleBrands().map(
                                            (brand, index) => (
                                                <motion.div
                                                    key={`${brand.id}-${currentBrandIndex}-${index}`}
                                                    className={`brand-logo-item ${
                                                        activeBrand === brand.id
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleBrandClick(
                                                            brand.id
                                                        )
                                                    }
                                                    whileHover={{
                                                        transition: {
                                                            duration: 0.2,
                                                        },
                                                    }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <img
                                                        src={`${PHOTO_URL}${brand.logo}`}
                                                        alt={brand.name}
                                                        className="brand-logo"
                                                        loading="lazy"
                                                    />
                                                </motion.div>
                                            )
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {brandLogos.length > 5 && (
                                <motion.button
                                    className="brand-nav-button next"
                                    onClick={handleNextBrand}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={
                                        t(
                                            "products.brandCarousel.nextButton"
                                        ) || "Next"
                                    }
                                >
                                    <ChevronRight size={24} />
                                </motion.button>
                            )}
                        </div>
                    </div>
                </motion.section>
            )}

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
                            {t("products.sidebar.categories") || "Kategori"}
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
                            {t("products.sidebar.brands") || "Brand"}
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
                                {t("products.sidebar.allBrands") ||
                                    "Semua Brand"}
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
                                    {t(
                                        "products.catalog.showingResults"
                                    )?.replace(
                                        "{count}",
                                        totalProducts
                                    ) ||
                                        `Menampilkan ${totalProducts} produk`}
                                </p>
                            )}
                        </motion.div>

                        {/* Loading State */}
                        {productsLoading && (
                            <div className="loading-state">
                                <div className="loading-spinner"></div>
                                <p>{t("products.loading") || "Memuat produk..."}</p>
                            </div>
                        )}

                        {/* Error State */}
                        {errors.length > 0 && !productsLoading && (
                            <div className="error-banner">
                                {errors.map((err, i) => (
                                    <p key={i}>{err}</p>
                                ))}
                                <button
                                    onClick={() => window.location.reload()}
                                >
                                    {t("products.error.retry") || "Coba Lagi"}
                                </button>
                            </div>
                        )}

                        {/* Product Grid */}
                        {!productsLoading && (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${activeCategory}-${activeBrand}-page-${currentPage}`}
                                    className="product-grid"
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                >
                                    {products.length > 0 ? (
                                        products.map((product) => (
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
                                                {t("products.catalog.noProducts") ||
                                                    "Tidak ada produk ditemukan"}
                                            </p>
                                            <motion.button
                                                className="reset-filter-btn"
                                                onClick={() => {
                                                    setActiveCategory("all");
                                                    setActiveBrand("all");
                                                    setCurrentPage(1);
                                                    applyFiltersToParams("all", "all", 1);
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {t(
                                                    "products.catalog.resetFilter"
                                                ) || "Reset Filter"}
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && !productsLoading && (
                            <motion.div
                                className="pagination"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                            >
                                <button
                                    className="pagination-btn"
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                    aria-label={
                                        t("products.pagination.previous") ||
                                        "Previous"
                                    }
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                {/* Page 1 */}
                                <motion.button
                                    className={`pagination-btn ${
                                        currentPage === 1 ? "active" : ""
                                    }`}
                                    onClick={() => handlePageChange(1)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    1
                                </motion.button>

                                {/* Left ellipsis */}
                                {currentPage > 3 && totalPages > 5 && (
                                    <span className="pagination-ellipsis">
                                        ...
                                    </span>
                                )}

                                {/* Middle pages */}
                                {(() => {
                                    const pages = [];
                                    const start = Math.max(2, currentPage - 1);
                                    const end = Math.min(
                                        totalPages - 1,
                                        currentPage + 1
                                    );
                                    for (let i = start; i <= end; i++)
                                        pages.push(i);
                                    return pages.map((page) => (
                                        <motion.button
                                            key={page}
                                            className={`pagination-btn ${
                                                currentPage === page
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handlePageChange(page)
                                            }
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {page}
                                        </motion.button>
                                    ));
                                })()}

                                {/* Right ellipsis */}
                                {currentPage < totalPages - 2 &&
                                    totalPages > 5 && (
                                        <span className="pagination-ellipsis">
                                            ...
                                        </span>
                                    )}

                                {/* Last page */}
                                {totalPages > 1 && (
                                    <motion.button
                                        className={`pagination-btn ${
                                            currentPage === totalPages
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handlePageChange(totalPages)
                                        }
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {totalPages}
                                    </motion.button>
                                )}

                                <button
                                    className="pagination-btn"
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    aria-label={
                                        t("products.pagination.next") || "Next"
                                    }
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.section>

            <section className="catalog-form" id="catalog">
                <CatalogSection />
            </section>
        </div>
    );
}