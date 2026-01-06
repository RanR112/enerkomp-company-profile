// src/pages/Blog/BlogDetail.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Blog/Breadcrumb";
import SocialShare from "../components/Blog/SocialShare";
import RelatedPosts from "../components/Blog/RelatedPosts";
import styles from "../sass/pages/BlogDetail/BlogDetail.module.scss";
import { useBlogDetail } from "../hooks/useBlogDetail";
import BlogDetailSkeleton from "../components/Blog/BlogDetailSkeleton";

const PHOTO_URL = import.meta.env.VITE_PHOTO_URL || "";

const BlogDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { currentLanguage, t } = useLanguage();
    const { blog, relatedBlogs, loading, error, refetch } = useBlogDetail();

    const getTranslatedContent = () => {
        if (!blog) return {};

        if (blog.translation) {
            const tr = blog.translation;
            return {
                title: /*tr.metaTitle ||*/ tr.title,
                excerpt: tr.excerpt || "",
                content: tr.content || "",
                tags: tr.tags || null,
                metaTitle: tr.metaTitle || tr.title,
                metaDescription: tr.metaDescription || "",
                metaKeywords: tr.metaKeywords || "",
            };
        }

        return {
            title: blog.name || "Untitled",
            excerpt: "",
            content: "",
            tags: null,
            metaTitle: blog.name || "Product",
            metaDescription: "",
            metaKeywords: "",
        };
    };

    const {
        title,
        excerpt,
        content,
        tags,
        metaTitle,
        metaDescription,
        metaKeywords,
    } = getTranslatedContent();

    useEffect(() => {
        if (blog && metaTitle) {
            document.title = `${metaTitle} | Enerkomp Persada Raya`;

            let metaDescTag = document.querySelector(
                'meta[name="description"]'
            );
            if (!metaDescTag) {
                metaDescTag = document.createElement("meta");
                metaDescTag.name = "description";
                document.head.appendChild(metaDescTag);
            }
            metaDescTag.content = metaDescription;

            let metaKeywordsTag = document.querySelector(
                'meta[name="keywords"]'
            );
            if (!metaKeywordsTag) {
                metaKeywordsTag = document.createElement("meta");
                metaKeywordsTag.name = "keywords";
                document.head.appendChild(metaKeywordsTag);
            }
            metaKeywordsTag.content = metaKeywords;
        }

        return () => {
            document.title = "Enerkomp Persada Raya";
        };
    }, [blog, metaTitle, metaDescription, metaKeywords]);

    // const getProductImages = () => {
    //     if (!blog) return [];
    //     if (blog.images && blog.images.length > 0) {
    //         return blog.images.map((img) => `${PHOTO_URL}${img}`);
    //     }
    //     return [];
    // };

    const currentUrl = `${window.location.origin}/blog/${slug}`;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(
            currentLanguage === "ID" ? "id-ID" : "en-US",
            options
        );
    };

    const breadcrumbItems = [
        { label: t("nav.home"), path: "/" },
        { label: t("nav.blog"), path: "/blog" },
        { label: title, path: `/blog/${slug}` },
    ];

    // Variants
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.35, ease: "easeOut" },
        },
    };
    const fade = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.35 } },
    };
    const stagger = { show: { transition: { staggerChildren: 0.12 } } };

    if (loading || !blog) {
        return <BlogDetailSkeleton />;
    }

    return (
        <motion.div
            className={styles.blogDetail}
            initial="hidden"
            animate="show"
            variants={fade}
        >
            <div className={styles.container}>
                <motion.div variants={fadeUp}>
                    <Breadcrumb items={breadcrumbItems} />
                </motion.div>

                <motion.article className={styles.article} variants={stagger}>
                    {/* Header Image */}
                    <motion.div
                        className={styles.headerImage}
                        variants={fadeUp}
                    >
                        <motion.img
                            src={import.meta.env.VITE_PHOTO_URL + blog.image}
                            alt={title}
                            className={styles.image}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: { duration: 0.35 },
                            }}
                        />
                    </motion.div>

                    {/* Article Header */}
                    <header className={styles.header}>
                        <motion.h1 className={styles.title} variants={fadeUp}>
                            {title}
                        </motion.h1>

                        {excerpt && (
                            <motion.p
                                className={styles.excerpt}
                                variants={fadeUp}
                            >
                                {excerpt}
                            </motion.p>
                        )}

                        {/* Meta Section */}
                        <motion.div className={styles.meta} variants={stagger}>
                            <motion.div
                                className={styles.metaItem}
                                variants={fadeUp}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <path
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM10 6v4l3 2"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <time dateTime={blog.publishedAt}>
                                    {t("blog.detail.publishedOn")}{" "}
                                    {formatDate(blog.publishedAt)}
                                </time>
                            </motion.div>

                            {blog.author && (
                                <motion.div
                                    className={styles.metaItem}
                                    variants={fadeUp}
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                    >
                                        <circle
                                            cx="10"
                                            cy="7"
                                            r="3"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M4 18c0-3.314 2.686-6 6-6s6 2.686 6 6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span>
                                        {t("blog.detail.author")}:{" "}
                                        {blog.author.name}
                                    </span>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Tags */}
                        {tags?.length > 0 && (
                            <motion.div
                                className={styles.tags}
                                variants={fadeUp}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M2 8.5L8.5 2 14 2v5.5L8.5 14 2 8.5z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <circle
                                        cx="10.5"
                                        cy="5.5"
                                        r="1"
                                        fill="currentColor"
                                    />
                                </svg>

                                {tags.map((tag, index) => (
                                    <motion.span
                                        key={index}
                                        className={styles.tag}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.3,
                                                delay: index * 0.07,
                                            },
                                        }}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}
                    </header>

                    {/* Article Content */}
                    <motion.div
                        className={styles.content}
                        variants={fadeUp}
                        dangerouslySetInnerHTML={{
                            __html: content,
                        }}
                    />
                    {/* Blog Link */}
                    {blog.link && (
                        <a
                            href={blog.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.externalLink}
                        >
                            <motion.div
                                className={styles.externalLinkWrapper}
                                variants={fadeUp}
                            >
                                <svg
                                    className={styles.externalLinkIcon}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <path
                                        d="M10 4h6m0 0v6m0-6L9 11"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15 15H5V5"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                {t("blog.detail.link")}
                            </motion.div>
                        </a>
                    )}

                    {/* Social Share */}
                    <motion.div
                        className={styles.shareSection}
                        variants={fadeUp}
                    >
                        <SocialShare url={currentUrl} title={title} />
                    </motion.div>
                </motion.article>

                {/* Related Posts */}
                <motion.div variants={fadeUp}>
                    <RelatedPosts
                        currentBlogId={blog.id}
                        currentTags={tags || []}
                        allBlogs={relatedBlogs}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default BlogDetail;
