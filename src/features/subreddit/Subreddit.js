import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Subreddit.css';
import Search from '../search/Search';
import { fetchData } from './subredditSlice';

function Subreddit() {
    const dispatch = useDispatch();

    const subredditSlice = useSelector(state => state.subreddit);

    useEffect(() => {
        dispatch(fetchData('the subreddit api is working yo'))
    }, []);

    return (
        <div>
            <p>Subreddit</p>
            <Link to='/post'>Post Link</Link>
            <p>isLoading: {subredditSlice.isLoading ? 'true' : 'false'}</p>
            <p>hasError: {subredditSlice.hasError ? 'true': 'false'}</p>
            <p>data: {subredditSlice.data}</p>
            <Search />
        </div>
    )
}

export default Subreddit;