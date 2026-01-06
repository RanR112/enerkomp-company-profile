// src/hooks/useBrands.js (refactored to auto-select translation)
import { useState, useEffect } from "react";
import { fetchBrands } from "../lib/api";

export const useBrands = (options = {}) => {
    const [brands, setBrands] = useState([]);
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

                const result = await fetchBrands(options);
                if (!isMounted) return;

                // ❗ FIX PENTING: backend mengirim { data: [...] }
                const list = result.data || [];

                const processedBrands = list.map((b) => {
                    const translation = Array.isArray(b.translations)
                        ? b.translations.find(
                              (tr) => tr.language === preferredLanguage
                          ) ||
                          b.translations[0] ||
                          null
                        : null;

                    return {
                        ...b,
                        translation,
                    };
                });

                setBrands(processedBrands);
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

    return { brands, meta, loading, error };
};
