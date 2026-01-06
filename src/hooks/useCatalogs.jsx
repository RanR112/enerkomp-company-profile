import { useState, useEffect, useCallback } from "react";
import { fetchCatalogs } from "../lib/api";

export const useCatalogs = (options = {}) => {
    const [data, setData] = useState({ catalogs: [], meta: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const optionsKey = JSON.stringify(options);

    const loadCatalogs = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchCatalogs(options);

            const catalogs = Array.isArray(result.data)
                ? result.data.map((c) => ({
                      ...c,
                      fileUrl: c.file, // file sudah valid
                  }))
                : [];

            setData({
                catalogs,
                meta: result.meta || {},
            });
        } catch (err) {
            setError(null);
        } finally {
            setLoading(false);
        }
    }, [optionsKey]);

    useEffect(() => {
        let isMounted = true;

        if (isMounted) loadCatalogs();

        return () => {
            isMounted = false;
        };
    }, [loadCatalogs]);

    return { ...data, loading, error, refetch: loadCatalogs };
};
