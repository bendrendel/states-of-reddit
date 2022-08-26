import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { states } from '../../util/states';

function Navbar() {
    return (
        <nav>
            <p>Navbar</p>
            <Link to='/'>Home Link</Link>
            
            {states.map(state => {
                return (
                    <NavLink to={`/r/${state.subreddit}/`}>
                        {state.name}
                    </NavLink>
                );
            })}
        </nav>
    )
}

export default Navbar;