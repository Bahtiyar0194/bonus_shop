import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: []
}

export const userSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        authenticate: (state, action) => {
            state.user = action.payload
        }
    }
});

export const {authenticate} = userSlice.actions
export default userSlice.reducer