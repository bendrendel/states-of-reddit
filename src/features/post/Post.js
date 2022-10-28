import React, { useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import FullPostPreview from './full-post-preview/FullPostPreview';
import CommentList from './comment-list/CommentList';

import { fetchData, resetState, selectIsLoading, selectHasError, selectPost, selectComments } from './postSlice';

import './Post.css';

function Post() {
    const dispatch = useDispatch();

    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const post = useSelector(selectPost);
    const comments = useSelector(selectComments);

    const { subreddit } = useParams();
    const { url } = useRouteMatch();

    useEffect(() => {
        const endpoint = `https://www.reddit.com/${url.slice(1, url.length - 1)}.json`;
        dispatch(fetchData(endpoint));
        return () => dispatch(resetState());
    }, [url]);

    const apiResponse = () => {
        if (hasError) {
            return <Error />;
        } else if (isLoading) {
            return <Loading />;
        } else if (post || comments) {
            return (
                <div className='post-api-data'>
                    {post ? <FullPostPreview post={post} subreddit={subreddit} /> : null}
                    {comments ? <CommentList comments={comments} /> : null}
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <main className='post'>
            {apiResponse()}
        </main>
    );
}

export default Post;