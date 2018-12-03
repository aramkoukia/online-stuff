import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFound from '../routes/404';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';
import io from 'socket.io-client'
import OAuth from './OAuth'
import {
	API_URL
} from './config'
import './App.css'
const socket = io(API_URL)
const providers = ['twitter', 'google', 'facebook', 'github']

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = (e) => {
	  this.setState({
	    currentUrl: e.url,
	  });
	};

	render() {
	  return (
			<div id="app">
				<div className={'container'}>
          {providers.map(provider =>
            <OAuth
              provider={provider}
              key={provider}
              socket={socket}
            />
          )}
        </div>
    <Header selectedRoute={this.state.currentUrl} />
    <Router onChange={this.handleRoute}>
      <Home path="/" />
      <Profile path="/profile/" user="me" />
      <Profile path="/profile/:user" />
      <NotFound default />
    </Router>
  </div>
	  );
	}
}
