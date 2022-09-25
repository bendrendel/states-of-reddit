import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { states } from '../../util/states';
import useOutsideClick from '../../util/useOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBars } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    const handleHamburgerClick = (event) => {
        const dropdownMenu = document.getElementById('dropdown-menu');
        dropdownMenu.classList.toggle('hide');
        event.stopPropagation();
    };

    const handleNavLinkClick = () => {
        const dropdownMenu = document.getElementById('dropdown-menu');
        dropdownMenu.classList.add('hide');
    };

    const handleOutsideClick = () => {
        const dropdownMenu = document.getElementById('dropdown-menu');
        dropdownMenu.classList.add('hide');
    };

    const ref = useOutsideClick(handleOutsideClick);

    return (
        <header>
            <nav className='main-menu'>
                <ul>
                    <li><Link to='/'><FontAwesomeIcon icon={faHouse} className='home-icon' /></Link></li>
                    <li><FontAwesomeIcon icon={faBars} onClick={handleHamburgerClick} className='hamburger-icon' /></li>
                </ul>                
            </nav>
            <nav ref={ref} className='dropdown-menu hide' id='dropdown-menu'>
                <ul>
                    {states.map(state => (
                        <li key={state.name}>
                            <NavLink to={`/r/${state.subreddit}/`} className='post-link' onClick={handleNavLinkClick}>
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