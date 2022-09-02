import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Post.css';
import { fetchData, selectIsLoading, selectHasError, selectPost, selectComments } from './postSlice';
import { timeSince, kmbt } from '../../util/formatting';

function Post() {
    const dispatch = useDispatch();
    const { subreddit } = useParams();

    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const post = useSelector(selectPost);
    const comments = useSelector(selectComments);

    useEffect(() => {
        dispatch(fetchData('the post api is working yo'))
    }, []);

    return (
        <div>
            <p>isLoading: {isLoading ? 'true' : 'false'}</p>
            <p>hasError: {hasError ? 'true' : 'false'}</p>
            {post && (
                <div>
                    <p>{`r/${subreddit} - posted by u/${post.author} ${timeSince(post.created_utc)}`}</p>
                    <p>{post.title}</p>
                    
                    {/\.jpg$/.test(post.url) ? <img src={post.url} /> : 'no image!'}
                    
                    <p>{post.upvote_ratio * 100}% upvoted</p>
                    <p>{kmbt(post.num_comments)} comments</p>

                    {comments.map(comment => (
                        <div>
                            <p>{comment.data.author}</p>
                            <p>{timeSince(comment.data.created_utc)}</p>
                            <p>{comment.data.body}</p>
                            <p>{kmbt(comment.data.ups)} upvotes</p>
                        </div>
                    ))}                    
                </div>
            )}
        </div>
    )
}

export default Post;