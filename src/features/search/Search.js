import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import { setTerm, selectTerm } from './searchSlice';

import './Search.css';

function Search() {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectTerm);
    
    const { subreddit } = useParams();
    const history = useHistory();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        searchTerm !== '' && history.push(`/r/${subreddit}/search?q=${encodeURIComponent(searchTerm)}&restrict_sr=1`);
    };

    const handleChange = (event) => {
        dispatch(setTerm(event.target.value));
    };

    const handleClearClick = () => {
        dispatch(setTerm(''));
    };

    const handleSearchClick = (event) => {
        handleSubmit(event);
    };

    return (
        <form onSubmit={handleSubmit} className='search-bar'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-button' onClick={handleSearchClick} />
            <input type="text" value={searchTerm} placeholder={`Search r/${subreddit}`} onChange={handleChange} />
            <FontAwesomeIcon icon={faXmark} className='clear-button' onClick={handleClearClick} />
        </form>
    );
}

export default Search;