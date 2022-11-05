import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import { setSearchTerm, selectSearchTerm } from './searchSlice';

import './Search.css';

function Search() {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    
    const { subredditName } = useParams();
    const history = useHistory();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm !== '') {
            history.push(`/r/${subredditName}/search?q=${encodeURIComponent(searchTerm)}&restrict_sr=1`);
        }
    };

    const handleChange = (event) => {
        dispatch(setSearchTerm(event.target.value));
    };

    const handleClearClick = () => {
        dispatch(setSearchTerm(''));
    };

    const handleSearchClick = (event) => {
        handleSubmit(event);
    };

    const handleFocus = (event) => {
        document.getElementById('search').classList.add('focus');
    };

    const handleBlur = (event) => {
        document.getElementById('search').classList.remove('focus');
    };

    return (
        <form onSubmit={handleSubmit} className='search' id='search'>
            <button>
                <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearchClick} />    
            </button>
            
            <input type="text" value={searchTerm} placeholder={`Search r/${subredditName}`} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />

            <button>
                <FontAwesomeIcon icon={faXmark} onClick={handleClearClick} />    
            </button>
        </form>
    );
}

export default Search;