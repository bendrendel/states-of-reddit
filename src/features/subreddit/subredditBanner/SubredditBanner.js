import React from 'react';
import { Link } from 'react-router-dom';

import Search from '../../search/Search';

import { usStates } from '../../../util/usStates';

import './SubredditBanner.css';

function SubredditBanner({ subredditName }) {
    const stateAbbreviation = usStates
        .find(usState => usState.subredditName === subredditName)
        .abbreviation;
    
    const usStateFlag = require(`../../../images/usStateFlags/${stateAbbreviation.toLowerCase()}.svg`);

    return (
        <div style={{ backgroundImage: `url(${usStateFlag})` }} className='subreddit-banner'>
            <h1>
                <Link to={`/r/${subredditName}`}>r/{subredditName}</Link>
            </h1>
            
            <Search />
        </div>
    )
}

export default SubredditBanner;