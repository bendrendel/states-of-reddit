import React from 'react';
import { Link } from 'react-router-dom';

import { timeSince, kmbt, unescape } from '../../../../utils/formatting';

import './ShortPostPreview.css';

function ShortPostPreview({ post }) {
    return (
        <Link to={post.permalink} className='short-post-preview'>
            <header>
                <p>posted by u/{post.author} {timeSince(post.created_utc)}</p>
            </header>

            <h2>{unescape(post.title)}</h2>

            <footer>
                <p>{kmbt(post.ups)} {Math.abs(post.ups) === 1 ? 'upvote' : 'upvotes'}</p>
                <p>{kmbt(post.num_comments)} {post.num_comments === 1 ? 'comment' : 'comments'}</p>
            </footer>
        </Link>
    )
}

export default ShortPostPreview;