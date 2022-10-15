import React, { useEffect } from 'react';
import { useParams, useRouteMatch, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Post.css';
import { fetchData, resetState, selectIsLoading, selectHasError, selectPost, selectComments } from './postSlice';
import { timeSince, kmbt, percent, unescape } from '../../util/formatting';
import Loading from '../../components/loading/Loading';
import Markdown from '../../components/markdown/Markdown';

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
                <p className='error'>Sorry, we're having trouble loading this post.<br /><br />Please try again later.</p>
            )}

            {post && (
                <article className='post'>
                    <header>
                        <p><Link to={`/r/${subreddit}`} className='subreddit-link'>{`r/${subreddit}`}</Link>{` • posted by u/${post.author} ${timeSince(post.created_utc)}`}</p>
                    </header>
                    
                    <h1>{unescape(post.title)}</h1>

                    {
                        /\.(jpg|png)$/.test(post.url)
                        ?
                        <div className='image-url'>
                            <a href={post.url} target='_blank'>
                                <img src={post.url} />
                            </a>
                        </div>
                        :
                        <div className='link-url'>
                            {
                                /\.(jpg|png)$/.test(post.thumbnail)
                                &&
                                <a href={post.url} target='_blank'>
                                    <img src={post.thumbnail} />
                                </a>
                            }
                            {
                                !post.url.includes(post.permalink)
                                &&
                                <a href={post.url} target='_blank'>{post.url}</a>
                            }
                        </div>
                    }

                    <div className="post-body"><Markdown content={post.selftext} /></div>

                    <footer>
                        <p>{percent(post.upvote_ratio)} upvoted</p>
                        <p>{kmbt(post.num_comments)} {post.num_comments == 1 ? 'comment' : 'comments'}</p>
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
                                <footer>{kmbt(comment.ups)} {comment.ups == 1 ? 'upvote' : 'upvotes'}</footer>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    )
}

export default Post;