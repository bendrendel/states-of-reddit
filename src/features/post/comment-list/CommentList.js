import React from 'react';

import Comment from './comment/Comment';

import './CommentList.css';

function CommentList({ comments }) {
    return (
        <ul className='comments'>
            {
                comments.map(comment => (
                    <li key={comment.id}>
                        <Comment comment={comment} />
                    </li>
                ))
            }
        </ul>
    )
}

export default CommentList;