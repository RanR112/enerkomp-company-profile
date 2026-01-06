// src/hooks/useCategories.js (refactored to auto-select translation)
import { useState, useEffect } from "react";
import { fetchCategories } from "../lib/api";

export const useCategories = (options = {}) => {
    const [categories, setCategories] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const preferredLanguage =
        typeof window !== "undefined"
            ? localStorage.getItem("preferredLanguage") || "ID"
            : "ID";

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            try {
                setLoading(true);

                const result = await fetchCategories(options);
                if (!isMounted) return;

                // ❗ FIX: backend mengirim { data: [...] }
                const list = result.data || [];

                const processedCategories = list.map((c) => {
                    const translation = Array.isArray(c.translations)
                        ? c.translations.find(
                              (tr) => tr.language === preferredLanguage
                          ) ||
                          c.translations[0] ||
                          null
                        : null;

                    return {
                        ...c,
                        translation,
                    };
                });

                setCategories(processedCategories);
                setMeta(result.meta || {});
            } catch (err) {
                if (isMounted) {
                    setError(null);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        load();
        return () => (isMounted = false);
    }, [JSON.stringify(options), preferredLanguage]);

    return { categories, meta, loading, error };
};
