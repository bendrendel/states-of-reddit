import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';
import Home from '../components/home/Home';
import Subreddit from '../features/subreddit/Subreddit';
import Post from '../features/post/Post';

import './App.css';

function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path={['/r/:subreddit', '/r/:subreddit/search']}>
					<Subreddit />
				</Route>
				<Route path='/r/:subreddit/comments/:postid/:postname'>
					<Post />
				</Route>
			</Switch>
		</Router>
	)
}

export default App;
