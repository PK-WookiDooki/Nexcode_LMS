import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import booksSlice from "./books/booksSlice";
import { baseApi } from "../core/global/apis/baseApi";
import notiSlice from "../core/global/context/notiSlice";
import issuedSlice from "./issuedBooks/issuedSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        authSlice: authSlice,
        booksSlice: booksSlice,
        notiSlice: notiSlice,
        issuedSlice: issuedSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});
