// src/components/Blog/BlogCard/BlogCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import styles from "../../sass/components/BlogCard/BlogCard.module.scss";
import { setSelectedBlogId } from "../../store/blogDetailSlice";
import { useDispatch } from "react-redux";

const BlogCard = ({ blog }) => {
    const { currentLanguage, t } = useLanguage();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Gunakan blog.translation dari useBlogs
    const translation = blog.translation || {};

    const handleCardClick = () => {
        if (!blog.slug) return;
        localStorage.setItem("selectedBlogId", blog.id);
        dispatch(setSelectedBlogId(blog.id));
        navigate(`/blog/${blog.slug}`);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(
            currentLanguage === "ID" ? "id-ID" : "en-US",
            options
        );
    };

    const calculateReadTime = (content = "") => {
        const wordsPerMinute = 200;
        const textContent = content.replace(/<[^>]*>/g, "");
        const wordCount = textContent.split(/\s+/).filter(Boolean).length;
        return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    };

    return (
        <article className={styles.card} onClick={handleCardClick}>
            <div to={`/blog/${blog.slug}`} className={styles.imageLink}>
                <div className={styles.imageWrapper}>
                    {blog.image && (
                        <img
                            src={import.meta.env.VITE_PHOTO_URL + blog.image}
                            alt={translation.title || "Blog Image"}
                            className={styles.image}
                            loading="lazy"
                        />
                    )}
                    {blog.isFeatured && (
                        <span className={styles.featuredBadge}>Featured</span>
                    )}
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.meta}>
                    {blog.publishedAt && (
                        <time
                            className={styles.date}
                            dateTime={blog.publishedAt}
                        >
                            {formatDate(blog.publishedAt)}
                        </time>
                    )}
                    <span className={styles.separator}>•</span>
                    <span className={styles.readTime}>
                        {calculateReadTime(translation.content)}{" "}
                        {t("blog.card.minRead")}
                    </span>
                </div>

                <div to={`/blog/${blog.slug}`} className={styles.titleLink}>
                    <h3 className={styles.title}>
                        {translation.title || "No Title"}
                    </h3>
                </div>

                {translation.excerpt && (
                    <p className={styles.excerpt}>{translation.excerpt}</p>
                )}

                {translation.tags && translation.tags.length > 0 && (
                    <div className={styles.tags}>
                        {translation.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div to={`/blog/${blog.slug}`} className={styles.readMore}>
                    {t("blog.card.readMore")}
                    <svg
                        className={styles.arrow}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            d="M6 12l4-4-4-4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
