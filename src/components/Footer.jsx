import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, PhoneCall, Mail } from "lucide-react";
import "../sass/components/Footer/Footer.css";
import { footer, LogoWhite } from "../assets/images";
import { useLanguage } from "../hooks/useLanguage";

const Footer = () => {
    const { t } = useLanguage();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                type: "spring",
                stiffness: 100,
            },
        },
    };

    const socialItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 },
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.2 },
        },
    };

    const brandItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
        hover: {
            color: "var(--Third)",
            transition: { duration: 0.2 },
        },
    };

    const contactItemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 },
        },
        hover: {
            scale: 1.02,
            transition: { duration: 0.2 },
        },
    };

    return (
        <motion.footer
            className="footer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            // variants={containerVariants}
        >
            {/* Background illustration */}
            <motion.img
                src={footer}
                alt=""
                className="bg-illustration"
                aria-hidden
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
            />

            {/* Logo + alamat */}
            <motion.div className="footer-top" variants={itemVariants}>
                <motion.img
                    src={LogoWhite}
                    alt="Enerkomp Logo"
                    className="brand-logo"
                    variants={logoVariants}
                    whileHover={{
                        rotate: 360,
                        transition: { duration: 0.8 },
                    }}
                />
                <motion.h2 className="brand-name" variants={itemVariants}>
                    {t("footer.brandName")}
                </motion.h2>
                <motion.p className="brand-address" variants={itemVariants}>
                    <span>{t("footer.address").split(":")[0]}:</span>{" "}
                    {t("footer.address").split(":")[1]}
                </motion.p>
            </motion.div>

            {/* 3 columns */}
            <motion.div className="footer-columns" variants={containerVariants}>
                {/* Sosial */}
                <motion.div className="col" variants={itemVariants}>
                    <motion.h3 variants={itemVariants}>
                        {t("footer.followUs")}
                    </motion.h3>
                    <motion.ul className="social">
                        <motion.li
                            variants={socialItemVariants}
                            whileHover="hover"
                        >
                            <Facebook /> {t("footer.social.facebook")}
                        </motion.li>
                        <motion.li
                            variants={socialItemVariants}
                            whileHover="hover"
                        >
                            <Instagram /> {t("footer.social.instagram")}
                        </motion.li>
                        <motion.li
                            variants={socialItemVariants}
                            whileHover="hover"
                        >
                            <Linkedin /> {t("footer.social.linkedin")}
                        </motion.li>
                    </motion.ul>
                </motion.div>

                {/* Brand list */}
                <motion.div className="col" variants={itemVariants}>
                    <motion.h3 variants={itemVariants}>
                        {t("footer.brand")}
                    </motion.h3>
                    <motion.ul className="brands">
                        {t("footer.brands").map((brand, index) => (
                            <motion.li
                                key={brand}
                                variants={brandItemVariants}
                                whileHover="hover"
                                custom={index}
                            >
                                {brand}
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>

                {/* Kontak */}
                <motion.div className="col" variants={itemVariants}>
                    <motion.h3 variants={itemVariants}>
                        {t("footer.contactUs")}
                    </motion.h3>
                    <motion.ul className="contacts">
                        <motion.li
                            variants={contactItemVariants}
                            whileHover="hover"
                        >
                            <PhoneCall />
                            (021) 89329679
                        </motion.li>
                        <motion.li
                            variants={contactItemVariants}
                            whileHover="hover"
                        >
                            <Mail />
                            sales@enerkomp.id
                        </motion.li>
                    </motion.ul>
                </motion.div>
            </motion.div>
        </motion.footer>
    );
};

export default Footer;
