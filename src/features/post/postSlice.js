import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostData } from '../../util/redditApi';

export const fetchData = createAsyncThunk(
    'post/fetchData',
    async (endpoint, thunkAPI) => {
        const response = await fetchPostData(endpoint);
        const json = response;
        return json;
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState: {
        data: 'test post data',
        isLoading: false,
        hasError: false
    },
    extraReducers: {
        [fetchData.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchData.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },
        [fetchData.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
});

export default postSlice.reducer;