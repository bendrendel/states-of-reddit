import React, { useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import FullPostPreview from './fullPostPreview/FullPostPreview';
import CommentList from './commentList/CommentList';
import NoCommentsIndicator from './noCommentsIndicator/NoCommentsIndicator';

import { fetchData, resetState, selectIsLoading, selectHasError, selectPost, selectComments } from './postSlice';

import './Post.css';

function Post() {
    const dispatch = useDispatch();

    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const post = useSelector(selectPost);
    const comments = useSelector(selectComments);

    const { subredditName } = useParams();
    const { url } = useRouteMatch();

    useEffect(() => {
        const endpoint = `https://www.reddit.com/${url.slice(1, url.length - 1)}.json`;
        dispatch(fetchData(endpoint));
        return () => dispatch(resetState());
    }, [url, dispatch]);

    const apiContent = () => {
        if (hasError) {
            return <Error />;
        } else if (isLoading) {
            return <Loading />;
        } else if (post || comments) {
            return (
                <div className='post-api-data'>
                    {
                        post
                            ? <FullPostPreview post={post} subredditName={subredditName} />
                            : null
                    }
                    {
                        comments && comments.length === 0
                            ? <NoCommentsIndicator />
                            : null
                    }
                    {
                        comments && comments.length > 0
                            ? <CommentList comments={comments} />
                            : null
                    }
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <main className='post'>
            {apiContent()}
        </main>
    );
}

export default Post;