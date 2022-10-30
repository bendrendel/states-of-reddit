import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchTerm: ''
    },
    reducers: {
        setSearchTerm(state, action) {
            state.term = action.payload;
        }
    }
});

export const selectSearchTerm = store => store.search.searchTerm;

export default searchSlice.reducer;
export const { setSearchTerm } = searchSlice.actions;