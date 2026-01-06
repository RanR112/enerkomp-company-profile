import { createSlice } from "@reduxjs/toolkit";

const productDetailSlice = createSlice({
    name: "productDetail",
    initialState: {
        selectedProductId: localStorage.getItem("selectedProductId") || null,
    },
    reducers: {
        setSelectedProductId: (state, action) => {
            state.selectedProductId = action.payload;
        },
        clearSelectedProductId: (state) => {
            state.selectedProductId = null;
        },
    },
});

export const { setSelectedProductId, clearSelectedProductId } = productDetailSlice.actions;
export default productDetailSlice.reducer;
