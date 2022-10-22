import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import PostPreview from './post-preview/PostPreview';

import './PostList.css';

function PostList({ posts, searchQuery, subreddit }) {
    return (
        <section className='post-list'>
            {
                searchQuery
                    ? (
                        <div className='search-message'>
                            <span>Showing search results for "{decodeURIComponent(searchQuery)}"</span>
                            <Link to={`/r/${subreddit}`} className='clear-search'>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </Link>
                        </div>
                    )
                    : null
            }
                        
            {
                posts.length === 0
                    ? <div className='no-posts'>Sorry, no posts found</div>
                    : (
                        <ul>
                            {
                                posts.map(post => (
                                    <li key={post.id}>
                                        <PostPreview post={post} />
                                    </li>
                                ))
                            }
                        </ul>
                    )
            }
        </section>
    )
}

export default PostList;