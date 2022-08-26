import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Subreddit.css';
import Search from '../search/Search';
import { fetchData } from './subredditSlice';

function Subreddit() {
    const dispatch = useDispatch();
    const { subreddit } = useParams();

    const subredditSlice = useSelector(state => state.subreddit);

    useEffect(() => {
        dispatch(fetchData('the subreddit api is working yo'))
    }, []);

    return (
        <div>
            <p>{`r/${subreddit}`}</p>
            <Search />

            <p>isLoading: {subredditSlice.isLoading ? 'true' : 'false'}</p>
            <p>hasError: {subredditSlice.hasError ? 'true' : 'false'}</p>

            {subredditSlice.data?.data.children.map(post => (
                <div>
                    <p>posted by {`u/${post.data.author}`} {post.data.created_utc} ago</p>
                    <p>{post.data.title}</p>
                    <p>{post.data.ups} upvotes</p>
                    <p>{post.data.num_comments} comments</p>
                    <Link to={post.data.permalink}>Post Link</Link>
                </div>
            ))}
            
        </div>
    )
}

export default Subreddit;