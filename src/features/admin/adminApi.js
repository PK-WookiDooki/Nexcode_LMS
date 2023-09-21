import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/admins" }),
    tagTypes: ["admins"],
    endpoints: (builder) => ({
        getAdminDetail: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["admins"],
        }),

        loginAccount: builder.mutation({
            query: (adminData) => ({
                url: "/login",
                method: "POST",
                body: adminData,
            }),
            invalidatesTags: ["admins"],
        }),

        updateAdminData: builder.mutation({
            query: (updatedData) => ({
                url: "/",
                method: "PUT",
                body: updatedData,
            }),
            invalidatesTags: ["admins"],
        }),

        getSettings: builder.query({
            query: () => ({
                url: "/settings",
                method: "GET",
            }),
            providesTags: ["admins"],
        }),

        updateBLimit: builder.mutation({
            query: (amount) => ({
                url: "/update_bookslimit",
                method: "PUT",
                body: { amount },
            }),
            invalidatesTags: ["admins"],
        }),
        updateETimes: builder.mutation({
            query: (times) => ({
                url: "/update_extendabletimes",
                method: "PUT",
                body: { times },
            }),
            invalidatesTags: ["admins"],
        }),
        updateEDays: builder.mutation({
            query: (days) => ({
                url: "/update_extendabledays",
                method: "PUT",
                body: { days },
            }),
            invalidatesTags: ["admins"],
        }),
        updateBRDays: builder.mutation({
            query: (days) => ({
                url: "/update_rentabledays",
                method: "PUT",
                body: { days },
            }),
            invalidatesTags: ["admins"],
        }),
    }),
});

export const {
    useGetAdminDetailQuery,
    useLoginAccountMutation,
    useGetSettingsQuery,
    useUpdateBLimitMutation,
    useUpdateEDaysMutation,
    useUpdateETimesMutation,
    useUpdateBRDaysMutation,
    useUpdateAdminDataMutation,
} = adminApi;
