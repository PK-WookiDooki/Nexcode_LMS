import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.110.223:8080/api" }),
    tagTypes: [
        "books",
        "issuedBooks",
        "members",
        "copiedBooks",
        "auth",
        "settings",
    ],
    endpoints: () => ({}),
});
