import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import './SearchIndicator.css';

function SearchIndicator({ searchQuery, subredditName }) {
    return (
        <div className='search-indicator' >
            <p>
                Showing search results for "{decodeURIComponent(searchQuery)}"
                <Link to={`/r/${subredditName}`}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </Link>
            </p>                    
        </div>
    );
}

export default SearchIndicator;