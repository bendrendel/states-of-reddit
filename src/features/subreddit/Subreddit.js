import React from 'react';
import { Link } from 'react-router-dom';
import './Subreddit.css';

function Subreddit() {
    return (
        <div>
            <p>Subreddit</p>
            <Link to='/post'>Post Link</Link>
        </div>
        
    )
}

export default Subreddit;