// src/lib/api.js
/**
 * Configurable base API client for Enerkomp company profile
 * - Handles public endpoints only (no auth needed)
 * - Auto-retry on network failure (1x)
 * - Supports language (`lang`) parameter
 * - Returns native JS objects (not Prisma raw)
 */

import { LogoPrimary } from "../assets/images";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://api.enerkomp.co.id/api";

// 🔹 Helper: parse response safely
const parseResponse = async (res) => {
    if (res.ok) {
        try {
            return await res.json();
        } catch {
            return { success: true, data: null };
        }
    } else {
        const errorText = await res.text().catch(() => "");
        let error;
        try {
            error = JSON.parse(errorText);
        } catch {
            error = { error: errorText || `HTTP ${res.status}` };
        }
        throw error;
    }
};

// 🔹 Helper: delay (untuk retry)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 🔹 Core fetch wrapper
const request = async (endpoint, options = {}, retries = 1) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...options.headers,
        },
        ...options,
    };

    try {
        const res = await fetch(url, config);
        return await parseResponse(res);
    } catch (error) {
        if (
            retries > 0 &&
            (error instanceof TypeError || error?.status >= 500)
        ) {
            await delay(1000); // tunggu 1 detik
            return request(endpoint, options, retries - 1);
        }
        throw error;
    }
};

// 🔹 Helper: append lang to query
const withLang = (params = {}, lang = null) => {
    const langParam = lang || localStorage.getItem("i18nextLng") || "id";
    return { ...params, lang: langParam };
};

// ───────────────────────────────────────────────────────────────
// ✅ PUBLIC ENDPOINTS — COMPANY PROFILE
// ───────────────────────────────────────────────────────────────

/**
 * Request umum — error akan dilempar ke caller
 */
export const publicApi = async (endpoint, options = {}) => {
    return request(endpoint, options, 1);
};

/**
 * ✅ Analytics tracking — silent fail (tidak throw error)
 * @param {string} endpoint
 * @param {Object} options
 * @returns {Promise<void>}
 */
export const trackAnalytics = async (endpoint, options = {}) => {
    try {
        await request(
            endpoint,
            {
                method: "POST",
                ...options,
            },
            0
        ); // tanpa retry — fast & silent
    } catch (err) {
        // 🔹 Fail silently — jangan ganggu UX
        if (import.meta.env.DEV) {
            console.warn(
                "[Analytics] Failed to send:",
                endpoint,
                err.message || err
            );
        }
    }
};

/**
 * GET /products
 * @param {Object} params - { page=1, limit=10, search="", categoryId="", brandId="", lang }
 * @returns {Promise<{ products: [], meta: {} }>}
 */
export const fetchProducts = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products${query ? `?${query}` : ""}`);
};

/**
 * GET /products/:slug
 * @param {string} slug
 * @returns {Promise<Object>}
 */
export const fetchProductById = async (id, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products/${id}${query ? `?${query}` : ""}`);
};

/**
 * GET /brands
 * @param {Object} params - { page=1, limit=20, type="PRODUCT", search="", lang }
 * @returns {Promise<{ brands: [], meta: {} }>}
 */
export const fetchBrands = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/brands${query ? `?${query}` : ""}`);
};

/**
 * GET /categories
 * @param {Object} params - { page=1, limit=20, search="", lang }
 * @returns {Promise<{ categories: [], meta: {} }>}
 */
export const fetchCategories = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/categories${query ? `?${query}` : ""}`);
};

/**
 * GET /galleries
 * @param {Object} params - { page=1, limit=20, lang }
 * @returns {Promise<{ galleries: [], meta: {} }>}
 */
export const fetchGalleries = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/galleries${query ? `?${query}` : ""}`);
};

/**
 * GET /catalogs
 * @param {Object} params - { page=1, limit=10, search="", lang }
 * @returns {Promise<{ catalogs: [], meta: {} }>}
 */
export const fetchCatalogs = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/catalogs${query ? `?${query}` : ""}`);
};

/**
 * GET /blogs
 * @param {Object} params - { page=1, limit=10, published=true, search="", lang }
 * @returns {Promise<{ blogs: [], meta: {} }>}
 */
export const fetchBlogs = async (params = {}) => {
    const finalParams = { published: true, ...params };
    const query = new URLSearchParams(withLang(finalParams)).toString();
    return request(`/blogs${query ? `?${query}` : ""}`);
};

export const fetchBlogById = async (id, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/blogs/${id}${query ? `?${query}` : ""}`);
};

export const fetchRelatedBlogs = async (productId, params = {}) => {
    const finalParams = new URLSearchParams(params).toString();
    return request(`/products/${productId}/related${finalParams ? `?${finalParams}` : ""}`);
};

/**
 * POST /clients — form submission (contact/catalog)
 * @param {Object} data - { name, email, company?, phone?, message, formType, catalogId? }
 * @returns {Promise<Object>}
 */
export const submitClientForm = async (data) => {
    const res = await request("/clients", {
        method: "POST",
        body: JSON.stringify(data),
    });
    
    return res;
};

// ───────────────────────────────────────────────────────────────
// 🔧 UTILITIES
// ───────────────────────────────────────────────────────────────

/**
 * Ambil terjemahan dari objek translatable (blog/product/category/brand)
 * @param {Array} translations - array translation objects
 * @param {string} lang - 'id' | 'en'
 * @returns {Object | null}
 */
export const getTranslation = (translations = [], lang = "id") => {
    const tr = translations.find(
        (t) => t.language?.toLowerCase() === lang.toLowerCase()
    );
    if (tr) return tr;

    // fallback ke EN jika ID tidak ada
    return translations.find((t) => t.language?.toLowerCase() === "en") || null;
};

/**
 * Format URL image → absolute (jika relatif)
 * @param {string} url
 * @returns {string}
 */
export const getImageUrl = (url) => {
    if (!url) return LogoPrimary;
    if (url.startsWith("http")) return url;
    return `${import.meta.env.VITE_PHOTO_URL}${url}`;
};
