import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import { baseApi } from "../core/global/apis/baseApi";
import notiSlice from "../core/global/context/notiSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        authSlice: authSlice,
        notiSlice: notiSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});
