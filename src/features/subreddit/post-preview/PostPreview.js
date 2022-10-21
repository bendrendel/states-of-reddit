import React from 'react';
import { Link } from 'react-router-dom';

import { timeSince, kmbt, unescape } from '../../../util/formatting';

import './PostPreview.css';

function PostPreview({ post }) {
    return (
        <Link to={post.permalink} className='post-preview'>
            <header>
                <p>{`posted by u/${post.author} ${timeSince(post.created_utc)}`}</p>
            </header>

            <h2>{unescape(post.title)}</h2>

            <footer>
                <p>{kmbt(post.ups)} {post.ups === 1 ? 'upvote' : 'upvotes'}</p>
                <p>{kmbt(post.num_comments)} {post.num_comments === 1 ? 'comment' : 'comments'}</p>
            </footer>
        </Link>     
    )
}

export default PostPreview;