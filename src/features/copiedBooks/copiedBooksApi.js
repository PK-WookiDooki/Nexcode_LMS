import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const copiedBooksApi = createApi({
    reducerPath: "copiedBooksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3500/copied_books",
    }),
    tagTypes: ["copiedBooks"],
    endpoints: (builder) => ({
        getAllCopiedBooks: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["copiedBooks"],
        }),
        setCPBooksStatus: builder.mutation({
            query: () => ({
                url: "/",
                method: "PUT",
            }),
            invalidatesTags: ["copiedBooks"],
        }),
    }),
});

export const { useGetAllCopiedBooksQuery, useSetCPBooksStatusMutation } =
    copiedBooksApi;
