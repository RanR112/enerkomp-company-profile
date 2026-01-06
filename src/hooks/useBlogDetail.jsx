import { useState, useEffect, useCallback } from "react";
import { fetchBlogById, fetchRelatedBlogs } from "../lib/api";
import { useSelector } from "react-redux";
import { useLanguage } from "./useLanguage";

const getTranslation = (entity, preferredLanguage = "ID") => {
    if (!entity) return null;
    if (Array.isArray(entity.translations)) {
        return (
            entity.translations.find((t) => t.language === preferredLanguage) ||
            entity.translations[0] ||
            null
        );
    }
    return null;
};

export const useBlogDetail = () => {
    const { currentLanguage } = useLanguage();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { selectedBlogId } = useSelector((state) => state.blogDetail);

    // const preferredLanguage =
    //     typeof window !== "undefined"
    //         ? localStorage.getItem("preferredLanguage") || "ID"
    //         : "ID";

    const loadBlogDetail = useCallback(async () => {
        if (!selectedBlogId) {
            setError("Slug blog tidak ditemukan");
            setBlog(null);
            setRelatedBlogs([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Step 1: fetch blogs list untuk cari blog id dari slug
            const detail = await fetchBlogById(selectedBlogId);

            if (!detail || !selectedBlogId) {
                setError("Blog tidak ditemukan");
                setBlog(null);
                setRelatedBlogs([]);
                setLoading(false);
                return;
            }

            // Step 2: ambil blog detail by id
            const translation = getTranslation(detail, currentLanguage);
            const processedBlog = { ...detail, translation };
            setBlog(processedBlog);

            // Step 3: fetch related blogs
            try {
                const related = await fetchRelatedBlogs(detail.id, {
                    limit: 3,
                });
                const relatedData = Array.isArray(related.blogs)
                    ? related.blogs
                    : [];

                const processedRelated = relatedData.map((b) => ({
                    ...b,
                    translation: getTranslation(b, currentLanguage),
                }));

                setRelatedBlogs(processedRelated);
            } catch {
                setRelatedBlogs([]);
            }
        } catch (err) {
            setError(null);
            setBlog(null);
            setRelatedBlogs([]);
        } finally {
            setLoading(false);
        }
    }, [selectedBlogId, currentLanguage]);

    useEffect(() => {
        loadBlogDetail();
    }, [loadBlogDetail]);

    return {
        blog,
        relatedBlogs,
        loading,
        error,
        refetch: loadBlogDetail,
    };
};
