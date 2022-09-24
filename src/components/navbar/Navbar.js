import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { states } from '../../util/states';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBars } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    const handleClick = () => {
        const dropdownMenu = document.getElementById('dropdown-menu');
        dropdownMenu.classList.toggle('hide');
    };

    return (
        <header>
            <nav className='main-menu'>
                <ul>
                    <li><Link to='/'><FontAwesomeIcon icon={faHouse} className='home-icon' /></Link></li>
                    <li><FontAwesomeIcon icon={faBars} onClick={handleClick} className='hamburger-icon' /></li>
                </ul>                
            </nav>
            <nav className='dropdown-menu hide' id='dropdown-menu'>
                <ul>
                    {states.map(state => (
                        <li key={state.name}>
                            <NavLink to={`/r/${state.subreddit}/`} onClick={handleClick} className='post-link'>
                                <img src={require(`./flags/${state.abbreviation.toLowerCase()}.svg`)} alt={`${state.name} State Flag`} />
                                <p>{state.name}</p>
                            </NavLink>
                        </li>
                    ))}
                </ul>                
            </nav>
        </header>
    )
}

export default Navbar;