// src/components/Blog/Pagination/Pagination.jsx
import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import styles from "../../sass/components/Pagination/Pagination.module.scss";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
}) => {
    const { t } = useLanguage();

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++)
                    pages.push(i);
            } else {
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++)
                    pages.push(i);
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePageClick = (page) => {
        if (page !== "..." && page !== currentPage) {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    if (totalPages <= 1) return null;

    return (
        <div className={styles.paginationWrapper}>
            <div className={styles.info}>
                {t("blog.pagination.showing")} <strong>{startItem}</strong>{" "}
                {t("blog.pagination.to")} <strong>{endItem}</strong>{" "}
                {t("blog.pagination.results")} <strong>{totalItems}</strong>
            </div>

            <nav className={styles.pagination} aria-label="Pagination">
                <button
                    className={`${styles.button} ${styles.navButton}`}
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    aria-label={t("blog.pagination.previous")}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M10 12L6 8l4-4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className={styles.navText}>
                        {t("blog.pagination.previous")}
                    </span>
                </button>

                <div className={styles.pages}>
                    {getPageNumbers().map((page, index) => (
                        <button
                            key={index}
                            className={`${styles.button} ${styles.pageButton} ${
                                page === currentPage ? styles.active : ""
                            } ${page === "..." ? styles.dots : ""}`}
                            onClick={() => handlePageClick(page)}
                            disabled={page === "..."}
                            aria-label={
                                page !== "..."
                                    ? `${t("blog.pagination.page")} ${page}`
                                    : undefined
                            }
                            aria-current={
                                page === currentPage ? "page" : undefined
                            }
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    className={`${styles.button} ${styles.navButton}`}
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    aria-label={t("blog.pagination.next")}
                >
                    <span className={styles.navText}>
                        {t("blog.pagination.next")}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M6 12l4-4-4-4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
