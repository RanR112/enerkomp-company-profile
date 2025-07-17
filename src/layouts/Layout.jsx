import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
