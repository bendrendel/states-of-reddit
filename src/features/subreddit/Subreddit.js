import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Subreddit.css';
import Search from '../search/Search';
import { fetchData, selectIsLoading, selectHasError, selectPosts } from './subredditSlice';
import { timeSince, kmbt } from '../../util/formatting';

function Subreddit() {
    const dispatch = useDispatch();
    const { subreddit } = useParams();

    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const posts = useSelector(selectPosts);

    useEffect(() => {
        dispatch(fetchData('the subreddit api is working yo'))
    }, []);

    return (
        <main className='subreddit-page'>
            <header>
                <h1>{`r/${subreddit}`}</h1>
                <Search />                
            </header>
            <section>
                <ul>
                    {posts && posts.map(post => (
                        <li key={post.data.id}>
                            <article className="post-preview">
                                <header>
                                    <p>{`posted by u/${post.data.author} ${timeSince(post.data.created_utc)}`}</p>
                                </header>
                                <Link to={post.data.permalink}>
                                    <h2>{post.data.title}</h2>
                                </Link>
                                <footer>
                                    <p>{kmbt(post.data.ups)} {post.data.ups == 1 ? 'upvote' : 'upvotes'}</p>
                                    <p>{kmbt(post.data.num_comments)} {post.data.num_comments == 1 ? 'comment' : 'comments'}</p>                            
                                </footer>
                            </article>                            
                        </li>
                    ))}                    
                </ul>
            </section>
        </main>
    )
}

export default Subreddit;