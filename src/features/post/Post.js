import React from 'react';
import { useSelector } from 'react-redux';
import './Post.css';

function Post() {

    const postSlice = useSelector(state => state.post)

    return (
        <div>
            <p>Post</p>
            <p>{postSlice.data}</p>
        </div>
    )
}

export default Post;