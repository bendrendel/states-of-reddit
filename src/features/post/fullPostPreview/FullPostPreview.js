import React from 'react';
import { Link } from 'react-router-dom';

import MediaContent from './mediaContent/MediaContent';
import Markdown from '../../../components/markdown/Markdown';

import { timeSince, kmbt, percent, unescape } from '../../../utils/formatting';

import './FullPostPreview.css';

function FullPostPreview({ post, subredditName }) {
    return (
        <article className='full-post-preview'>
            <header>
                <p>
                    <Link to={`/r/${subredditName}`}>r/{subredditName}</Link>
                    • posted by u/{post.author} {timeSince(post.created_utc)}
                </p>
            </header>

            <h1>{unescape(post.title)}</h1>

            <MediaContent post={post} />

            <Markdown content={post.selftext} />

            <footer>
                <p>{percent(post.upvote_ratio)} upvoted</p>
                <p>{kmbt(post.num_comments)} {post.num_comments === 1 ? 'comment' : 'comments'}</p>
            </footer>
        </article>
    )
}

export default FullPostPreview;