import React from 'react';

import './Comment.css';

function Comment() {
    return (
        <div>
            <header>
                <strong>{comment.author}</strong>
                • {timeSince(comment.created_utc)}
            </header>
            <div className="comment-body">
                <Markdown content={comment.body} />
            </div>
            <footer>{kmbt(comment.ups)} {comment.ups === 1 ? 'upvote' : 'upvotes'}</footer>
        </div>
    )
}

export default Comment;