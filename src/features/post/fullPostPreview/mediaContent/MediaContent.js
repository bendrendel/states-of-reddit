import React from 'react';

import './MediaContent.css';

function MediaContent({ post }) {
    if (post.post_hint === 'image') {
        return (
            <div className='media-content image-media'>
                <a href={post.url} target='_blank'>
                    <img src={post.url} alt='Uploaded jpg or png for post' />
                </a>
            </div>
        )
    } else if (post.post_hint === 'hosted:video') {
        return (
            <div className='media-content video-media'>
                <a href={post.media.reddit_video.fallback_url} target='_blank'>
                    <video
                        controls
                        autoplay='autoplay'
                        muted
                        src={post.media.reddit_video.fallback_url}
                    >Your browser does not support embedded video</video>
                </a>
            </div>
        )
    } else {
        return (
            <div className='media-content other-media'>
                {
                    /\.(jpg|png)$/.test(post.thumbnail)
                        ? (
                            <a href={post.url} target='_blank'>
                                <img src={post.thumbnail} alt='Uploaded thumbnail for post' />
                            </a>
                        )
                        : null
                    
                }
                {
                    !post.url.includes(post.permalink)
                        ? <a href={post.url} target='_blank'>{post.url}</a>
                        : null
                }
            </div>
        )
    }
}

export default MediaContent;