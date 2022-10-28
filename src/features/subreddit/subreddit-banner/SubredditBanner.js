import React from 'react';
import { Link } from 'react-router-dom';

import Search from '../../search/Search';

import { states } from '../../../util/states';

import './SubredditBanner.css';

function SubredditBanner({ subreddit }) {
    const stateAbbreviation = states.find(state => state.subreddit === subreddit).abbreviation;
    const stateFlag = require(`../../../util/state-flags/${stateAbbreviation.toLowerCase()}.svg`);

    return (
        <div style={{ backgroundImage: `url(${stateFlag})` }} className='subreddit-banner'>
            <Link to={`/r/${subreddit}`}>
                <h1>{`r/${subreddit}`}</h1>
            </Link>

            <Search />
        </div>
    )
}

export default SubredditBanner;