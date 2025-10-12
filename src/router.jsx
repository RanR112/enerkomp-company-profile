import { createBrowserRouter } from "react-router-dom";
import { About, Blog, Contact, Home, Product, Service, PrivacyPolicy } from "./pages";
import Layout from "./layouts/Layout";
import ProductDetail from "./components/ProductDetail";
import SearchResults from "./components/SearchResult";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home key="home" />,
            },
            {
                path: "about",
                element: <About key="about" />,
            },
            {
                path: "products",
                element: <Product key="products" />,
            },
            {
                path: "product/:slug", // Route untuk detail produk
                element: <ProductDetail key="product-detail" />,
            },
            {
                path: "service",
                element: <Service key="service" />,
            },
            {
                path: "contact",
                element: <Contact key="contact" />,
            },
            {
                path: "blog",
                element: <Blog key="blog" />,
            },
            {
                path: "search",
                element: <SearchResults key="search-result" />,
            },
            {
                path: "legal/privacy-policy",
                element: <PrivacyPolicy key="privacy-policy" />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound key="not-found" />,
    },
]);

export default router;
