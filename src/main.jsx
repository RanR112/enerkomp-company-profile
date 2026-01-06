import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageProvider.jsx";
import { Provider } from "react-redux";
import { store } from "./store/index.js";

createRoot(document.getElementById("root")).render(
    <LanguageProvider>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </LanguageProvider>
);
