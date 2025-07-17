import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";
import "../sass/pages/About/About.css";
import {
    aboutBanner,
    aboutBg,
    aboutHero,
    Banner1,
    Banner2,
    Banner3,
    valuesBg,
} from "../assets/images";
import { graduate, idea, lock, teamwork } from "../assets/icons";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const About = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("HISTORY");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previewIndex, setPreviewIndex] = useState(null);

    const images = [Banner1, Banner2, Banner3, aboutBanner, valuesBg, aboutBg];
    const itemsPerPage = 3;
    const maxIndex = images.length - itemsPerPage;

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    // Prevent body scroll when preview is open
    useEffect(() => {
        if (previewIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [previewIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    };

    const openPreview = (index) => {
        setPreviewIndex(index);
    };

    const closePreview = () => {
        setPreviewIndex(null);
    };

    const nextPreview = () => {
        setPreviewIndex((prev) => (prev + 1) % images.length);
    };

    const prevPreview = () => {
        setPreviewIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const tabs = [
        { id: "HISTORY", label: t("about.tabs.history") },
        { id: "VISION_MISSION", label: t("about.tabs.visionMission") },
        { id: "MAJOR_FACTOR", label: t("about.tabs.majorFactor") },
        { id: "PROBLEM", label: t("about.tabs.problem") },
        { id: "SOLUTION", label: t("about.tabs.solution") },
    ];

    // Balanced Animation variants - smooth but not heavy
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

    const fadeInLeft = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: "easeOut" },
        },
    };

    const tabAnimation = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2, ease: "easeIn" },
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

    const cardHover = {
        rest: { scale: 1, y: 0 },
        hover: {
            scale: 1.03,
            y: -5,
            transition: { duration: 0.2, ease: "easeOut" },
        },
    };

    const iconSpin = {
        rest: { rotate: 0 },
        hover: {
            rotate: 5,
            transition: { duration: 0.2, ease: "easeOut" },
        },
    };

    const values = [
        {
            icon: lock,
            title: t("about.values.items.0.title"),
            description: t("about.values.items.0.description"),
        },
        {
            icon: idea,
            title: t("about.values.items.1.title"),
            description: t("about.values.items.1.description"),
        },
        {
            icon: graduate,
            title: t("about.values.items.2.title"),
            description: t("about.values.items.2.description"),
        },
        {
            icon: teamwork,
            title: t("about.values.items.3.title"),
            description: t("about.values.items.3.description"),
        },
    ];

    const getTabContent = () => {
        switch (activeTab) {
            case "HISTORY":
                return (
                    <motion.div
                        className="content-section"
                        key="history"
                        variants={tabAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="section-header"
                            variants={fadeInUp}
                        >
                            <motion.p className="tagline" variants={fadeInLeft}>
                                {t("about.content.history.tagline")}
                            </motion.p>
                            <motion.h2
                                className="section-title"
                                variants={fadeInRight}
                            >
                                <span className="highlight">
                                    {
                                        t("about.content.history.title").split(
                                            " "
                                        )[0]
                                    }
                                </span>{" "}
                                {t("about.content.history.title")
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")}
                            </motion.h2>
                        </motion.div>
                        <motion.div
                            className="content-text"
                            variants={staggerContainer}
                        >
                            {t("about.content.history.paragraphs").map(
                                (paragraph, index) => (
                                    <motion.p key={index} variants={fadeInUp}>
                                        {paragraph}
                                    </motion.p>
                                )
                            )}
                        </motion.div>
                    </motion.div>
                );
            case "VISION_MISSION":
                return (
                    <motion.div
                        className="content-section"
                        key="vision-mission"
                        variants={tabAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="section-header"
                            variants={fadeInUp}
                        >
                            <motion.p className="tagline" variants={fadeInLeft}>
                                {t("about.content.visionMission.tagline")}
                            </motion.p>
                            <motion.h2
                                className="section-title"
                                variants={fadeInRight}
                            >
                                <span className="highlight">
                                    {
                                        t(
                                            "about.content.visionMission.title"
                                        ).split(" ")[0]
                                    }
                                </span>{" "}
                                {t("about.content.visionMission.title")
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")}
                            </motion.h2>
                        </motion.div>
                        <motion.div
                            className="content-text"
                            variants={staggerContainer}
                        >
                            <div className="vision-mission-container">
                                <motion.div
                                    className="vision-block"
                                    variants={fadeInLeft}
                                >
                                    <h3>
                                        {t(
                                            "about.content.visionMission.vision.title"
                                        )}
                                    </h3>
                                    <p>
                                        {t(
                                            "about.content.visionMission.vision.content"
                                        )}
                                    </p>
                                </motion.div>
                                <motion.div
                                    className="mission-block"
                                    variants={fadeInRight}
                                >
                                    <h3>
                                        {t(
                                            "about.content.visionMission.mission.title"
                                        )}
                                    </h3>
                                    <motion.ul variants={staggerContainer}>
                                        {t(
                                            "about.content.visionMission.mission.items"
                                        ).map((item, index) => (
                                            <motion.li
                                                key={index}
                                                variants={fadeInUp}
                                            >
                                                {item}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                );
            case "MAJOR_FACTOR":
                return (
                    <motion.div
                        className="content-section"
                        key="major-factor"
                        variants={tabAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="section-header"
                            variants={fadeInUp}
                        >
                            <motion.p className="tagline" variants={fadeInLeft}>
                                {t("about.content.majorFactor.tagline")}
                            </motion.p>
                            <motion.h2
                                className="section-title"
                                variants={fadeInRight}
                            >
                                <span className="highlight">
                                    {
                                        t(
                                            "about.content.majorFactor.title"
                                        ).split(" ")[0]
                                    }
                                </span>{" "}
                                {t("about.content.majorFactor.title")
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")}
                            </motion.h2>
                        </motion.div>
                        <motion.div
                            className="content-text"
                            variants={staggerContainer}
                        >
                            <motion.div
                                className="factors-grid"
                                variants={staggerContainer}
                            >
                                {t("about.content.majorFactor.factors").map(
                                    (factor, index) => (
                                        <motion.div
                                            className="factor-item"
                                            key={index}
                                            variants={scaleIn}
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <h4>{factor.title}</h4>
                                            <p>{factor.content}</p>
                                        </motion.div>
                                    )
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                );
            case "PROBLEM":
                return (
                    <motion.div
                        className="content-section"
                        key="problem"
                        variants={tabAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="section-header"
                            variants={fadeInUp}
                        >
                            <motion.p className="tagline" variants={fadeInLeft}>
                                {t("about.content.problem.tagline")}
                            </motion.p>
                            <motion.h2
                                className="section-title"
                                variants={fadeInRight}
                            >
                                <span className="highlight">
                                    {
                                        t("about.content.problem.title").split(
                                            " "
                                        )[0]
                                    }
                                </span>{" "}
                                {t("about.content.problem.title")
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")}
                            </motion.h2>
                        </motion.div>
                        <motion.div
                            className="content-text"
                            variants={staggerContainer}
                        >
                            <motion.div
                                className="problem-brief"
                                variants={fadeInUp}
                            >
                                <h4>
                                    {t("about.content.problem.brief.title")}
                                </h4>
                                <p>
                                    {t("about.content.problem.brief.content")}
                                </p>
                            </motion.div>
                            <motion.div
                                className="problems-list"
                                variants={staggerContainer}
                            >
                                {t("about.content.problem.problems").map(
                                    (problem, index) => (
                                        <motion.div
                                            className="problem-item"
                                            key={index}
                                            variants={scaleIn}
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <h4>{problem.title}</h4>
                                            <p>{problem.content}</p>
                                        </motion.div>
                                    )
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                );
            case "SOLUTION":
                return (
                    <motion.div
                        className="content-section"
                        key="solution"
                        variants={tabAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className="section-header"
                            variants={fadeInUp}
                        >
                            <motion.p className="tagline" variants={fadeInLeft}>
                                {t("about.content.solution.tagline")}
                            </motion.p>
                            <motion.h2
                                className="section-title"
                                variants={fadeInRight}
                            >
                                <span className="highlight">
                                    {
                                        t("about.content.solution.title").split(
                                            " "
                                        )[0]
                                    }
                                </span>{" "}
                                {t("about.content.solution.title")
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")}
                            </motion.h2>
                        </motion.div>
                        <motion.div
                            className="content-text"
                            variants={staggerContainer}
                        >
                            <motion.div
                                className="solution-brief"
                                variants={fadeInUp}
                            >
                                <h4>
                                    {t("about.content.solution.brief.title")}
                                </h4>
                                <p>
                                    {t("about.content.solution.brief.content")}
                                </p>
                            </motion.div>
                            <motion.div
                                className="solutions-grid"
                                variants={staggerContainer}
                            >
                                {t("about.content.solution.solutions").map(
                                    (solution, index) => (
                                        <motion.div
                                            className="solution-item"
                                            key={index}
                                            variants={scaleIn}
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <h4>{solution.title}</h4>
                                            <p>{solution.content}</p>
                                        </motion.div>
                                    )
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="about-page">
            {/* Hero Section */}
            <motion.section
                className="hero-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="hero-background">
                    <img
                        src={aboutBg}
                        alt="Industrial facility"
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
                            className="hero-image-wrapper"
                            variants={fadeInUp}
                        >
                            <img
                                src={aboutHero}
                                alt="Trade show booth"
                                className="hero-image"
                            />
                        </motion.div>

                        <motion.div
                            className="hero-text-wrapper"
                            variants={fadeInUp}
                        >
                            <h1 className="hero-title">
                                {t("about.hero.title")
                                    .split(" ")
                                    .slice(0, 2)
                                    .join(" ")}{" "}
                                <span className="highlight">
                                    {t("about.hero.title").split(" ")[2]}
                                </span>
                                <br />
                                {t("about.hero.title")
                                    .split(" ")
                                    .slice(3)
                                    .join(" ")}
                            </h1>
                            <p className="hero-description">
                                {t("about.hero.description")}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Statistics Section */}
            <motion.section
                className="statistics-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
            >
                <div className="statistics-container">
                    <div className="stat-item">
                        <h3>1000+</h3>
                        <p>{t("about.statistics.compressors")}</p>
                    </div>
                    <div className="stat-item">
                        <h3>500+</h3>
                        <p>{t("about.statistics.customers")}</p>
                    </div>
                    <div className="stat-item">
                        <h3>200+</h3>
                        <p>{t("about.statistics.projects")}</p>
                    </div>
                    <div className="stat-item">
                        <h3>15+</h3>
                        <p>{t("about.statistics.experience")}</p>
                    </div>
                </div>
            </motion.section>

            {/* Navigation Tabs */}
            <motion.section
                className="content-navigation"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
            >
                <div className="nav-container">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`nav-tab ${
                                activeTab === tab.id ? "active" : ""
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </motion.section>

            {/* Content Section */}
            <section className="main-content">
                <div className="content-container">
                    <AnimatePresence mode="wait">
                        {getTabContent()}
                    </AnimatePresence>
                </div>
            </section>

            {/* Values Section */}
            <motion.section
                className="values"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
            >
                <div className="container">
                    <div className="values-content">
                        <h3>
                            <span className="highlight">
                                {t("about.values.title").split(" ")[0]}
                            </span>{" "}
                            {t("about.values.title")
                                .split(" ")
                                .slice(1)
                                .join(" ")}
                        </h3>
                        <div className="values-grid">
                            {values.map((item, index) => (
                                <div className="value-card" key={index}>
                                    <img
                                        src={item.icon}
                                        className="icon"
                                        alt={item.title}
                                    />
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                    <span className="underline" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Documentation */}
                <div className="documentation">
                    <div className="container">
                        <h3>
                            <span className="highlight">
                                {t("about.documentation.title")}
                            </span>
                        </h3>

                        <div className="slider">
                            <button
                                className="chevron left"
                                onClick={prevSlide}
                            >
                                <ChevronLeft />
                            </button>

                            <div className="slider-window">
                                <div
                                    className="slider-track"
                                    style={{
                                        transform: `translateX(-${
                                            currentIndex * (100 / 3)
                                        }%)`,
                                        transition: "transform 0.3s ease",
                                    }}
                                >
                                    {images.map((img, index) => (
                                        <div
                                            className="square"
                                            key={index}
                                            onClick={() => openPreview(index)}
                                        >
                                            <img
                                                src={img}
                                                alt={`doc-${index}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="chevron right"
                                onClick={nextSlide}
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>

                    {/* Preview Modal */}
                    <AnimatePresence>
                        {previewIndex !== null && (
                            <motion.div
                                className="preview-overlay"
                                onClick={closePreview}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    zIndex: 9999,
                                    overflow: "hidden",
                                }}
                            >
                                <motion.div
                                    className="preview-content"
                                    onClick={(e) => e.stopPropagation()}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <button
                                        className="close"
                                        onClick={closePreview}
                                    >
                                        <X />
                                    </button>
                                    <img
                                        src={images[previewIndex]}
                                        alt="Preview"
                                    />
                                    <div className="preview-controls">
                                        <button onClick={prevPreview}>
                                            <ChevronLeft />
                                        </button>
                                        <button onClick={nextPreview}>
                                            <ChevronRight />
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.section>
        </div>
    );
};

export default About;
