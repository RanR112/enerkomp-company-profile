// utils/productUtils.js

// Brand mapping untuk konsistensi
export const BRAND_MAP = {
    ihi: "IHI",
    blovac: "Blovac",
    horisan: "Horisan",
    nop: "NOP",
    smk: "SMK",
    suto: "SUTO",
    teral: "Teral",
    trident: "Trident",
};

// Generate slug dari brand dan title
export const generateSlug = (brandId, productTitle) => {
    const brandName = BRAND_MAP[brandId] || brandId;
    return `${brandName.toLowerCase()}-${productTitle.toLowerCase()}`
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
};

// Get brand name dari brand ID
export const getBrandName = (brandId) => {
    return BRAND_MAP[brandId] || brandId;
};

// Find product by slug
export const findProductBySlug = (products, slug) => {
    return products.find((product) => product.slug === slug);
};

// Get related products
export const getRelatedProducts = (products, currentProduct, limit = 3) => {
    return products
        .filter(
            (product) =>
                product.category === currentProduct.category &&
                product.id !== currentProduct.id
        )
        .slice(0, limit);
};
