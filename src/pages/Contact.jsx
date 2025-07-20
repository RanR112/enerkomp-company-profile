import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aboutHero, Banner1 } from "../assets/images";
import Form from "../components/Form";
import "../sass/pages/Contact/Contact.css";
import { Linkedin, Mail, MapPin, PhoneCall } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function Contact() {
    const { t } = useLanguage();

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

    const contacts = [
        {
            icon: <Linkedin />,
            title: t("contact.contactInfo.linkedin.title"),
            description: t("contact.contactInfo.linkedin.description"),
        },
        {
            icon: <PhoneCall />,
            title: t("contact.contactInfo.phone.title"),
            description: t("contact.contactInfo.phone.description"),
        },
        {
            icon: <Mail />,
            title: t("contact.contactInfo.email.title"),
            description: t("contact.contactInfo.email.description"),
        },
    ];

    const offices = [
        {
            id: 1,
            name: t("contact.offices.jakarta.name"),
            address: t("contact.offices.jakarta.address"),
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7286484399715!2d107.14552427531228!3d-6.2993431936898014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b00014091d5%3A0xe6f438c17a3cb457!2sPT%20ENERKOMP%20PERSADA%20RAYA!5e0!3m2!1sid!2sid!4v1752876501139!5m2!1sid!2sid",
            location: t("contact.offices.jakarta.location"),
            mapAlt: t("contact.offices.jakarta.mapAlt"),
        },
        {
            id: 2,
            name: t("contact.offices.cikarang.name"),
            address: t("contact.offices.cikarang.address"),
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7286484399715!2d107.14552427531228!3d-6.2993431936898014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b00014091d5%3A0xe6f438c17a3cb457!2sPT%20ENERKOMP%20PERSADA%20RAYA!5e0!3m2!1sid!2sid!4v1752876501139!5m2!1sid!2sid",
            location: t("contact.offices.cikarang.location"),
            mapAlt: t("contact.offices.cikarang.mapAlt"),
        },
    ];

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

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <motion.section
                className="hero-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="hero-background">
                    <img
                        src={Banner1}
                        alt={t("contact.hero.imageAlt")}
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
                                alt={t("contact.hero.tradeShowAlt")}
                                className="hero-image"
                            />
                        </motion.div>

                        <motion.div
                            className="hero-text-wrapper"
                            variants={fadeInUp}
                        >
                            <h1 className="hero-title">
                                {t("contact.hero.title.part1")}
                                <span className="highlight">
                                    {" "}
                                    {t("contact.hero.title.highlight")}
                                </span>
                            </h1>
                            <p className="hero-description">
                                {t("contact.hero.description")}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            <section className="catalog-form">
                <h3 className="catalog-form-title">
                    {t("contact.form.title.part1")}{" "}
                    <span className="highlight">
                        {t("contact.form.title.highlight")}
                    </span>
                </h3>
                <Form type="contact" />
            </section>

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
                            {t("contact.cta.title.part1")}{" "}
                            <span className="highlight">
                                {" "}
                                {t("contact.cta.title.highlight")}
                            </span>
                        </h2>
                        <h3>{t("contact.cta.subtitle")}</h3>
                    </div>
                </div>
            </motion.section>

            <motion.section
                className="contact"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="container">
                    <motion.div
                        className="contacts-grid"
                        variants={containerVariants}
                    >
                        {contacts.map((contact, index) => (
                            <motion.div
                                key={index}
                                className="contact-card-wrapper"
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
                                <div className="contact-card">
                                    <div className="shimmer"></div>
                                    <div className="contact-icon">
                                        {contact.icon}
                                    </div>
                                    <h3>{contact.title}</h3>
                                    <p>{contact.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                className="map-section"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="container">
                    <motion.div
                        className="offices-grid"
                        variants={containerVariants}
                    >
                        {offices.map((office) => (
                            <motion.div
                                key={office.id}
                                className="office-card"
                                variants={itemVariants}
                                whileHover={{
                                    y: -10,
                                    transition: { duration: 0.3 },
                                }}
                            >
                                <div className="office-header">
                                    <div className="office-icon">
                                        <MapPin size={40} />
                                    </div>
                                    <h3 className="office-title">
                                        {office.name}
                                    </h3>
                                    <p className="office-address">
                                        {office.address}
                                    </p>
                                </div>

                                <div className="office-map">
                                    <div className="map-placeholder">
                                        <iframe
                                            className="map"
                                            src={office.map}
                                            allowfullscreen=""
                                            loading="lazy"
                                            referrerpolicy="no-referrer-when-downgrade"
                                            title={office.mapAlt}
                                        ></iframe>
                                        <div className="map-overlay">
                                            <div className="location-pin">
                                                <MapPin size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}
