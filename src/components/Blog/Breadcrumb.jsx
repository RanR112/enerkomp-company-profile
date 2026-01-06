// src/components/Blog/Breadcrumb/Breadcrumb.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import styles from "../../sass/components/Breadcrumb/Breadcrumb.module.scss";

const Breadcrumb = ({ items }) => {
    const { t } = useLanguage();

    return (
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol className={styles.list}>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className={styles.item}>
                            {!isLast ? (
                                <>
                                    <Link
                                        to={item.path}
                                        className={styles.link}
                                    >
                                        {item.label}
                                    </Link>
                                    <span
                                        className={styles.separator}
                                        aria-hidden="true"
                                    >
                                        /
                                    </span>
                                </>
                            ) : (
                                <span
                                    className={styles.current}
                                    aria-current="page"
                                >
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
