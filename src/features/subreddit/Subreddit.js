import React, { useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import SubredditHeader from './subreddit-header/SubredditHeader';
import PostList from './post-list/PostList';

import { fetchData, resetState, selectIsLoading, selectHasError, selectPosts } from './subredditSlice';

import './Subreddit.css';

function Subreddit() {
    const dispatch = useDispatch();

    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const posts = useSelector(selectPosts);

    const { subreddit } = useParams();
    const { search } = useLocation();

    const queryParams = useMemo(() => { return new URLSearchParams(search) }, [search]);
    const searchQuery = queryParams.get('q');

    useEffect(() => {
        const endpoint = searchQuery ? `https://www.reddit.com/r/${subreddit}/search.json?q=${searchQuery}&restrict_sr=1` : `https://www.reddit.com/r/${subreddit}.json`;
        dispatch(fetchData(endpoint));
        return () => dispatch(resetState());
    }, [subreddit, searchQuery]);

    const apiContent = () => {
        if (hasError) {
            return <Error />;
        } else if (isLoading) {
            return <Loading />;
        } else if (posts) {
            return <PostList posts={posts} searchQuery={searchQuery} subreddit={subreddit} />;
        } else {
            return null;
        }
    }

    return (
        <main className='subreddit-page'>
            <SubredditHeader subreddit={subreddit} />
            {apiContent()}
        </main>
    )
}

export default Subreddit;