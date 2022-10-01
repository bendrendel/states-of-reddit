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
        const hamburgerIcon = document.getElementById('hamburger-icon');
        dropdownMenu.classList.toggle('hide');
        hamburgerIcon.classList.toggle('open')
        event.stopPropagation();
    };

    const closeDropdown = () => {
        const dropdownMenu = document.getElementById('dropdown-menu');
        const hamburgerIcon = document.getElementById('hamburger-icon');
        dropdownMenu.classList.add('hide');
        hamburgerIcon.classList.remove('open')        
    }

    const handleNavLinkClick = () => {
        closeDropdown();
    };

    const handleOutsideClick = () => {
        closeDropdown();
    };

    const ref = useOutsideClick(handleOutsideClick);

    return (
        <header>
            <nav className='main-menu'>
                <ul>
                    <li><Link to='/'><FontAwesomeIcon icon={faHouse} className='home-icon' /></Link></li>
                    <li><FontAwesomeIcon icon={faBars} onClick={handleHamburgerClick} className='hamburger-icon' id='hamburger-icon' /></li>
                </ul>                
            </nav>
            <nav ref={ref} className='dropdown-menu hide' id='dropdown-menu'>
                <ul>
                    {states.map(state => (
                        <li key={state.name}>
                            <NavLink to={`/r/${state.subreddit}/`} className='post-link' onClick={handleNavLinkClick}>
                                <img src={require(`./images/${state.abbreviation.toLowerCase()}.svg`)} alt={`${state.name} State Flag`} />
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