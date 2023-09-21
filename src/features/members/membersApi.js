import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const membersApi = createApi({
    reducerPath: "membersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/members" }),
    tagTypes: ["members"],
    endpoints: (builder) => ({
        getAllMembers: builder.query({
            query: (keyword) => ({
                url: `?keyword=${keyword}`,
                method: "GET",
            }),
            providesTags: ["members"],
        }),

        addNewMembers: builder.mutation({
            query: (member) => ({
                url: "/",
                method: "POST",
                body: member,
            }),
            invalidatesTags: ["members"],
        }),

        updateMembers: builder.mutation({
            query: (member) => ({
                url: "/",
                method: "PUT",
                body: member,
            }),
            invalidatesTags: ["members"],
        }),

        deleteMembers: builder.mutation({
            query: (memberId) => ({
                url: "/",
                method: "DELETE",
                body: { memberId },
            }),
            invalidatesTags: ["members"],
        }),

        getMemberById: builder.query({
            query: (memberId) => ({
                url: `/${memberId}`,
                method: "GET",
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
