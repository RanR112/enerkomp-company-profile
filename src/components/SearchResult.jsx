import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import "../sass/components/SearchResult/SearchResult.css";

const SearchResults = () => {
    const location = useLocation();
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    // Get search query from URL
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    // Sample categories for filtering
    const categories = [
        { id: "all", name: t("search.categories.all") || "All" },
        { id: "products", name: t("search.categories.products") || "Products" },
        { id: "services", name: t("search.categories.services") || "Services" },
        { id: "about", name: t("search.categories.about") || "About" },
        { id: "contact", name: t("search.categories.contact") || "Contact" },
    ];

    // Mock search function - replace with actual search logic
    const performSearch = async (searchQuery) => {
        setIsLoading(true);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock search results - replace with actual search implementation
        const mockResults = [
            {
                id: 1,
                title: "Generator Diesel 500 KVA",
                category: "products",
                description:
                    "High-quality diesel generator suitable for industrial applications with reliable performance and efficient fuel consumption.",
                url: "/product/generator-diesel-500kva",
                thumbnail: "/images/products/generator-1.jpg",
            },
            {
                id: 2,
                title: "Industrial Compressor Services",
                category: "services",
                description:
                    "Professional maintenance and repair services for industrial air compressors with certified technicians.",
                url: "/service/compressor-maintenance",
                thumbnail: "/images/services/compressor-service.jpg",
            },
            {
                id: 3,
                title: "About Our Company",
                category: "about",
                description:
                    "Learn more about Enerkomp Persada Raya, our history, mission, and commitment to excellence in energy solutions.",
                url: "/about",
                thumbnail: "/images/about/company-profile.jpg",
            },
            {
                id: 4,
                title: "Contact Information",
                category: "contact",
                description:
                    "Get in touch with our team for inquiries about products, services, and business partnerships.",
                url: "/contact",
                thumbnail: "/images/contact/office.jpg",
            },
        ];

        // Filter results based on search query
        const filtered = mockResults.filter(
            (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );

        setResults(filtered);
        setFilteredResults(filtered);
        setIsLoading(false);
    };

    // Filter results by category
    const filterByCategory = (category) => {
        if (category === "all") {
            setFilteredResults(results);
        } else {
            setFilteredResults(
                results.filter((item) => item.category === category)
            );
        }
        setSelectedCategory(category);
    };

    // Perform search when component mounts or query changes
    useEffect(() => {
        if (query && query.trim()) {
            performSearch(query.trim());
        } else {
            setResults([]);
            setFilteredResults([]);
            setIsLoading(false);
        }
    }, [query]);

    // Reset category filter when results change
    useEffect(() => {
        setSelectedCategory("all");
    }, [results]);

    return (
        <div className="search-results">
            <div className="search-results__container">
                {/* Header */}
                <div className="search-results__header">
                    <div className="search-results__title-section">
                        <h1 className="search-results__title">
                            {t("search.results.title") || "Search Results"}
                        </h1>
                        {query && (
                            <p className="search-results__query">
                                {t("search.results.for") || "Searching for:"} "
                                {query}"
                            </p>
                        )}
                    </div>

                    {/* Filter Toggle for Mobile */}
                    <button
                        className="search-results__filter-toggle"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={20} />
                        {t("search.filters") || "Filters"}
                    </button>
                </div>

                <div className="search-results__content">
                    {/* Sidebar Filters */}
                    <aside
                        className={`search-results__sidebar ${
                            showFilters ? "show" : ""
                        }`}
                    >
                        <div className="search-results__filter-header">
                            <h3>
                                {t("search.categories.title") || "Categories"}
                            </h3>
                            <button
                                className="search-results__filter-close"
                                onClick={() => setShowFilters(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="search-results__categories">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`search-results__category ${
                                        selectedCategory === category.id
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        filterByCategory(category.id)
                                    }
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="search-results__main">
                        {/* Results Count */}
                        {!isLoading && (
                            <div className="search-results__meta">
                                <p className="search-results__count">
                                    {filteredResults.length}{" "}
                                    {t("search.results.found") ||
                                        "results found"}
                                    {selectedCategory !== "all" && (
                                        <span className="search-results__category-filter">
                                            {t("search.in") || "in"}{" "}
                                            {
                                                categories.find(
                                                    (c) =>
                                                        c.id ===
                                                        selectedCategory
                                                )?.name
                                            }
                                        </span>
                                    )}
                                </p>
                            </div>
                        )}

                        {/* Loading State */}
                        {isLoading && (
                            <div className="search-results__loading">
                                <div className="search-results__spinner"></div>
                                <p>{t("search.loading") || "Searching..."}</p>
                            </div>
                        )}

                        {/* No Query State */}
                        {!query && !isLoading && (
                            <div className="search-results__empty">
                                <Search
                                    size={64}
                                    className="search-results__empty-icon"
                                />
                                <h2>
                                    {t("search.empty.title") ||
                                        "No search query"}
                                </h2>
                                <p>
                                    {t("search.empty.description") ||
                                        "Please enter a search term to find results."}
                                </p>
                            </div>
                        )}

                        {/* No Results State */}
                        {query &&
                            !isLoading &&
                            filteredResults.length === 0 && (
                                <div className="search-results__no-results">
                                    <Search
                                        size={64}
                                        className="search-results__no-results-icon"
                                    />
                                    <h2>
                                        {t("search.noResults.title") ||
                                            "No results found"}
                                    </h2>
                                    <p>
                                        {t("search.noResults.description") ||
                                            "Try adjusting your search terms or browse our categories."}
                                    </p>
                                </div>
                            )}

                        {/* Results Grid */}
                        {!isLoading && filteredResults.length > 0 && (
                            <div className="search-results__grid">
                                {filteredResults.map((result) => (
                                    <div
                                        key={result.id}
                                        className="search-result-card"
                                    >
                                        <div className="search-result-card__image">
                                            <img
                                                src={result.thumbnail}
                                                alt={result.title}
                                                onError={(e) => {
                                                    e.target.src =
                                                        "/images/placeholder.jpg";
                                                }}
                                            />
                                            <span className="search-result-card__category">
                                                {
                                                    categories.find(
                                                        (c) =>
                                                            c.id ===
                                                            result.category
                                                    )?.name
                                                }
                                            </span>
                                        </div>
                                        <div className="search-result-card__content">
                                            <h3 className="search-result-card__title">
                                                <a href={result.url}>
                                                    {result.title}
                                                </a>
                                            </h3>
                                            <p className="search-result-card__description">
                                                {result.description}
                                            </p>
                                            <a
                                                href={result.url}
                                                className="search-result-card__link"
                                            >
                                                {t("search.readMore") ||
                                                    "Read More"}{" "}
                                                →
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
