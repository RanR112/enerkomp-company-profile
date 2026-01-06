import { createSlice } from "@reduxjs/toolkit";

const blogDetailSlice = createSlice({
    name: "blogDetail",
    initialState: {
        selectedBlogId: localStorage.getItem("selectedBlogId") || null,
    },
    reducers: {
        setSelectedBlogId: (state, action) => {
            state.selectedBlogId = action.payload;
        },
        clearSelectedBlogId: (state) => {
            state.selectedBlogId = null;
        },
    },
});

export const { setSelectedBlogId, clearSelectedBlogId } = blogDetailSlice.actions;
export default blogDetailSlice.reducer;
