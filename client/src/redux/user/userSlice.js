import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        accessToken: null,
    },

    reducers: {
        userReducer: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.current = action.payload.userData;
            state.accessToken = action.payload.accessToken;
        },
    },
});

// eslint-disable-next-line no-empty-pattern
export const { userReducer } = userSlice.actions;

export default userSlice.reducer;
