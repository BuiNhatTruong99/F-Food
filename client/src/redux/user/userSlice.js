import { createSlice } from '@reduxjs/toolkit';
import * as actions from '~/redux/user/asyncUserActions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        accessToken: null,
        isLoading: false,
    },

    reducers: {
        userReducer: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.current = null;
            state.accessToken = null;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(actions.getCurrentUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
            state.isLoggedIn = true;
        });

        builder.addCase(actions.getCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
            state.isLoggedIn = false;
            state.accessToken = null;
        });
    },
});

// eslint-disable-next-line no-empty-pattern
export const { userReducer, logout } = userSlice.actions;

export default userSlice.reducer;
