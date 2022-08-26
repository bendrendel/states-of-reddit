import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Post.css';
import { fetchData } from './postSlice';

function Post() {
    const dispatch = useDispatch();
    const { subreddit } = useParams();

    const postSlice = useSelector(state => state.post);

    useEffect(() => {
        dispatch(fetchData('the post api is working yo'))
    }, []);

    return (
        <div>
            <p>isLoading: {postSlice.isLoading ? 'true' : 'false'}</p>
            <p>hasError: {postSlice.hasError ? 'true' : 'false'}</p>
            {postSlice.data && (
                <div>
                    <p>{`r/${subreddit} - posted by u/${postSlice.data[0].data.children[0].data.author} ${postSlice.data[0].data.children[0].data.created_utc} ago`}</p>
                    <p>{postSlice.data[0].data.children[0].data.title}</p>
                    
                    {/\.jpg$/.test(postSlice.data[0].data.children[0].data.url) ? <img src={postSlice.data[0].data.children[0].data.url} /> : 'no image!'}
                    
                    <p>{postSlice.data[0].data.children[0].data.upvote_ratio * 100}% upvoted</p>
                    <p>{postSlice.data[0].data.children[0].data.num_comments} comments</p>

                    {postSlice.data[1].data.children.map(comment => (
                        <div>
                            <p>{comment.data.author}</p>
                            <p>{comment.data.created_utc} ago</p>
                            <p>{comment.data.body}</p>
                            <p>{comment.data.ups} upvotes</p>
                        </div>
                    ))}                    
                </div>
            )}
        </div>
    )
}

export default Post;