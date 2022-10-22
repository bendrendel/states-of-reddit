import React from 'react';

import './Error.css';

function Error() {
    return (
        <div className='error'>
            <p>Sorry, we're having trouble loading the requested data.</p>
            <p>Please try again later.</p>
        </div>
    );
    
}

export default Error;