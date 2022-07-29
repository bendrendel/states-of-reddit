import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Post.css';
import { fetchData } from './postSlice';

function Post() {
    const dispatch = useDispatch();

    const postSlice = useSelector(state => state.post);

    useEffect(() => {
        dispatch(fetchData('the post api is working yo'))
    }, []);

    return (
        <div>
            <p>Post</p>
            <p>isLoading: {postSlice.isLoading ? 'true' : 'false'}</p>
            <p>hasError: {postSlice.hasError ? 'true' : 'false'}</p>
            <p>data: {postSlice.data}</p>
        </div>
    )
}

export default Post;