import React from 'react';
import { useSelector } from 'react-redux';
import './Search.css';

function Search() {

    const searchTerm = useSelector(state => state.search);

    return (
        <div>
            <p>{searchTerm.term}</p>
        </div>
    )
}

export default Search;