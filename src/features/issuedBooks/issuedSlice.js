import { createSlice } from "@reduxjs/toolkit";

export const issuedSlice = createSlice({
    name: "issuedSlice",
    initialState: {
        issuedMessage: { msgType: null, msgContent: null },
    },
    reducers: {
        setIssuedMessage: (state, { payload }) => {
            state.issuedMessage = payload;
        },
    },
});

export const { setIssuedMessage } = issuedSlice.actions;
export default issuedSlice.reducer;
