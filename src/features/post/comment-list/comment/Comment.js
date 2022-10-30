import React from 'react';

import { timeSince, kmbt } from '../../../../util/formatting';

import Markdown from '../../../../components/markdown/Markdown';

import './Comment.css';

function Comment({ comment }) {
    return (
        <div className='comment'>
            <header>
                <p><strong>{comment.author}</strong> • {timeSince(comment.created_utc)}</p>
            </header>

            <Markdown content={comment.body} />
        
            <footer>
                <p>{kmbt(comment.ups)} {comment.ups === 1 ? 'upvote' : 'upvotes'}</p>
            </footer>
        </div>
    )
}

export default Comment;