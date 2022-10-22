import React from 'react';
import { Link } from 'react-router-dom';

import Markdown from '../../../components/markdown/Markdown';

import { timeSince, kmbt, percent, unescape } from '../../../util/formatting';

import './FullPostPreview.css';

function FullPostPreview({ post, subreddit }) {
    return (
        <article className='full-post-preview'>
            <header>
                <p>
                    <Link to={`/r/${subreddit}`} className='subreddit-link'>{`r/${subreddit}`}</Link>
                    {` • posted by u/${post.author} ${timeSince(post.created_utc)}`}
                </p>
            </header>

            <h1 className='post-title'>{unescape(post.title)}</h1>

            {post.post_hint === 'image' && (
                <div className='image-url'>
                    <a href={post.url} target='_blank'>
                        <img src={post.url} alt='Uploaded jpg or png for post' />
                    </a>
                </div>
            )}

            {post.post_hint === 'hosted:video' && (
                <div className='video-url'>
                    <a href={post.media.reddit_video.fallback_url} target='_blank'>
                        <video controls autoplay='autoplay' muted src={post.media.reddit_video.fallback_url}>Your browser does not support embedded video</video>
                    </a>
                </div>
            )}

            {(post.post_hint !== 'image' && post.post_hint !== 'hosted:video') && (
                <div className='link-url'>
                    {
                        /\.(jpg|png)$/.test(post.thumbnail)
                        &&
                        <a href={post.url} target='_blank'>
                            <img src={post.thumbnail} alt='Uploaded thumbnail for post' />
                        </a>
                    }
                    {
                        !post.url.includes(post.permalink)
                        &&
                        <a href={post.url} target='_blank'>{post.url}</a>
                    }
                </div>
            )}

            <Markdown content={post.selftext} />

            <footer>
                <p>{percent(post.upvote_ratio)} upvoted</p>
                <p>{kmbt(post.num_comments)} {post.num_comments === 1 ? 'comment' : 'comments'}</p>
            </footer>
        </article>
    )
}

export default FullPostPreview;