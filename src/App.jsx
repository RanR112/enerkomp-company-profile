import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import { About, Blog, Contact, Home, Product, Service } from "./pages";
import Footer from "./components/Footer";
import { LanguageProvider } from "./contexts/LanguageProvider";

const SearchResults = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    return (
        <div
            style={{
                padding: "2rem",
                minHeight: "100vh",
                background: "#f8f9fa",
            }}
        >
            <h1>Search Results</h1>
            <p>Searching for: "{query}"</p>
        </div>
    );
};

function App() {
    return (
        <LanguageProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/service" element={<Service />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/search" element={<SearchResults />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </LanguageProvider>
    );
}

export default App;
