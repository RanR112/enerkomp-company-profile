import { createBrowserRouter } from "react-router-dom";
import {
    About,
    Blog,
    BlogDetail,
    Contact,
    Home,
    Product,
    Service,
    PrivacyPolicy,
} from "./pages";
import Layout from "./layouts/Layout";
import ProductDetail from "./components/ProductDetail";
import SearchResults from "./components/SearchResult";
import NotFound from "./components/NotFound";
import CatalogLoader from "./components/CatalogLoader";

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
                path: "product/:slug",
                element: <ProductDetail key="product-detail" />,
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
                path: "blog/:slug",
                element: <BlogDetail key="blog-detail" />,
            },
            {
                path: "legal/privacy-policy",
                element: <PrivacyPolicy key="privacy-policy" />,
            },
            // {
            //     path: "service",
            //     element: <Service key="service" />,
            // },
            // {
            //     path: "search",
            //     element: <SearchResults key="search-result" />,
            // },
        ],
    },
    {
        path: "/catalog",
        element: <CatalogLoader key="catalog" />,
    },
    {
        path: "*",
        element: <NotFound key="not-found" />,
    },
]);

export default router;
