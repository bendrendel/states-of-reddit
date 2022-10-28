import React, { useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SubredditBanner from './subreddit-banner/SubredditBanner';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import PostList from './post-list/PostList';
import SearchIndicator from './search-indicator/SearchIndicator';
import NoPostsIndicator from './no-posts-indicator/NoPostsIndicator';

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

    const apiResponse = () => {
        if (hasError) {
            return <Error />;
        } else if (isLoading) {
            return <Loading />;
        } else if (posts) {
            return (
                <div className="subreddit-api-data">
                    <SearchIndicator searchQuery={searchQuery} subreddit={subreddit} />
                    {
                        posts.length === 0
                            ? <NoPostsIndicator />
                            : <PostList posts={posts}/>  
                    }
                </div>
            );
        } else {
            return null;
        }
    }

    return (
        <main className='subreddit'>
            <SubredditBanner subreddit={subreddit} />
            {apiResponse()}
        </main>
    )
}

export default Subreddit;