import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        accessToken: null,
    },

    reducers: {
        registerReducer: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.current = action.payload.userData;
            state.accessToken = action.payload.accessToken;
        },
    },
});

// eslint-disable-next-line no-empty-pattern
export const { registerReducer } = userSlice.actions;

export default userSlice.reducer;
