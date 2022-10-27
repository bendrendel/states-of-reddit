import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBars } from '@fortawesome/free-solid-svg-icons';

import SubredditList from './subreddit-list/SubredditList';

import './Navbar.css';

function Navbar() {
    const [subredditListOpen, setSubredditListOpen] = useState(false);

    const handleHamburgerClick = (event) => {
        setSubredditListOpen(prevState => !prevState);
        event.stopPropagation();
    };

    return (
        <header className='nav-bar'>
            <nav>
                <ul>
                    <li>
                        <Link to='/' className='home-link'>
                            <FontAwesomeIcon icon={faHouse} />
                        </Link>
                    </li>
                    <li>
                        <button className={`subreddit-list-button${subredditListOpen ? ' open' : ''}`}>
                            <FontAwesomeIcon icon={faBars} onClick={handleHamburgerClick}  />                            
                        </button>
                        <SubredditList open={subredditListOpen} setOpen={setSubredditListOpen} />   
                    </li>
                </ul>                
            </nav>           
        </header>
    )
}

export default Navbar;