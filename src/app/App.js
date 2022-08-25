import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from '../components/navbar/Navbar';
import Home from '../components/home/Home';
import Subreddit from '../features/subreddit/Subreddit';
import Post from '../features/post/Post';

function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route exact path='/r/:state'>
					<Subreddit />
				</Route>
				<Route path='/r/:state/comments/:postid/:postname'>
					<Post />
				</Route>
			</Switch>
		</Router>
	)
}

export default App;
