// src/components/Blog/RelatedPosts/RelatedPosts.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import styles from "../../sass/components/RelatedPosts/RelatedPosts.module.scss";

const RelatedPosts = ({ currentBlogId, currentTags, allBlogs }) => {
    const { currentLanguage, t } = useLanguage();

    const getRelatedPosts = () => {
        return allBlogs
            .filter((blog) => {
                if (blog.id === currentBlogId || !blog.isPublished)
                    return false;

                const blogTags = blog.translations[currentLanguage]?.tags || [];
                const hasCommonTags = blogTags.some((tag) =>
                    currentTags.includes(tag)
                );

                return hasCommonTags;
            })
            .sort((a, b) => {
                const aTags = a.translations[currentLanguage]?.tags || [];
                const bTags = b.translations[currentLanguage]?.tags || [];

                const aCommon = aTags.filter((tag) =>
                    currentTags.includes(tag)
                ).length;
                const bCommon = bTags.filter((tag) =>
                    currentTags.includes(tag)
                ).length;

                if (aCommon !== bCommon) return bCommon - aCommon;

                return new Date(b.publishedAt) - new Date(a.publishedAt);
            })
            .slice(0, 3);
    };

    const relatedPosts = getRelatedPosts();

    if (relatedPosts.length === 0) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "short", day: "numeric" };
        return date.toLocaleDateString(
            currentLanguage === "ID" ? "id-ID" : "en-US",
            options
        );
    };

    return (
        <section className={styles.relatedWrapper}>
            <h2 className={styles.title}>{t("blog.detail.relatedPosts")}</h2>

            <div className={styles.grid}>
                {relatedPosts.map((blog) => {
                    const translation = blog.translations[currentLanguage];

                    return (
                        <article key={blog.id} className={styles.card}>
                            <Link
                                to={`/blog/${blog.slug}`}
                                className={styles.imageLink}
                            >
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={blog.image}
                                        alt={translation.title}
                                        className={styles.image}
                                        loading="lazy"
                                    />
                                </div>
                            </Link>

                            <div className={styles.content}>
                                <time
                                    className={styles.date}
                                    dateTime={blog.publishedAt}
                                >
                                    {formatDate(blog.publishedAt)}
                                </time>

                                <Link
                                    to={`/blog/${blog.slug}`}
                                    className={styles.titleLink}
                                >
                                    <h3 className={styles.cardTitle}>
                                        {translation.title}
                                    </h3>
                                </Link>

                                <p className={styles.excerpt}>
                                    {translation.excerpt}
                                </p>

                                {translation.tags &&
                                    translation.tags.length > 0 && (
                                        <div className={styles.tags}>
                                            {translation.tags
                                                .slice(0, 2)
                                                .map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className={styles.tag}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                        </div>
                                    )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default RelatedPosts;
