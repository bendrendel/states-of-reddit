import React, { useEffect } from 'react';
import { useParams, useRouteMatch, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Post.css';
import { fetchData, resetState, selectIsLoading, selectHasError, selectPost, selectComments } from './postSlice';
import { timeSince, kmbt, percent, unescape } from '../../util/formatting';
import Loading from '../../components/loading/Loading';
import Markdown from '../../components/markdown/Markdown';
import Error from '../../components/error/Error';

function Post() {
    const dispatch = useDispatch();
    const { subreddit } = useParams();
    const { url } = useRouteMatch();
    
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const post = useSelector(selectPost);
    const comments = useSelector(selectComments);

    useEffect(() => {
        const endpoint = `https://www.reddit.com/${url.slice(1, url.length-1)}.json`;
        dispatch(fetchData(endpoint));
        return () => dispatch(resetState());
    }, [url]);

    return (
        <main className='post-page'>
            {isLoading && (
                <Loading />
            )}

            {hasError && (
                <Error />
            )}

            {post && (
                <article className='post'>
                    <header>
                        <p><Link to={`/r/${subreddit}`} className='subreddit-link'>{`r/${subreddit}`}</Link>{` • posted by u/${post.author} ${timeSince(post.created_utc)}`}</p>
                    </header>
                    
                    <h1 className='post-title'>{unescape(post.title)}</h1>

                    {post.post_hint === 'image' && (
                        <div className='image-url'>
                            <a href={post.url} target='_blank'>
                                <img src={post.url} alt='Uploaded jpg or png for post' />
                            </a>
                        </div>
                    )}

                    {post.post_hint === 'hosted:video' && (
                        <div className='video-url'>
                            <a href={post.media.reddit_video.fallback_url} target='_blank'>
                                <video controls autoplay='autoplay' muted src={post.media.reddit_video.fallback_url}>Your browser does not support embedded video</video>
                            </a>
                        </div>
                    )}

                    {(post.post_hint !== 'image' && post.post_hint !== 'hosted:video') && (
                        <div className='link-url'>
                            {
                                /\.(jpg|png)$/.test(post.thumbnail)
                                &&
                                <a href={post.url} target='_blank'>
                                    <img src={post.thumbnail} alt='Uploaded thumbnail for post' />
                                </a>
                            }
                            {
                                !post.url.includes(post.permalink)
                                &&
                                <a href={post.url} target='_blank'>{post.url}</a>
                            }
                        </div>
                    )}


                    <Markdown content={post.selftext} />

                    <footer>
                        <p>{percent(post.upvote_ratio)} upvoted</p>
                        <p>{kmbt(post.num_comments)} {post.num_comments === 1 ? 'comment' : 'comments'}</p>
                    </footer>
                </article>
            )}

            {(comments && comments.length > 0) && (
                <section className='comments'>
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id} className='comment'>
                                <header><strong>{comment.author}</strong> • {timeSince(comment.created_utc)}</header>
                                <div className="comment-body"><Markdown content={comment.body} /></div>
                                <footer>{kmbt(comment.ups)} {comment.ups === 1 ? 'upvote' : 'upvotes'}</footer>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    )
}

export default Post;