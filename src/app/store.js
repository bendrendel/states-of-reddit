import { configureStore } from '@reduxjs/toolkit';
import subredditReducer from '../features/subreddit/subredditSlice';
import searchReducer from '../features/search/searchSlice';
import postReducer from '../features/post/postSlice';

export const store = configureStore({
	reducer: {
		subreddit: subredditReducer,
		search: searchReducer,
		post: postReducer
	},
});