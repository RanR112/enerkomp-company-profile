import React from "react";
import { motion } from "framer-motion";
import "../sass/pages/PrivacyPolicy/PrivacyPolicy.css";
import { useLanguage } from "../hooks/useLanguage";

const PrivacyPolicy = () => {
    const { t } = useLanguage();

    return (
        <motion.div
            className={"privacy-policy"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={"container"}>
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {t("privacy.title")}
                </motion.h1>

                <motion.p
                    className={"intro"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {t("privacy.intro")}
                </motion.p>

                {/* Section 1: Purpose */}
                <motion.div
                    className={"section"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2>{t("privacy.sections.purpose.heading")}</h2>
                    <p>{t("privacy.sections.purpose.content")}</p>
                </motion.div>

                {/* Section 2: Data Collected */}
                <motion.div
                    className={"section"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2>{t("privacy.sections.data.heading")}</h2>
                    <p>{t("privacy.sections.data.content")}</p>
                    <ul>
                        {t("privacy.sections.data.items", {
                            returnObjects: true,
                        }).map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </motion.div>

                {/* Section 3: Disclosure */}
                <motion.div
                    className={"section"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <h2>{t("privacy.sections.disclosure.heading")}</h2>
                    <p>{t("privacy.sections.disclosure.content1")}</p>
                    <p>{t("privacy.sections.disclosure.content2")}</p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PrivacyPolicy;
