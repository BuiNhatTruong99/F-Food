import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '~/apis/app';

export const getCategories = createAsyncThunk('app/getCategories', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProdCategories();
    if (!response.status) return rejectWithValue(response);
    return response.data;
});
