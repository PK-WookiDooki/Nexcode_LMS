//injections
import { baseApi } from "@/core/global/apis/baseApi";
const authEndPoint = "/auth";
const settingEndPoint = "/settings";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //auth
        getAdminData: builder.query({
            query: (token) => ({
                url: `${authEndPoint}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["auth"],
        }),

        loginAccount: builder.mutation({
            query: (adminData) => ({
                url: `${authEndPoint}/login`,
                method: "POST",
                body: adminData,
            }),
            invalidatesTags: ["auth"],
        }),

        resetPassword: builder.mutation({
            query: (username) => ({
                url: `${authEndPoint}/reset-password`,
                method: "PUT",
                body: { username },
            }),
            invalidatesTags: ["auth"],
        }),

        changePassword: builder.mutation({
            query: ({ updatedPasswords, token }) => ({
                url: `${authEndPoint}/change-password`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: updatedPasswords,
            }),
            invalidatesTags: ["auth"],
        }),

        //settings
        getAllSettings: builder.query({
            query: (token) => ({
                url: `${settingEndPoint}`,
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: ["settings"],
        }),

        updateRentableBookLimit: builder.mutation({
            query: ({ token, limit }) => ({
                url: `${settingEndPoint}/change-book-limit`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: { limit },
            }),
            invalidatesTags: ["settings"],
        }),

        updateRentableDays: builder.mutation({
            query: ({ token, limit }) => ({
                url: `${settingEndPoint}/change-rentable-days`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: { limit },
            }),
            invalidatesTags: ["settings"],
        }),

        updateExtendableTimes: builder.mutation({
            query: ({ token, limit }) => ({
                url: `${settingEndPoint}/change-extendable-times`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: { limit },
            }),
            invalidatesTags: ["settings"],
        }),

        updateExtendableDays: builder.mutation({
            query: ({ token, limit }) => ({
                url: `${settingEndPoint}/change-extendable-days`,
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: { limit },
            }),
            invalidatesTags: ["settings"],
        }),
    }),
});

export const {
    useGetAdminDataQuery,
    useLoginAccountMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useGetAllSettingsQuery,
    useUpdateRentableBookLimitMutation,
    useUpdateRentableDaysMutation,
    useUpdateExtendableTimesMutation,
    useUpdateExtendableDaysMutation,
} = authApi;
