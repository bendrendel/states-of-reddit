import React from 'react';

import ShortPostPreview from './short-post-preview/ShortPostPreview';

import './PostList.css';

function PostList({ posts }) {
    return (
        <ul className='post-list'>
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

export default PostList;