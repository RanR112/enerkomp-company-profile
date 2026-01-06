import { useState, useEffect } from "react";
import { fetchGalleries, getImageUrl } from "../lib/api";

export const useGalleries = (options = {}) => {
    const [data, setData] = useState([]); // array
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            try {
                setLoading(true);

                const result = await fetchGalleries(options);

                if (isMounted) {
                    const galleries = result.data.map((g) => ({
                        ...g,
                        imageUrl: getImageUrl(
                            g.image
                        ),
                    }));

                    setData(galleries); // <— array
                    setMeta(result.meta); // <— meta
                }
            } catch (err) {
                if (isMounted) setError(null);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        load();
        return () => (isMounted = false);
    }, [JSON.stringify(options)]);

    return { data, meta, loading, error };
};
