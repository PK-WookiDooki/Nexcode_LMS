//injections
import { baseApi } from "@/core/global/apis/baseApi";
const endPoint = "/members";
export const membersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMembers: builder.query({
            query: ({ token, keyword }) => ({
                url: `${endPoint}/filter?status=${keyword}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["issuedBooks", "members"],
        }),

        addNewMembers: builder.mutation({
            query: ({ memberData, token }) => ({
                url: `${endPoint}`,
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: memberData,
            }),
            invalidatesTags: ["members"],
        }),

        updateMembers: builder.mutation({
            query: ({ memberData, token, id }) => ({
                url: `${endPoint}/${id}`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: memberData,
            }),
            invalidatesTags: ["members"],
        }),

        deleteMembers: builder.mutation({
            query: ({ id, token }) => ({
                url: `${endPoint}/${id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["members"],
        }),

        getMemberById: builder.query({
            query: ({ token, id }) => ({
                url: `${endPoint}/${id}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["members"],
        }),
    }),
});

export const {
    useGetAllMembersQuery,
    useAddNewMembersMutation,
    useUpdateMembersMutation,
    useDeleteMembersMutation,
    useGetMemberByIdQuery,
} = membersApi;
