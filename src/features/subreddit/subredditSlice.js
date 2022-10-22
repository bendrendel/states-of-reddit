import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
    'subreddit/fetchData',
    async (endpoint, thunkAPI) => {
        const response = await fetch(endpoint);
        const json = await response.json();
        return json;
    }
);

const subredditSlice = createSlice({
    name: 'subreddit',
    initialState: {
        data: null,
        isLoading: false,
        hasError: false
    },
    reducers: {
        resetState(state, action) {
            state.data = null;
            state.isLoading = false;
            state.hasError = false;
        }
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

export const selectIsLoading = store => store.subreddit.isLoading;
export const selectHasError = store => store.subreddit.hasError;
export const selectPosts = store => store.subreddit.data ? store.subreddit.data.data.children.map(elem => elem.data) : null;

export default subredditSlice.reducer;
export const { resetState } = subredditSlice.actions;