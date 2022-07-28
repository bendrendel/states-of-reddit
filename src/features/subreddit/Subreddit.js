import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Subreddit.css';
import Search from '../search/Search';

function Subreddit() {

    const subredditSlice = useSelector(state => state.subreddit)

    return (
        <div>
            <p>Subreddit</p>
            <Link to='/post'>Post Link</Link>
            <p>{subredditSlice.data}</p>
            <Search />
        </div>
    )
}

export default Subreddit;