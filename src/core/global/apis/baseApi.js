import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api"}
        // {baseUrl: "https://8e59-116-206-138-56.ngrok-free.app/api"}
    ),
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
