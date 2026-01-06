import { useState, useEffect, useCallback } from "react";
import { fetchProducts, fetchProductById } from "../lib/api";
import { useSelector } from "react-redux";
import { useLanguage } from "./useLanguage";

const getTranslation = (entity, preferredLanguage = "EN") => {
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

export const useProductDetail = () => {
    const { currentLanguage } = useLanguage();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { selectedProductId } = useSelector((state) => state.productDetail);


    // const preferredLanguage =
    //     typeof window !== "undefined"
    //         ? localStorage.getItem("preferredLanguage") || "EN"
    //         : "ID";

    const loadProductDetail = useCallback(async () => {
        if (!selectedProductId) {
            setError("Slug produk tidak ditemukan");
            setProduct(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const detail = await fetchProductById(selectedProductId);

            if (!detail || !selectedProductId) {
                setError("Produk tidak ditemukan");
                setProduct(null);
                setRelatedProducts([]);
                setLoading(false);
                return;
            }

            const translation = getTranslation(detail, currentLanguage);
            const processedProduct = { ...detail, translation };
            setProduct(processedProduct);

            // Step 3: fetch related products
            try {
                const related = await fetchProducts({
                    limit: 3,
                    categories: detail.category.name,
                });
                const relatedData = Array.isArray(related.products)
                    ? related.products
                    : [];

                const processedRelated = relatedData.map((p) => ({
                    ...p,
                    translation: getTranslation(p, currentLanguage),
                }));

                setRelatedProducts(processedRelated);
            } catch {
                setRelatedProducts([]);
            }
        } catch (err) {
            setError(null);
            setProduct(null);
            setRelatedProducts([]);
        } finally {
            setLoading(false);
        }
    }, [selectedProductId, currentLanguage]);

    useEffect(() => {
        loadProductDetail();
    }, [loadProductDetail]);

    return {
        product,
        relatedProducts,
        loading,
        error,
        refetch: loadProductDetail,
    };
};
