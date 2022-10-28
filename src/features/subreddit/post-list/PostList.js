import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import ShortPostPreview from './short-post-preview/ShortPostPreview';

import './PostList.css';

function PostList({ posts, searchQuery, subreddit }) {
    return (
        <div className='post-list'>
            {
                searchQuery
                    ? (
                        <div className='search-message'>
                            <span>{`Showing search results for "${decodeURIComponent(searchQuery)}"`}</span>
                            <Link to={`/r/${subreddit}`}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </Link>
                        </div>
                    )
                    : null
            }
                        
            {
                posts.length === 0
                    ? <div className='no-posts-message'>Sorry, no posts found</div>
                    : (
                        <ul>
                            {
                                posts.map(post => (
                                    <li key={post.id}>
                                        <ShortPostPreview post={post} />
                                    </li>
                                ))
                            }
                        </ul>
                    )
            }
        </div>
    )
}

export default PostList;