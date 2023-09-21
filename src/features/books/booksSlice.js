import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
    name: "booksSlice",
    initialState: {
        keyword: null,
    },
    reducers: {
        setKeyword: (state, { payload }) => {
            state.keyword = payload;
        },
    },
});

export const { setKeyword } = booksSlice.actions;
export default booksSlice.reducer;
