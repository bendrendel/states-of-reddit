import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './Post.css';
import { fetchData, selectIsLoading, selectHasError, selectPost, selectComments } from './postSlice';
import { timeSince, kmbt, percent } from '../../util/formatting';

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
        <main className='post-page'>
            {post && (
                <article className='post'>
                    <header>
                        <p><strong>{`r/${subreddit}`}</strong>{` • posted by u/${post.author} ${timeSince(post.created_utc)}`}</p>    
                    </header>
                    
                    <h1>{post.title}</h1>

                    {/\.jpg$/.test(post.url) && <img src={post.url} />}

                    <div className="post-body"><ReactMarkdown remarkPlugins={[gfm]} children={post.selftext} /></div>

                    <footer>
                        <p>{percent(post.upvote_ratio)} upvoted</p>
                        <p>{kmbt(post.num_comments)} {post.num_comments == 1 ? 'comment' : 'comments'}</p>                        
                    </footer>
                </article>
            )}

            <section className='comments'>
                <ul>
                    {post && (
                        comments.map(comment => (
                            <li key={comment.data.id} className='comment'>
                                <header><strong>{comment.data.author}</strong> • {timeSince(comment.data.created_utc)}</header>
                                <p className="comment-body"><ReactMarkdown remarkPlugins={[gfm]} children={comment.data.body} /></p>
                                <footer>{kmbt(comment.data.ups)} {comment.data.ups == 1 ? 'upvote' : 'upvotes'}</footer>
                            </li>
                        ))
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Post;