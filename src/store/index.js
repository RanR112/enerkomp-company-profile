import { configureStore } from "@reduxjs/toolkit";
import productDetailReducer from "./productDetailSlice";
import blogDetailReducer from "./blogDetailSlice";
import languageReducer from "./languageSlice";

export const store = configureStore({
    reducer: {
        productDetail: productDetailReducer,
        blogDetail: blogDetailReducer,
        language: languageReducer,
    },
});
