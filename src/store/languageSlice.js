import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    preferredLanguage: localStorage.getItem("preferredLanguage") || "EN",
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.preferredLanguage = action.payload;
            localStorage.setItem("preferredLanguage", action.payload);
        },
    },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
