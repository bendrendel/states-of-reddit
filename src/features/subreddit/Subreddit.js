import React, { useEffect, useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import PostPreview from './post-preview/PostPreview';
import SubredditHeader from './subreddit-header/SubredditHeader';

import { fetchData, resetState, selectIsLoading, selectHasError, selectPosts } from './subredditSlice';

import './Subreddit.css';

function Subreddit() {
    const dispatch = useDispatch();
    const { subreddit } = useParams();
    const { search } = useLocation();
    const queryParams = useMemo(() => { return new URLSearchParams(search) }, [search]);
    const searchQuery = queryParams.get('q');

    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const posts = useSelector(selectPosts);

    useEffect(() => {
        const endpoint = searchQuery ? `https://www.reddit.com/r/${subreddit}/search.json?q=${searchQuery}&restrict_sr=1` : `https://www.reddit.com/r/${subreddit}.json`;
        dispatch(fetchData(endpoint));
        return () => dispatch(resetState());
    }, [subreddit, searchQuery]);

    return (
        <main className='subreddit-page'>
            <SubredditHeader subreddit={subreddit} />

            {isLoading && <Loading />}

            {hasError && <Error />}

            {posts && (
                <section className='subreddit-posts'>
                    {searchQuery && (<p className='search-message'>Showing search results for "{decodeURIComponent(searchQuery)}"<Link to={`/r/${subreddit}`} className='clear-search'><FontAwesomeIcon icon={faCircleXmark} /></Link></p>)}
                    
                    {posts.length === 0 && (<p className='no-posts'>No posts found</p>)}
                    
                    <ul>
                        {posts.map(post => (
                            <li key={post.id}>
                                <PostPreview post={post} />                          
                            </li>
                        ))}                    
                    </ul>
                </section>
            )}
        </main>
    )
}

export default Subreddit;