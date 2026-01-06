// src/components/Blog/BlogSearch/BlogSearch.jsx
import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import styles from "../../sass/components/BlogSearch/BlogSearch.module.scss";

const BlogSearch = ({ searchQuery, onSearchChange }) => {
    const { t } = useLanguage();

    return (
        <div className={styles.searchWrapper}>
            <div className={styles.searchBox}>
                <svg
                    className={styles.searchIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder={t("blog.search.placeholder")}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    aria-label={t("blog.search.placeholder")}
                />
                {searchQuery && (
                    <button
                        className={styles.clearButton}
                        onClick={() => onSearchChange("")}
                        aria-label="Clear search"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M12 4L4 12M4 4l8 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default BlogSearch;
