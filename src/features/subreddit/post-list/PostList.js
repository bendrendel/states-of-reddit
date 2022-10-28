import React from 'react';

import PartialPostPreview from './partial-post-preview/PartialPostPreview';

import './PostList.css';

function PostList({ posts }) {
    return (
        <ul className='post-list'>
            {
                posts.map(post => (
                    <li key={post.id}>
                        <PartialPostPreview post={post} />
                    </li>
                ))
            }
        </ul>
    )
}

export default PostList;