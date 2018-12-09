import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from '../config.json';

// import style from './style';

export default class Header extends Component {

  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: "" };
  }

  linkTo = path => () => {
    route(path);
    this.closeDrawer();
  };

  goHome = this.linkTo('/');

  goSignUp = this.linkTo('/SignUp');

    logout = () => {
      this.setState({ isAuthenticated: false, token: '', user: null })
    };

    onFailure = (error) => {
      alert(error);
    };

    twitterResponse = (response) => {
      const token = response.headers.get('x-auth-token');
      response.json().then(user => {
        if (token) {
          this.setState({ isAuthenticated: true, user, token });
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
      fetch('http://localhost:4000/api/v1/auth/facebook', options).then(r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => {
          if (token) {
            this.setState({ isAuthenticated: true, user, token });
          }
        });
      })
    };

    googleResponse = (response) => {
      const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
      const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default',
      };
      fetch('http://localhost:4000/api/v1/auth/google', options).then(r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => {
          if (token) {
            this.setState({ isAuthenticated: true, user, token })
          }
        });
      })
    };

  render(props) {
    console.log(props.selectedRoute);
    const pointerCursor = { cursor: 'pointer' };
      let content = !!this.state.isAuthenticated ?
        (
          <div>
            <p>Authenticated</p>
            <div>
              {this.state.user.email}
            </div>
            <div>
              <button onClick={this.logout} className="button">
                Log out
                        </button>
            </div>
          </div>
        ) :
        (
          <div>
            <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
              onFailure={this.onFailure} onSuccess={this.twitterResponse}
              requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse" />
            <FacebookLogin
              appId={config.FACEBOOK_APP_ID}
              autoLoad={false}
              fields="name,email,picture"
              callback={this.facebookResponse}
            />
            <GoogleLogin
              clientId={config.GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.googleResponse}
              onFailure={this.onFailure}
            />
          </div>
        );


	  return (
      <div>
         <TopAppBar className="topappbar">
           <TopAppBar.Row>
             <TopAppBar.Section align-start>
               {/* <TopAppBar.Icon style={pointerCursor} menu onClick={this.goHome}>
                 menu
               </TopAppBar.Icon> */}
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
