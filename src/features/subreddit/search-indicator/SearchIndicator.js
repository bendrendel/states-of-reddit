import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import './SearchIndicator.css';

function SearchIndicator({ searchQuery, subreddit }) {
    return (
        searchQuery
            ? (
                <div className='search-indicator' >
                    <span>{`Showing search results for "${decodeURIComponent(searchQuery)}"`}</span>
                    <Link to={`/r/${subreddit}`}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </Link>
                </div>
            )
            : null
    );
}

export default SearchIndicator;