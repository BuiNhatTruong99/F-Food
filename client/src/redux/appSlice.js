import { createSlice } from '@reduxjs/toolkit';
import * as actions from '~/redux/asyncActions';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: [],
        selectCategories: '',
        selectedPrice: '',
        isLoading: false,
    },

    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectCategories = action.payload;
        },

        setSelectedPrice: (state, action) => {
            state.selectedPrice = action.payload;
        },
    },

    // Code logic xử lý async action
    extraReducers: (builder) => {
        builder.addCase(actions.getCategories.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            // state.isLoading = false;
            state.categories = action.payload;
        });

        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});

// eslint-disable-next-line no-empty-pattern
export const { setSelectedCategory, setSelectedPrice } = appSlice.actions;

export default appSlice.reducer;
