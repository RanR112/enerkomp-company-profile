import React from "react";
import styles from "../../sass/components/BlogDetailSkeleton/BlogDetailSkeleton.module.scss";

const BlogDetailSkeleton = () => {
    return (
        <div className={styles.blogDetail}>
            <div className={styles.container}>
                {/* Breadcrumb */}
                <div className={styles.breadcrumb} />

                <article className={styles.article}>
                    {/* Header Image */}
                    <div className={`${styles.skeleton} ${styles.image}`} />

                    {/* Header */}
                    <div className={styles.header}>
                        <div className={`${styles.skeleton} ${styles.title}`} />
                        <div
                            className={`${styles.skeleton} ${styles.excerpt}`}
                        />

                        <div className={styles.meta}>
                            <div
                                className={`${styles.skeleton} ${styles.metaItem}`}
                            />
                            <div
                                className={`${styles.skeleton} ${styles.metaItem}`}
                            />
                        </div>

                        <div className={styles.tags}>
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className={`${styles.skeleton} ${styles.tag}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className={styles.content}>
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className={`${styles.skeleton} ${styles.line}`}
                            />
                        ))}
                    </div>
                </article>

                {/* Related Posts */}
                <div className={styles.related}>
                    <div className={`${styles.skeleton} ${styles.section}`} />
                    <div className={styles.relatedGrid}>
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`${styles.skeleton} ${styles.relatedCard}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailSkeleton;
