import React from 'react';

import Markdown from '../../../components/markdown/Markdown';

import { timeSince, kmbt } from '../../../util/formatting';

import './CommentList.css';

function CommentList({ comments }) {
    return (
        <section className='comments'>
            {
                comments.length === 0
                    ? <div className='no-comments'>No comments yet</div>
                    : (
                        <ul>
                            {
                                comments.map(comment => (
                                    <li key={comment.id} className='comment'>
                                        <header>
                                            <strong>{comment.author}</strong>
                                            • {timeSince(comment.created_utc)}
                                        </header>
                                        <div className="comment-body">
                                            <Markdown content={comment.body} />
                                        </div>
                                        <footer>{kmbt(comment.ups)} {comment.ups === 1 ? 'upvote' : 'upvotes'}</footer>
                                    </li>
                                ))
                            }
                        </ul>
                    ) 
            }
        </section>
    )
}

export default CommentList;