import React from 'react';
import { useHistory } from 'react-router-dom';

import './Error.css';

function Error() {
    const history = useHistory();

    const handleClick = () => {
        history.goBack();
    }

    return (
        <div className='error'>
            <p>Sorry, we're having trouble loading the requested data.</p>
            <button onClick={handleClick}>Go Back</button>
        </div>
    );
    
}

export default Error;