import React from 'react';
import { NavLink } from 'react-router-dom';

import { usStates } from '../../../util/usStates';
import useOutsideClick from '../../../util/useOutsideClick';

import './SubredditList.css';

function SubredditList({ open, setOpen }) {
    
    const ref = useOutsideClick(() => setOpen(false));
    
    const handleNavLinkClick = () => {
        setOpen(false);
    };

    return (
        <ul ref={ref} className={`subreddit-list${open ? ' open' : ''}`}>
            {
                usStates.map(usState => (
                    <li key={usState.name}>
                        <NavLink to={`/r/${usState.subredditName}/`} onClick={handleNavLinkClick}>
                            <img
                                src={require(`../../../images/usStateFlags/${usState.abbreviation.toLowerCase()}.svg`)}
                                alt={`${usState.name} state flag`}
                            />
                            <p>{usState.name} subreddit</p>
                        </NavLink>
                    </li>
                ))
            }
        </ul>    
    )
}

export default SubredditList;