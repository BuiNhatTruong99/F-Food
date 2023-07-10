import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '~/apis/user';

export const getCurrentUser = createAsyncThunk('user/current', async (data, { rejectWithValue }) => {
    const response = await apis.apiCurrentUser();
    if (!response.success) return rejectWithValue(response);
    return response.response;
});
