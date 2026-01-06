// src/components/Blog/BlogFilter/BlogFilter.jsx
import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import styles from "../../sass/components/BlogFilter/BlogFilter.module.scss";

const BlogFilter = ({ allTags, selectedTags, onTagToggle, onClearFilters }) => {
    const { t } = useLanguage();

    return (
        <div className={styles.filterWrapper}>
            <div className={styles.filterHeader}>
                <h3 className={styles.filterTitle}>
                    {t("blog.filter.filterByTag")}
                </h3>
                {selectedTags.length > 0 && (
                    <button
                        className={styles.clearButton}
                        onClick={onClearFilters}
                    >
                        {t("blog.filter.clearFilters")}
                    </button>
                )}
            </div>

            <div className={styles.tagList}>
                {allTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);

                    return (
                        <button
                            key={tag}
                            className={`${styles.tagButton} ${
                                isSelected ? styles.selected : ""
                            }`}
                            onClick={() => onTagToggle(tag)}
                            aria-pressed={isSelected}
                        >
                            {tag}
                            {isSelected && (
                                <svg
                                    className={styles.checkIcon}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                >
                                    <path
                                        d="M13.5 4.5L6 12L2.5 8.5"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </button>
                    );
                })}
            </div>

            {selectedTags.length > 0 && (
                <div className={styles.selectedInfo}>
                    <span className={styles.selectedLabel}>
                        {t("blog.filter.selectedTags")}:
                    </span>
                    <span className={styles.selectedCount}>
                        {selectedTags.length}
                    </span>
                </div>
            )}
        </div>
    );
};

export default BlogFilter;
