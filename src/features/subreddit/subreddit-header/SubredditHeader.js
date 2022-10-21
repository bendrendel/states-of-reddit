import React from 'react';
import { Link } from 'react-router-dom';

import Search from '../../search/Search';

import { states } from '../../../util/states';

import './SubredditHeader.css';

function SubredditHeader({ subreddit }) {
    const stateAbbreviation = states.find(state => state.subreddit === subreddit).abbreviation;
    const stateFlag = require(`../../../util/state-flags/${stateAbbreviation.toLowerCase()}.svg`);

    return (
        <header style={{ backgroundImage: `url(${stateFlag})` }} className='subreddit-header'>
            <Link to={`/r/${subreddit}`}>
                <h1>{`r/${subreddit}`}</h1>
            </Link>

            <Search />
        </header>
    )
}

export default SubredditHeader;