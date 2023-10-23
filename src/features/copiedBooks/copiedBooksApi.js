import { baseApi } from "@/core/global/apis/baseApi";
const endPoint = "/copied-books";
export const copiedBooksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCopiedBooks: builder.query({
            query: (token) => ({
                url: `${endPoint}`,
                method: "GET",
                headers: { authorization: `Bearer ${token}` },
            }),
            providesTags: ["copiedBooks", "books", "issuedBooks"],
        }),

        getCopiedBooksByOrgId: builder.query({
            query: ({ token, bookId }) => ({
                url: `${endPoint}/${bookId}`,
                method: "GET",
                headers: { authorization: `Bearer ${token}` },
            }),
            providesTags: ["copiedBooks", "books", "issuedBooks"],
        }),

        setCopiedBooksStatus: builder.mutation({
            query: ({ generatedIds, token }) => ({
                url: `${endPoint}`,
                method: "PUT",
                headers: { authorization: `Bearer ${token}` },
                body: { generatedIds },
            }),
            invalidatesTags: ["copiedBooks", "books"],
        }),
    }),
});

export const {
    useGetAllCopiedBooksQuery,
    useGetCopiedBooksByOrgIdQuery,
    useSetCopiedBooksStatusMutation,
} = copiedBooksApi;
