import { useState, useEffect, useCallback } from "react";
import { fetchBlogs } from "../lib/api";

const getTranslation = (translations = [], preferredLanguage = "ID") => {
    if (!Array.isArray(translations) || translations.length === 0) return null;
    return (
        translations.find((t) => t.language === preferredLanguage) ||
        translations[0]
    );
};

export const useBlogs = (options = {}) => {
    const [blogs, setBlogs] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const preferredLanguage =
        typeof window !== "undefined"
            ? localStorage.getItem("preferredLanguage") || "ID"
            : "ID";

    // stringify options untuk dependency stabil
    const optionsKey = JSON.stringify(options);

    const loadBlogs = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchBlogs(options);
            const dataArray = Array.isArray(result.data) ? result.data : [];
            const processed = dataArray.map((p) => ({
                ...p,
                translation: getTranslation(p.translations, preferredLanguage),
            }));

            setBlogs(processed);
            setMeta(result.meta || {});
        } catch (err) {
            setError(null);
            setBlogs([]);
            setMeta({});
        } finally {
            setLoading(false);
        }
    }, [optionsKey, preferredLanguage]); // <-- stabil

    useEffect(() => {
        loadBlogs();
    }, [loadBlogs]);

    return { blogs, meta, loading, error, refetch: loadBlogs };
};
