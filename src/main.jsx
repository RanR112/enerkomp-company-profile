import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageProvider.jsx";

createRoot(document.getElementById("root")).render(
    <LanguageProvider>
        <RouterProvider router={router} />
    </LanguageProvider>
);
