import React, { useEffect } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
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
                    <p>{post.data.title}</p>
                    <Link to={post.data.permalink}>Post Link</Link>
                </div>
            ))}
            
        </div>
    )
}

export default Subreddit;