import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        term: 'test search term'
    },
    reducers: {
        setTerm(state, action) {
            state.term = action.payload;
        }
    }
});

export default searchSlice.reducer;
export const { setTerm } = searchSlice.actions;