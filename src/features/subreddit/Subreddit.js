import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Subreddit.css';
import { fetchData, resetState, selectIsLoading, selectHasError, selectPosts } from './subredditSlice';
import { states } from '../../util/states';
import { timeSince, kmbt, unescape } from '../../util/formatting';
import Search from '../search/Search';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';

function Subreddit() {
    const dispatch = useDispatch();
    const { subreddit } = useParams();

    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const posts = useSelector(selectPosts);

    const stateAbbreviation = states.find(state => state.subreddit === subreddit).abbreviation;
    const stateFlag = require(`../../util/state-flags/${stateAbbreviation.toLowerCase()}.svg`);

    useEffect(() => {
        const endpoint = `https://www.reddit.com/r/${subreddit}.json`
        dispatch(fetchData(endpoint))
        return () => dispatch(resetState());
    }, [subreddit]);

    return (
        <main className='subreddit-page'>
            <header style={{ backgroundImage: `url(${stateFlag})`}} className='subreddit-header'>
                <h1>{`r/${subreddit}`}</h1>
                <Search />                
            </header>

            {isLoading && (
                <Loading />
            )}

            {hasError && (
                <Error />
            )}

            {posts && (
                <section className='subreddit-posts'>
                    <ul>
                        {posts.map(post => (
                            <li key={post.data.id}>
                                <Link to={post.data.permalink} className='post-preview'>
                                    <header>
                                        <p>{`posted by u/${post.data.author} ${timeSince(post.data.created_utc)}`}</p>
                                    </header>
                                    <h2>{unescape(post.data.title)}</h2>
                                    <footer>
                                        <p>{kmbt(post.data.ups)} {post.data.ups == 1 ? 'upvote' : 'upvotes'}</p>
                                        <p>{kmbt(post.data.num_comments)} {post.data.num_comments == 1 ? 'comment' : 'comments'}</p>                            
                                    </footer>
                                </Link>                            
                            </li>
                        ))}                    
                    </ul>
                </section>
            )}
        </main>
    )
}

export default Subreddit;