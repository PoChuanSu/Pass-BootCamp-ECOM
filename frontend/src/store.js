import { configureStore } from "@reduxjs/toolkit"; //  npm i @reduxjs/toolkit react-redux
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
