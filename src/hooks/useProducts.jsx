import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../lib/api";

const getTranslation = (translations = [], preferredLanguage = "ID") => {
    if (!Array.isArray(translations) || translations.length === 0) return null;
    return (
        translations.find((t) => t.language === preferredLanguage) ||
        translations[0]
    );
};

export const useProducts = (options = {}) => {
    const [products, setProducts] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const preferredLanguage =
        typeof window !== "undefined"
            ? localStorage.getItem("preferredLanguage") || "ID"
            : "ID";

    // stringify options untuk dependency stabil
    const optionsKey = JSON.stringify(options);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchProducts(options);
            const dataArray = Array.isArray(result.data) ? result.data : [];
            const processed = dataArray.map((p) => ({
                ...p,
                translation: getTranslation(p.translations, preferredLanguage),
            }));

            setProducts(processed);
            setMeta(result.meta || {});
        } catch (err) {
            setError(null);
            setProducts([]);
            setMeta({});
        } finally {
            setLoading(false);
        }
    }, [optionsKey, preferredLanguage]); // <-- stabil

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    return { products, meta, loading, error, refetch: loadProducts };
};
