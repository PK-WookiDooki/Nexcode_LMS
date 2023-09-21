import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
    tagTypes: ["books", "copiedBooks"],
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => ({
                url: `/books`,
                method: "GET",
            }),
            providesTags: ["books"],
        }),

        addNewBooks: builder.mutation({
            query: (book) => ({
                url: "/books",
                method: "POST",
                body: book,
            }),
            invalidatesTags: ["books", "copiedBooks"],
        }),

        updateBooks: builder.mutation({
            query: (book) => ({
                url: "/books",
                method: "PUT",
                body: book,
            }),
            invalidatesTags: ["books", "copiedBooks"],
        }),

        deleteBooks: builder.mutation({
            query: (bookId) => ({
                url: "/books",
                method: "DELETE",
                body: { bookId },
            }),
            invalidatesTags: ["books", "copiedBooks"],
        }),

        getAllCopiedBooks: builder.query({
            query: () => ({
                url: "/copied_books",
                method: "GET",
            }),
            providesTags: ["copiedBooks", "books"],
        }),

        getAllCPBByOrgBId: builder.query({
            query: (bookId) => ({
                url: `/copied_books/${bookId}`,
                method: "GET",
            }),
            providesTags: ["copiedBooks", "books"],
        }),

        setCPBStatus: builder.mutation({
            query: (book) => ({
                url: "/copied_books",
                method: "PUT",
                body: book,
            }),
            invalidatesTags: ["copiedBooks", "books"],
        }),
    }),
});

export const {
    useGetAllBooksQuery,
    useAddNewBooksMutation,
    useUpdateBooksMutation,
    useDeleteBooksMutation,
    useGetAllCopiedBooksQuery,
    useSetCPBStatusMutation,
    useGetAllCPBByOrgBIdQuery,
} = booksApi;
