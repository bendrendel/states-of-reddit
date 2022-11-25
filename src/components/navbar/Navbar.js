import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBars } from '@fortawesome/free-solid-svg-icons';

import SubredditList from './subredditList/SubredditList';

import './Navbar.css';

function Navbar() {
    const [subredditListOpen, setSubredditListOpen] = useState(false);

    const handleHamburgerClick = (event) => {
        setSubredditListOpen(prevState => !prevState);
        event.stopPropagation();
    };

    return (
        <header className='navbar'>
            <nav>
                <ul>
                    <li>
                        <Link to='/' className='home-link'>
                            <FontAwesomeIcon icon={faHouse} />
                        </Link>
                    </li>
                    <li>
                        <button
                            className={`subreddit-list-button${subredditListOpen ? ' open' : ''}`}
                            onClick={handleHamburgerClick} >
                            <FontAwesomeIcon icon={faBars} />
                        </button>   
                    </li>
                </ul>    
            </nav>
            <SubredditList open={subredditListOpen} setOpen={setSubredditListOpen} />
        </header>
    )
}

export default Navbar;