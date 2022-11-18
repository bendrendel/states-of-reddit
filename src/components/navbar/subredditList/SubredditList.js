import React from 'react';
import { NavLink } from 'react-router-dom';

import { usStates } from '../../../utils/usStates';
import useOutsideClick from '../../../utils/useOutsideClick';

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
                                src={require(`../../../images/usStateFlagThumbnails/${usState.abbreviation.toLowerCase()}.png`)}
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