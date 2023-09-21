import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const issuedBooksApi = createApi({
    reducerPath: "issuedBooksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3500",
    }),
    tagTypes: ["issuedBooks"],
    endpoints: (builder) => ({
        getAllIssuedBooks: builder.query({
            query: ({ keyword, date }) => ({
                url: `/issued_books?keyword=${keyword}&date=${date}`,
                method: "GET",
            }),
            providesTags: ["issuedBooks"],
        }),

        addNewIssuedBooks: builder.mutation({
            query: (book) => ({
                url: "/issued_books",
                method: "POST",
                body: book,
            }),
            invalidatesTags: ["issuedBooks"],
        }),

        renewIssuedBooks: builder.mutation({
            query: (copiedId) => ({
                url: "/issued_books/renew",
                method: "PUT",
                body: { copiedId },
            }),
            invalidatesTags: ["issuedBooks"],
        }),

        deleteIssuedBooks: builder.mutation({
            query: (copiedId) => ({
                url: "/issued_books",
                method: "PUT",
                body: { copiedId },
            }),
            invalidatesTags: ["issuedBooks"],
        }),

        getAllOverDueBooks: builder.query({
            query: () => ({
                url: "/issued_books/overdue_books",
                method: "GET",
            }),
            providesTags: ["issuedBooks"],
        }),
    }),
});

export const {
    useGetAllIssuedBooksQuery,
    useAddNewIssuedBooksMutation,
    useDeleteIssuedBooksMutation,
    useRenewIssuedBooksMutation,
    useGetAllOverDueBooksQuery,
} = issuedBooksApi;
