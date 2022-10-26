import React from 'react';
import { NavLink } from 'react-router-dom';

import { states } from '../../../util/states';
import useOutsideClick from '../../../util/useOutsideClick';

import './SubredditList.css';

function SubredditList({ open, setOpen }) {

    const handleNavLinkClick = () => {
        setOpen(false);
    };

    const ref = useOutsideClick(() => setOpen(false));

    return (
        <ul ref={ref} className={`subreddit-list ${open && 'open'}`}>
            {states.map(state => (
                <li key={state.name}>
                    <NavLink to={`/r/${state.subreddit}/`} className='post-link' onClick={handleNavLinkClick}>
                        <img src={require(`../../../util/state-flags/${state.abbreviation.toLowerCase()}.svg`)} alt={`${state.name} State Flag`} />
                        <p>{state.name} subreddit</p>
                    </NavLink>
                </li>
            ))}
        </ul>    
    )
}

export default SubredditList;