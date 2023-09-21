import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "./books/booksApi";
import { issuedBooksApi } from "./issuedBooks/issuedBooksApi";
import { copiedBooksApi } from "./copiedBooks/copiedBooksApi";
import { membersApi } from "./members/membersApi";
import { adminApi } from "./admin/adminApi";
import authSlice from "./admin/authSlice";
import booksSlice from "./books/booksSlice";

export const store = configureStore({
    reducer: {
        [booksApi.reducerPath]: booksApi.reducer,
        [issuedBooksApi.reducerPath]: issuedBooksApi.reducer,
        [copiedBooksApi.reducerPath]: copiedBooksApi.reducer,
        [membersApi.reducerPath]: membersApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        authSlice: authSlice,
        booksSlice: booksSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            booksApi.middleware,
            issuedBooksApi.middleware,
            copiedBooksApi.middleware,
            membersApi.middleware,
            adminApi.middleware
        ),
});
