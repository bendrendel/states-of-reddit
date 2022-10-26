import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBars } from '@fortawesome/free-solid-svg-icons';

import useOutsideClick from '../../util/useOutsideClick';

import './Navbar.css';
import SubredditList from './subreddit-list/SubredditList';

function Navbar() {
    const [subredditListOpen, setSubredditListOpen] = useState(false);

    const handleHamburgerClick = (event) => {
        setSubredditListOpen(prevState => !prevState);
        event.stopPropagation();
    };

    const ref = useOutsideClick(() => setSubredditListOpen(false));

    return (
        <header>
            <nav className='main-menu'>
                <ul>
                    <li>
                        <Link to='/'>
                            <FontAwesomeIcon icon={faHouse} className='home-icon' />
                        </Link>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBars} onClick={handleHamburgerClick} className={`hamburger-icon ${subredditListOpen && 'open'}`} />
                        <SubredditList open={subredditListOpen} setOpen={setSubredditListOpen} />   
                    </li>
                </ul>                
            </nav>           
        </header>
    )
}

export default Navbar;