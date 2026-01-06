import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, PhoneCall, Mail } from "lucide-react";
import "../sass/components/Footer/Footer.css";
import { footer, LogoWhite } from "../assets/images";
import { useLanguage } from "../hooks/useLanguage";
import { Link, useNavigate } from "react-router-dom";
import { useBrands } from "../hooks/useBrands";
import { useCategories } from "../hooks/useCategories";

const Footer = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const {
        brands,
        loading: brandsLoading,
        error: brandsError,
    } = useBrands({ type: "PRODUCT", limit: 5, isActive: true });

    const {
        categories,
        loading: categoriesLoading,
        error: categoriesError,
    } = useCategories({ limit: 5, isActive: true });

    const footerLegals = [
        {
            name: t("footer.legals.privacyPolicy"),
            path: "/legal/privacy-policy",
        },
    ];

    const sortedBrands = useMemo(() => {
        if (!Array.isArray(brands)) return [];
        return [...brands].sort(
            (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
        );
    }, [brands]);

    const sortedCategories = useMemo(() => {
        if (!Array.isArray(categories)) return [];
        return [...categories].sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
    }, [categories]);

    const handleFooterClick = (path) => {
        navigate(path);
    };

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
                    <span>{t("footer.office").split(":")[0]}:</span>{" "}
                    {t("footer.office").split(":")[1]}
                    <br />
                    <span>
                        {t("footer.operationalOffice").split(":")[0]}:
                    </span>{" "}
                    {t("footer.operationalOffice").split(":")[1]}
                    <br />
                    <span>
                        {t("footer.branchOffice").split(":")[0]}:
                    </span>{" "}
                    {t("footer.branchOffice").split(":")[1]}
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
                        <a
                            href="https://web.facebook.com/profile.php?id=61576563574412&locale=id_ID"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <motion.li
                                variants={socialItemVariants}
                                whileHover="hover"
                            >
                                <Facebook /> {t("footer.social.facebook")}
                            </motion.li>
                        </a>
                        <a
                            href="https://www.instagram.com/enerkomp/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <motion.li
                                variants={socialItemVariants}
                                whileHover="hover"
                            >
                                <Instagram /> {t("footer.social.instagram")}
                            </motion.li>
                        </a>
                        <a
                            href="https://www.linkedin.com/company/pt-enerkomp-persada-raya/posts/?feedView=all"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <motion.li
                                variants={socialItemVariants}
                                whileHover="hover"
                            >
                                <Linkedin /> {t("footer.social.linkedin")}
                            </motion.li>
                        </a>
                    </motion.ul>
                </motion.div>

                {/* Brand list */}
                <motion.div className="col" variants={itemVariants}>
                    <motion.h3 variants={itemVariants}>
                        {t("footer.brand")}
                    </motion.h3>
                    <motion.ul className="brands">
                        {sortedBrands.map((brand, index) => (
                            <Link
                                to={`/products?brands=${brand.slug}`}
                                key={brand.id}
                            >
                                <motion.li
                                    key={brand.id}
                                    variants={brandItemVariants}
                                    whileHover="hover"
                                    custom={index}
                                >
                                    {brand.name}
                                </motion.li>
                            </Link>
                        ))}
                    </motion.ul>
                </motion.div>

                {/* Category list */}
                <motion.div className="col" variants={itemVariants}>
                    <motion.h3 variants={itemVariants}>
                        {t("footer.category")}
                    </motion.h3>
                    <motion.ul className="brands">
                        {sortedCategories.map((category, index) => (
                            <Link
                                to={`/products?categories=${category.slug}`}
                                key={category.id}
                            >
                                <motion.li
                                    variants={brandItemVariants}
                                    whileHover="hover"
                                    custom={index}
                                >
                                    {category.name}
                                </motion.li>
                            </Link>
                        ))}
                    </motion.ul>
                </motion.div>

                {/* Legal list*/}
                <motion.div className="col" variants={itemVariants}>
                    <motion.h3 variants={itemVariants}>
                        {t("footer.legal")}
                    </motion.h3>
                    <motion.ul className="brands">
                        {footerLegals.map((item) => (
                            <motion.li
                                key={item.name}
                                variants={brandItemVariants}
                                whileHover="hover"
                                onClick={() => handleFooterClick(item.path)}
                            >
                                {item.name}
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
                            sales@enerkomp.co.id
                        </motion.li>
                    </motion.ul>
                </motion.div>
            </motion.div>
        </motion.footer>
    );
};

export default Footer;
