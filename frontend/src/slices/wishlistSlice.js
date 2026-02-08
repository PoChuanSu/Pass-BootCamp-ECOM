import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlistItems: localStorage.getItem("wishlistItems")
        ? JSON.parse(localStorage.getItem("wishlistItems"))
        : [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        toggleLike: (state, action) => {
            const product = action.payload;
            const existItem = state.wishlistItems.find(
                (x) => x._id === product._id,
            );

            if (existItem) {
                state.wishlistItems = state.wishlistItems.filter(
                    (x) => x._id !== product._id,
                );
            } else {
                state.wishlistItems.push(product);
            }
            localStorage.setItem(
                "wishlistItems",
                JSON.stringify(state.wishlistItems),
            );
        },
    },
});

export const { toggleLike } = wishlistSlice.actions;

export default wishlistSlice.reducer;
