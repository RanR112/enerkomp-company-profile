import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Blog/Breadcrumb";
import BlogSearch from "../components/Blog/BlogSearch";
import BlogFilter from "../components/Blog/BlogFilter";
import BlogCard from "../components/Blog/BlogCard";
import Pagination from "../components/Blog/Pagination";
import { useBlogs } from "../hooks/useBlogs";
import styles from "../sass/pages/Blog/Blog.module.scss";

const ITEMS_PER_PAGE = 6;

const Blog = () => {
    const { currentLanguage, t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Ambil data blog dari hook
    const { blogs, loading, error, refetch } = useBlogs();

    // Reset ke page 1 jika filter/search berubah
    useEffect(() => setCurrentPage(1), [searchQuery, selectedTags]);

    // Ambil semua tag unik
    const allTags = useMemo(() => {
        const tagsSet = new Set();
        blogs.forEach((blog) => {
            if (blog.isPublished && blog.translation) {
                const tags = blog.translation.tags || [];
                tags.forEach((tag) => tagsSet.add(tag));
            }
        });
        return Array.from(tagsSet).sort();
    }, [blogs]);

    // Filter dan sort blogs
    const filteredBlogs = useMemo(() => {
        return blogs
            .filter((blog) => {
                if (!blog.isPublished) return false;
                const translation = blog.translation;
                if (!translation) return false;

                // Filter search
                if (searchQuery) {
                    const q = searchQuery.toLowerCase();
                    const titleMatch = translation.title
                        ?.toLowerCase()
                        .includes(q);
                    const excerptMatch = translation.excerpt
                        ?.toLowerCase()
                        .includes(q);
                    if (!titleMatch && !excerptMatch) return false;
                }

                // Filter tags
                if (selectedTags.length > 0) {
                    const blogTags = translation.tags || [];
                    if (!selectedTags.some((tag) => blogTags.includes(tag)))
                        return false;
                }

                return true;
            })
            .sort((a, b) => {
                if (a.isFeatured && !b.isFeatured) return -1;
                if (!a.isFeatured && b.isFeatured) return 1;
                return new Date(b.publishedAt) - new Date(a.publishedAt);
            });
    }, [blogs, searchQuery, selectedTags]);

    // Pagination
    const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

    const handleTagToggle = (tag) =>
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );

    const handleClearFilters = () => {
        setSelectedTags([]);
        setSearchQuery("");
    };

    const breadcrumbItems = [
        { label: t("nav.home"), path: "/" },
        { label: t("nav.blog"), path: "/blog" },
    ];

    return (
        <div className={styles.blogPage}>
            {/* HERO */}
            <motion.div
                className={styles.hero}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{t("blog.title")}</h1>
                    <p className={styles.heroSubtitle}>{t("blog.subtitle")}</p>
                </div>
            </motion.div>

            <div className={styles.container}>
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                >
                    <Breadcrumb items={breadcrumbItems} />
                </motion.div>

                {/* Search input */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                >
                    <BlogSearch
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </motion.div>

                {/* Filters */}
                {allTags.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                    >
                        <BlogFilter
                            allTags={allTags}
                            selectedTags={selectedTags}
                            onTagToggle={handleTagToggle}
                            onClearFilters={handleClearFilters}
                        />
                    </motion.div>
                )}

                {/* Loading */}
                {loading && (
                    <div className={styles.loading}>Loading blogs...</div>
                )}

                {/* Error */}
                {error && (
                    <div className={styles.error}>
                        <p>{error}</p>
                        <button onClick={refetch}>Retry</button>
                    </div>
                )}

                {/* Blog Grid */}
                {currentBlogs.length > 0 ? (
                    <>
                        <motion.div
                            className={styles.blogGrid}
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: { staggerChildren: 0.1 },
                                },
                            }}
                        >
                            {currentBlogs.map((blog) => (
                                <motion.div
                                    key={blog.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <BlogCard blog={blog} />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                        >
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                totalItems={filteredBlogs.length}
                                itemsPerPage={ITEMS_PER_PAGE}
                            />
                        </motion.div>
                    </>
                ) : (
                    !loading && (
                        <motion.div
                            className={styles.noResults}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3>{t("blog.search.noResults")}</h3>
                            <button
                                className={styles.resetButton}
                                onClick={handleClearFilters}
                            >
                                {t("blog.filter.clearFilters")}
                            </button>
                        </motion.div>
                    )
                )}
            </div>
        </div>
    );
};

export default Blog;
