import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        term: ''
    },
    reducers: {
        setTerm(state, action) {
            state.term = action.payload;
        }
    }
});

export const selectTerm = store => store.search.term;

export default searchSlice.reducer;
export const { setTerm } = searchSlice.actions;