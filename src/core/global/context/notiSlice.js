import { createSlice } from "@reduxjs/toolkit";

export const notiSlice = createSlice({
    name: "notiSlice",
    initialState: {
        message: {
            msgType: null,
            msgContent: null,
        },
        alert : {
            alertType : null,
            alertMsg : null
        }
    },
    reducers: {
        setMessage: (state, { payload }) => {
            state.message = payload;
        },

        setAlert : (state, {payload}) => {
            state.alert = payload
        }
    },
});

export const { setMessage, setAlert } = notiSlice.actions;
export default notiSlice.reducer;
