import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../sass/pages/Home/Home.css";
import { aboutImages, heroImages, servicesIcon } from "../utils/constants/home";
import { aboutBanner } from "../assets/images";
import { call } from "../assets/icons";
import { useLanguage } from "../hooks/useLanguage";
import ProductCard from "../components/ProductCard"; // Import komponen baru
import { Link, NavLink } from "react-router-dom";
import { useAnalytics } from "../hooks/useAnalytics";
import { useBrands } from "../hooks/useBrands";
import { useProducts } from "../hooks/useProducts";

const Home = () => {
    useAnalytics("/", "Home");

    const { t } = useLanguage();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { brands: productBrands, loading: loadingProductBrands } = useBrands({
        type: "PRODUCT",
        limit: 100,
    });
    const { brands: clientBrands, loading: loadingClientBrands } = useBrands({
        type: "CLIENT",
        limit: 100,
    });
    const { products, loading, error } = useProducts({});

    const sortedProductBrands = useMemo(() => {
        if (!Array.isArray(productBrands)) return [];
        return [...productBrands].sort(
            (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
        );
    }, [productBrands]);

    const sortedClientsBrands = useMemo(() => {
        if (!Array.isArray(clientBrands)) return [];
        return [...clientBrands].sort(
            (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
        );
    }, [clientBrands]);

    const sortedProducts = useMemo(() => {
        if (!Array.isArray(products)) return [];
        return [...products].sort(
            (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
        );
    }, [products]);

    // Ambil hanya logo
    const brandLogos = sortedProductBrands.map((b) => ({
        logo: import.meta.env.VITE_PHOTO_URL + b.logo,
        slug: b.slug,
    }));
    const trustedBrands = sortedClientsBrands.map(
        (b) => import.meta.env.VITE_PHOTO_URL + b.logo
    );

    const featuredProducts = sortedProducts
        .filter((p) => p.isFeatured)
        .slice(0, 4);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    // Services data with translations
    const services = [
        {
            icon: servicesIcon[0],
            alt: "Original IHI air compressor spare parts with warranty",
            title: t("home.whyChoose.services.originalParts.title"),
            description: t("home.whyChoose.services.originalParts.description"),
        },
        {
            icon: servicesIcon[1],
            alt: "24 7 air compressor technical support and maintenance services",
            title: t("home.whyChoose.services.support24.title"),
            description: t("home.whyChoose.services.support24.description"),
        },
        {
            icon: servicesIcon[2],
            alt: "15 years experience in industrial air compressor solutions in Indonesia",
            title: t("home.whyChoose.services.experience.title"),
            description: t("home.whyChoose.services.experience.description"),
        },
        {
            icon: servicesIcon[3],
            alt: "Free on-site air compressor survey and consultation",
            title: t("home.whyChoose.services.freeSurvey.title"),
            description: t("home.whyChoose.services.freeSurvey.description"),
        },
        {
            icon: servicesIcon[4],
            alt: "Certified compressor engineers and technicians Enerkomp",
            title: t("home.whyChoose.services.expertTeam.title"),
            description: t("home.whyChoose.services.expertTeam.description"),
        },
        {
            icon: servicesIcon[5],
            alt: "Air compressor maintenance and repair services in Indonesia",
            title: t("home.whyChoose.services.maintenance.title"),
            description: t("home.whyChoose.services.maintenance.description"),
        },
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <motion.section
                className="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Background Image Slider */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        className="hero-background"
                        style={{
                            backgroundImage: `url(${heroImages[currentImageIndex]})`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </AnimatePresence>

                <div className="hero-overlay">
                    <div className="container">
                        <div className="hero-content-home">
                            <div className="hover-wrapper">
                                <div className="diagonal-line"></div>
                                <div className="hero-text-overlay"></div>
                                <motion.div
                                    className="hero-text"
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    <h1>
                                        {t("home.hero.title")
                                            .split(" ")
                                            .map((word, index) =>
                                                word === "Kompresi" ||
                                                word === "Compression" ? (
                                                    <span
                                                        key={index}
                                                        className="highlight"
                                                    >
                                                        {word}{" "}
                                                    </span>
                                                ) : (
                                                    word + " "
                                                )
                                            )}
                                    </h1>
                                    <p>{t("home.hero.subtitle")}</p>
                                    <div className="hero-buttons">
                                        <NavLink
                                            to={"/contact"}
                                            className="btn-layer"
                                        >
                                            <motion.button
                                                className="btn-primary"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <img src={call} alt="" />{" "}
                                                {t("home.hero.contactBtn")}
                                            </motion.button>
                                        </NavLink>
                                        <motion.button
                                            className="btn-secondary"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                const targetElement =
                                                    document.getElementById(
                                                        "brand"
                                                    );
                                                targetElement?.scrollIntoView({
                                                    behavior: "smooth",
                                                });
                                            }}
                                        >
                                            {t("home.hero.learnMoreBtn")}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Brand Logos Marquee */}
            <section className="brand-marquee" id="brand">
                <div className="marquee">
                    <div className="marquee-content">
                        {brandLogos.map(({ logo, slug }, index) => (
                            <Link key={index} to={`/products?brands=${slug}`}>
                                <div className="brand-item">
                                    <img src={logo} alt={`Brand ${index}`} />
                                </div>
                            </Link>
                        ))}

                        {/* Duplicate sekali untuk efek infinite */}
                        {brandLogos.map(({ logo, slug }, index) => (
                            <Link
                                key={`dup-${index}`}
                                to={`/products?brands=${slug}`}
                            >
                                <div className="brand-item">
                                    <img
                                        src={logo}
                                        alt={`Brand Duplicate ${index}`}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <motion.section
                className="about"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="container">
                    <div className="about-content">
                        <div className="about-primary">
                            <img src={aboutBanner} alt="" />
                        </div>
                        <div className="about-white"></div>
                        <motion.div
                            className="about-text"
                            variants={itemVariants}
                        >
                            <h2>
                                {t("home.about.title")
                                    .split(" ")
                                    .map((word, index) =>
                                        word === "Enerkomp" ? (
                                            <span
                                                key={index}
                                                className="highlight"
                                            >
                                                {word}
                                            </span>
                                        ) : (
                                            word + " "
                                        )
                                    )}
                            </h2>
                            <p>{t("home.about.description1")}</p>
                            <p>{t("home.about.description2")}</p>
                            <p>{t("home.about.description3")}</p>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                className="about-image"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeInOut",
                                }}
                            >
                                <img
                                    src={aboutImages[currentImageIndex]}
                                    alt=""
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.section>

            {/* Why Choose Section */}
            <motion.section
                className="why-choose"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="container">
                    <motion.h2 variants={itemVariants}>
                        {t("home.whyChoose.title")
                            .split(" ")
                            .map((word, index) =>
                                word === "Enerkomp" || word === "Enerkomp?" ? (
                                    <span key={index} className="highlight">
                                        {word + " "}
                                    </span>
                                ) : (
                                    word + " "
                                )
                            )}
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="why-choose-text"
                    >
                        {t("home.whyChoose.subtitle")}
                    </motion.p>

                    <motion.div
                        className="services-grid"
                        variants={containerVariants}
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="service-card-wrapper"
                                variants={itemVariants}
                                whileHover={{
                                    y: -10,
                                    transition: { duration: 0.3 },
                                }}
                            >
                                {/* Dekorasi pojok */}
                                <span className="corner top-right"></span>
                                <span className="corner bottom-left"></span>

                                {/* Card content */}
                                <div className="service-card">
                                    <div className="shimmer"></div>
                                    <div className="service-icon">
                                        {/* You'll need to import and use the actual icons here */}
                                        <img
                                            src={service.icon}
                                            alt={service.alt}
                                        />
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Products Section */}
            <motion.section
                className="products"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                // whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="container">
                    <motion.h2 variants={itemVariants}>
                        {t("home.products.title")
                            .split(" ")
                            .map((word, index) =>
                                word === "Unggulan" || word === "Featured" ? (
                                    <span key={index} className="highlight">
                                        {word + " "}
                                    </span>
                                ) : (
                                    word + " "
                                )
                            )}
                    </motion.h2>

                    <motion.div
                        className="products-grid"
                        variants={containerVariants}
                    >
                        {featuredProducts.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                                variants={itemVariants}
                            />
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section
                className="cta"
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container">
                    <div className="cta-content">
                        <h2>
                            {t("home.cta.title")
                                .split(" ")
                                .map((word, index) =>
                                    word === "Resmi" || word === "Official" ? (
                                        <span key={index} className="highlight">
                                            {word}{" "}
                                        </span>
                                    ) : (
                                        word + " "
                                    )
                                )}
                        </h2>
                        <h3>
                            {t("home.cta.subtitle")
                                .split(" ")
                                .map((word, index) =>
                                    word === "Tinggi" || word === "Quality" ? (
                                        <span key={index} className="highlight">
                                            {word + " "}
                                        </span>
                                    ) : (
                                        word + " "
                                    )
                                )}
                        </h3>
                    </div>
                </div>
            </motion.section>

            {/* Trusted Brands */}
            <motion.section
                className="trusted-brands"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="container">
                    <motion.h2 variants={itemVariants}>
                        {t("home.trustedBrands.title")
                            .split(" ")
                            .map((word, index) =>
                                word === "Enerkomp" ? (
                                    <span key={index} className="highlight">
                                        {word}
                                    </span>
                                ) : (
                                    word + " "
                                )
                            )}
                    </motion.h2>

                    <div className="brands-marquee">
                        <div className="marquee">
                            <div className="marquee-content">
                                {trustedBrands.map((logo, index) => (
                                    <div key={index} className="brand-item">
                                        <img
                                            src={logo}
                                            alt={`Brand ${index}`}
                                        />
                                    </div>
                                ))}

                                {/* Duplicate sekali untuk efek infinite */}
                                {trustedBrands.map((logo, index) => (
                                    <div
                                        key={`dup-${index}`}
                                        className="brand-item"
                                    >
                                        <img
                                            src={logo}
                                            alt={`Brand Duplicate ${index}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <motion.div
                        className="contact-section"
                        variants={itemVariants}
                    >
                        <h3>{t("home.trustedBrands.joinUs")}</h3>
                        <h4>{t("home.trustedBrands.question")}</h4>
                        <p>{t("home.trustedBrands.description")}</p>
                        <motion.button
                            className="btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <img src={call} alt="" />{" "}
                            {t("home.trustedBrands.contactNowBtn")}
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
