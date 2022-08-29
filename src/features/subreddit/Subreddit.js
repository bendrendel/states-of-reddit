import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Subreddit.css';
import Search from '../search/Search';
import { fetchData } from './subredditSlice';
import { DateTime } from 'luxon';

function Subreddit() {
    const dispatch = useDispatch();
    const { subreddit } = useParams();

    const subredditSlice = useSelector(state => state.subreddit);

    useEffect(() => {
        dispatch(fetchData('the subreddit api is working yo'))
    }, []);

    const elapsedCreated = () => {
        const createDateTime = DateTime.fromSeconds(1593466086);
        const currentDateTime = DateTime.utc();
        const diff = currentDateTime.diff(createDateTime, ['years', 'months', 'days', 'hours', 'minutes']);
        const diffObj = diff.toObject();
        let duration = '';
        if (diffObj.years >= 2) {
            duration = `${Math.floor(diffObj.years)} years ago`;
        } else if (diffObj.years >= 1) {
            duration = `a year ago`;
        } else if (diffObj.months >= 2) {
            duration = `${Math.floor(diffObj.months)} months ago`;
        } else if (diffObj.months >= 1) {
            duration = `a month ago`;
        } else if (diffObj.days >= 2) {
            duration = `${Math.floor(diffObj.days)} days ago`;
        } else if (diffObj.days >= 1) {
            duration = `a day ago`;
        } else if (diffObj.hours >= 2) {
            duration = `${Math.floor(diffObj.hours)} hours ago`;
        } else if (diffObj.hours >= 1) {
            duration = `an hour ago`;
        } else if (diffObj.minutes >= 2) {
            duration = `${Math.floor(diffObj.minutes)} minutes ago`;
        } else if (diffObj.minutes >= 1) {
            duration = `a minute ago`;
        } else {
            duration = `just now`;
        }
        return duration;
    };

    return (
        <div>
            <p>{`r/${subreddit}`}</p>
            <Search />

            <p>isLoading: {subredditSlice.isLoading ? 'true' : 'false'}</p>
            <p>hasError: {subredditSlice.hasError ? 'true' : 'false'}</p>

            {subredditSlice.data && subredditSlice.data.data.children.map(post => (
                <div>
                    <p>posted by {`u/${post.data.author}`}</p>
                    <p>{post.data.created_utc} ago</p>
                    <p>diff: {elapsedCreated()}</p>
                    <p>{post.data.title}</p>
                    <p>{post.data.ups} upvotes</p>
                    <p>{post.data.num_comments} comments</p>
                    <Link to={post.data.permalink}>Post Link</Link>
                </div>
            ))}
            
        </div>
    )
}

export default Subreddit;