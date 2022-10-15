import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
    'post/fetchData',
    async (endpoint, thunkAPI) => {
        const response = await fetch(endpoint);
        const json = await response.json();
        return json;
    }
);

const postSlice = createSlice({
    name: 'post',
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

export const selectIsLoading = state => state.post.isLoading;
export const selectHasError = state => state.post.hasError;
export const selectPost = state => state.post.data && state.post.data[0].data.children[0].data;
export const selectComments = state => state.post.data && state.post.data[1].data.children.filter(elem => elem.kind === 't1').map(elem => elem.data);

export default postSlice.reducer;
export const { resetState } = postSlice.actions;