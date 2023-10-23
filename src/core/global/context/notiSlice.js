import { createSlice } from "@reduxjs/toolkit";

export const notiSlice = createSlice({
    name: "notiSlice",
    initialState: {
        message: {
            msgType: null,
            msgContent: null,
        },
    },
    reducers: {
        setMessage: (state, { payload }) => {
            state.message = payload;
        },
    },
});

export const { setMessage } = notiSlice.actions;
export default notiSlice.reducer;
