//injections
import { baseApi } from "@/core/global/apis/baseApi";
const endPoint = "/books";
export const booksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: (token) => ({
                url: `${endPoint}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["books", "copiedBooks", "issuedBooks"],
        }),

        addNewBooks: builder.mutation({
            query: ({ bookData, token }) => ({
                url: `${endPoint}`,
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: bookData,
            }),
            invalidatesTags: ["books", "copiedBooks"],
        }),

        updateBooks: builder.mutation({
            query: ({ bookData, token }) => ({
                url: `${endPoint}/book-title`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: bookData,
            }),
            invalidatesTags: ["books", "copiedBooks", "issuedBooks"],
        }),

        addMoreBooks: builder.mutation({
            query: ({ bookData, token }) => ({
                url: `${endPoint}/book-amount`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: bookData,
            }),
            invalidatesTags: ["books", "copiedBooks"],
        }),

        deleteBooks: builder.mutation({
            query: ({ id, token }) => ({
                url: `${endPoint}/${id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["books", "copiedBooks", "issuedBooks"],
        }),

        getBookById: builder.query({
            query: ({ id, token }) => ({
                url: `${endPoint}/${id}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["books"],
        }),
    }),
});

export const {
    useGetAllBooksQuery,
    useAddNewBooksMutation,
    useUpdateBooksMutation,
    useDeleteBooksMutation,
    useGetBookByIdQuery,
    useAddMoreBooksMutation,
} = booksApi;
