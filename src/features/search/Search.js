import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTerm, selectTerm } from './searchSlice';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

function Search() {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectTerm);
    const { subreddit } = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = (event) => {
        dispatch(setTerm(event.target.value));
    }

    return (
        <form onSubmit={handleSubmit} className='search-bar'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-button' />
            <input type="text" value={searchTerm} placeholder={`Search r/${subreddit}`} onChange={handleChange} />
            <FontAwesomeIcon icon={faXmark} className='clear-button' />
        </form>
    )
}

export default Search;