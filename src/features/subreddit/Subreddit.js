import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Subreddit.css';
import Search from '../search/Search';
import { fetchData, selectIsLoading, selectHasError, selectPosts } from './subredditSlice';
import { timeSince, kmbt } from '../../util/formatting';

function Subreddit() {
    const dispatch = useDispatch();
    const { subreddit } = useParams();

    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const posts = useSelector(selectPosts);

    useEffect(() => {
        dispatch(fetchData('the subreddit api is working yo'))
    }, []);

    return (
        <div>
            <p>{`r/${subreddit}`}</p>
            <Search />

            <p>isLoading: {isLoading ? 'true' : 'false'}</p>
            <p>hasError: {hasError ? 'true' : 'false'}</p>

            {posts && posts.map(post => (
                <div>
                    <p>posted by {`u/${post.data.author}`}</p>
                    <p>diff: {timeSince(post.data.created_utc)}</p>
                    <p>{post.data.title}</p>
                    <p>{kmbt(post.data.ups)} {post.data.ups == 1 ? 'upvote' : 'upvotes'}</p>
                    <p>{kmbt(post.data.num_comments)} {post.data.num_comments == 1 ? 'comment' : 'comments'}</p>
                    <Link to={post.data.permalink}>Post Link</Link>
                </div>
            ))}
            
        </div>
    )
}

export default Subreddit;