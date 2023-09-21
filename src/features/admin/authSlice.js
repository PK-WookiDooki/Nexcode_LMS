import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token") ? Cookies.get("token") : null;
const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        isLoggedIn: !!token,
        user,
        token,
    },
    reducers: {
        setLoginStatus: (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
        },

        removeCookies: (state) => {
            Cookies.remove("user");
            Cookies.remove("token");
        },
    },
});

export const { setLoginStatus, removeCookies } = authSlice.actions;
export default authSlice.reducer;
