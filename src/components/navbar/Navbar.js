import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <div>
            <p>Navbar</p>
            <Link to='/'>Home Link</Link>
            <NavLink to='/subreddit'>Subreddit Link</NavLink>
        </div>
    )
}

export default Navbar;