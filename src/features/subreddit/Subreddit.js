import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Subreddit.css';
import { states } from '../../util/states';
import Search from '../search/Search';
import { fetchData, selectIsLoading, selectHasError, selectPosts } from './subredditSlice';
import { timeSince, kmbt } from '../../util/formatting';

function Subreddit() {
    const dispatch = useDispatch();
    const { subreddit } = useParams();

    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const posts = useSelector(selectPosts);

    const stateAbbreviation = states.find(state => state.subreddit === subreddit).abbreviation;
    const stateFlag = require(`../../util/state-flags/${stateAbbreviation.toLowerCase()}.svg`);

    useEffect(() => {
        dispatch(fetchData('the subreddit api is working yo'))
    }, []);

    return (
        <main className='subreddit-page'>
            <header style={{ backgroundImage: `url(${stateFlag})`}} className='subreddit-header'>
                <h1>{`r/${subreddit}`}</h1>
                <Search />                
            </header>
            <section className='subreddit-posts'>
                <ul>
                    {posts && posts.map(post => (
                        <li key={post.data.id}>
                            <Link to={post.data.permalink} className='post-preview'>
                                <header>
                                    <p>{`posted by u/${post.data.author} ${timeSince(post.data.created_utc)}`}</p>
                                </header>
                                <h2>{post.data.title}</h2>
                                <footer>
                                    <p>{kmbt(post.data.ups)} {post.data.ups == 1 ? 'upvote' : 'upvotes'}</p>
                                    <p>{kmbt(post.data.num_comments)} {post.data.num_comments == 1 ? 'comment' : 'comments'}</p>                            
                                </footer>
                            </Link>                            
                        </li>
                    ))}                    
                </ul>
            </section>
        </main>
    )
}

export default Subreddit;