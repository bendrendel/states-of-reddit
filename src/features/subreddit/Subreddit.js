import React, { useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SubredditBanner from './subredditBanner/SubredditBanner';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import PostList from './postList/PostList';
import SearchIndicator from './searchIndicator/SearchIndicator';
import NoPostsIndicator from './noPostsIndicator/NoPostsIndicator';

import { fetchData, resetState, selectIsLoading, selectHasError, selectPosts } from './subredditSlice';

import './Subreddit.css';

function Subreddit() {
    const dispatch = useDispatch();

    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const posts = useSelector(selectPosts);

    const { subredditName } = useParams();
    const { search } = useLocation();
    const queryParams = useMemo(() => { return new URLSearchParams(search) }, [search]);
    const searchQuery = queryParams.get('q');

    useEffect(() => {
        const endpoint = searchQuery
            ? `https://www.reddit.com/r/${subredditName}/search.json?q=${searchQuery}&restrict_sr=1`
            : `https://www.reddit.com/r/${subredditName}.json`;
        
        dispatch(fetchData(endpoint));

        return () => dispatch(resetState());
    }, [subredditName, searchQuery]);

    const apiContent = () => {
        if (hasError) {
            return <Error />;
        } else if (isLoading) {
            return <Loading />;
        } else if (posts) {
            return (
                <div className="subreddit-api-data">
                    {
                        searchQuery
                            ? <SearchIndicator searchQuery={searchQuery} subredditName={subredditName} />
                            : null
                    }
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
            <SubredditBanner subredditName={subredditName} />
            {apiContent()}
        </main>
    )
}

export default Subreddit;