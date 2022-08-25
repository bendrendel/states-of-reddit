import React, { useEffect } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Subreddit.css';
import Search from '../search/Search';
import { fetchData } from './subredditSlice';

function Subreddit() {
    const dispatch = useDispatch();
    const { state } = useParams();
    const { url } = useRouteMatch();

    const subredditSlice = useSelector(state => state.subreddit);

    useEffect(() => {
        dispatch(fetchData('the subreddit api is working yo'))
    }, []);

    return (
        <div>
            <p>{state} Subreddit</p>
            <Link to={`${url}/comments/postid/postname`}>Post Link</Link>
            <p>isLoading: {subredditSlice.isLoading ? 'true' : 'false'}</p>
            <p>hasError: {subredditSlice.hasError ? 'true': 'false'}</p>
            <p>data: {subredditSlice.data}</p>
            <Search />
        </div>
    )
}

export default Subreddit;