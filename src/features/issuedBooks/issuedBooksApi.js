import { baseApi } from "@/core/global/apis/baseApi";
const endPoint = "/issued-books";
export const issuedBooksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTotalIssuedBooks: builder.query({
            query: (token) => ({
                url: `${endPoint}`,
                method: "GET",
                headers: { authorization: `Bearer ${token}` },
            }),
            providesTags: ["issuedBooks"],
        }),

        getAllIssuedRecordsByFilter: builder.query({
            query: ({ keyword, date, token }) => ({
                url: `${endPoint}/filter?status=${keyword}&date=${date}`,
                method: "GET",
                headers: { authorization: `Bearer ${token}` },
            }),
            providesTags: ["issuedBooks"],
        }),

        addNewIssuedBooks: builder.mutation({
            query: ({ issuedBookData, token }) => ({
                url: `${endPoint}`,
                method: "POST",
                headers: { authorization: `Bearer ${token}` },
                body: issuedBookData,
            }),
            invalidatesTags: ["books", "copiedBooks", "issuedBooks", "members"],
        }),

        renewIssuedBooks: builder.mutation({
            query: ({ ids, token }) => ({
                url: `${endPoint}/renew`,
                method: "PUT",
                headers: { authorization: `Bearer ${token}` },
                body: { ids },
            }),
            invalidatesTags: ["issuedBooks"],
        }),

        returnIssuedBooks: builder.mutation({
            query: ({ ids, token }) => ({
                url: `${endPoint}/return`,
                method: "PUT",
                headers: { authorization: `Bearer ${token}` },
                body: { ids },
            }),
            invalidatesTags: ["books", "copiedBooks", "members", "issuedBooks"],
        }),

        getAllOverdueBooks: builder.query({
            query: (token) => ({
                url: `${endPoint}/overdue`,
                method: "GET",
                headers: { authorization: `Bearer ${token}` },
            }),
            providesTags: [
                "books",
                "issuedBooks",
                "members",
                "copiedBooks",
                "auth",
                "settings",
            ],
        }),

        addOverdueBooksToCheckList: builder.mutation({
            query: ({ ids, token }) => ({
                url: `${endPoint}/check`,
                method: "PUT",
                headers: { authorization: `Bearer ${token}` },
                body: { ids },
            }),
            invalidatesTags: ["issuedBooks"],
        }),
    }),
});

export const {
    useGetTotalIssuedBooksQuery,
    useGetAllIssuedRecordsByFilterQuery,
    useAddNewIssuedBooksMutation,
    useRenewIssuedBooksMutation,
    useReturnIssuedBooksMutation,
    useGetAllOverdueBooksQuery,
    useAddOverdueBooksToCheckListMutation,
} = issuedBooksApi;
