import React, { useState, useEffect } from "react";
import { LanguageContext } from "./LanguageContext";
import { languages } from "../utils/constants/languages";

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState("EN");
    const [translations, setTranslations] = useState(languages.EN);

    useEffect(() => {
        const savedLanguage = localStorage.getItem("preferredLanguage");
        if (savedLanguage && languages[savedLanguage]) {
            setCurrentLanguage(savedLanguage);
            setTranslations(languages[savedLanguage]);
        }
    }, []);

    const changeLanguage = (languageCode) => {
        if (languages[languageCode]) {
            setCurrentLanguage(languageCode);
            setTranslations(languages[languageCode]);
            localStorage.setItem("preferredLanguage", languageCode);
        }
    };

    const t = (key) => {
        const keys = key.split(".");
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === "object" && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key "${key}" not found`);
                return key;
            }
        }

        return value;
    };

    const value = {
        currentLanguage,
        translations,
        changeLanguage,
        t,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
