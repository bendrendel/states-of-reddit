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
                    <p>
                        Showing search results for "{decodeURIComponent(searchQuery)}"
                        <Link to={`/r/${subreddit}`}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </Link>
                    </p>                    
                </div>
            )
            : null
    );
}

export default SearchIndicator;