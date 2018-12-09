/* eslint-disable react/no-unused-state */
import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from '../config.json';
import 'preact-material-components/Theme/style.css';

// import style from './style';

export default class Header extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null };
  }

  linkTo = path => () => {
    route(path);
    this.closeDrawer();
  };

  // eslint-disable-next-line react/sort-comp
  goHome = this.linkTo('/');

  goSignUp = this.linkTo('/SignUp');

  logout = () => {
    this.setState({ isAuthenticated: false, user: null });
  };

  onFailure = () => {
    // console.log(error);
  };

  twitterResponse = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then((user) => {
      if (token) {
        this.setState({ isAuthenticated: true, user });
      }
    });
  };

  facebookResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default',
    };
    fetch('http://localhost:4000/api/v1/auth/facebook', options).then((res) => {
      const token = response.headers.get('x-auth-token');
      res.json().then((user) => {
        if (token) {
          this.setState({ isAuthenticated: true, user });
        }
      });
    });
  };

  googleResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default',
    };
    fetch('http://localhost:4000/api/v1/auth/google', options).then((res) => {
      const token = res.headers.get('x-auth-token');
      res.json().then((user) => {
        if (token) {
          this.setState({ isAuthenticated: true, user });
        }
      });
    });
  };

  render() {
    const pointerCursor = { cursor: 'pointer' };
    // const { isAuthenticated } = this.state.isAuthenticated;
    // const { user } = this.state.user;
    const content = !!this.state.isAuthenticated ? (
      <div>
        <TopAppBar.Section align-end shrink-to-fit>
          <TopAppBar.Title>
            {this.state.user.email}
          </TopAppBar.Title>
        </TopAppBar.Section>
        <TopAppBar.Section align-end shrink-to-fit>
          <TopAppBar.Title style={pointerCursor}>
            <TopAppBar.Icon onClick={this.logout}>exit_to_app</TopAppBar.Icon>
          </TopAppBar.Title>
        </TopAppBar.Section>
      </div>)
      : (
        <div>
          {/* <TwitterLogin
            loginUrl="http://localhost:4000/api/v1/auth/twitter"
            onFailure={this.onFailure}
            onSuccess={this.twitterResponse}
            requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
          />
          <FacebookLogin
            appId={config.FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={this.facebookResponse}
          /> */}
          <GoogleLogin
            clientId={config.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
          />
        </div>);

    return (
      <div>
        <TopAppBar className="topappbar">
          <TopAppBar.Row>
            <TopAppBar.Section align-start>
              <TopAppBar.Title style={pointerCursor} menu onClick={this.goHome}>
                Good Pot!
              </TopAppBar.Title>
            </TopAppBar.Section>
            <TopAppBar.Section align-end shrink-to-fit>
              <TopAppBar.Title style={pointerCursor}>
                {content}
              </TopAppBar.Title>
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>
      </div>
    );
  }
}
