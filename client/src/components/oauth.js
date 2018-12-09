import { h, Component } from 'preact';
import PropTypes from 'prop-types';
// import Fab from 'preact-material-components/Fab';
// import 'preact-material-components/Fab/style.css';
import Icon from 'preact-material-components/Icon';
import FontAwesome from 'react-fontawesome';
import { API_URL } from './config';

export default class OAuth extends Component {
  state = {
    user: {},
    disabled: '',
  }

  componentDidMount() {
    const { socket, provider } = this.props;

    socket.on(provider, (user) => {
      this.popup.close();
      this.setState({ user });
    });
  }

  openPopup() {
    const { provider, socket } = this.props;
    const width = 600;
    const height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    const url = `${API_URL}/${provider}?socketId=${socket.id}`;

    return window.open(url, '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width},
      height=${height}, top=${top}, left=${left}`,);
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: 'disabled' });
    }
  }

  closeCard = () => {
    this.setState({ user: {} });
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: '' });
      }
    }, 1000);
  }

  render() {
    const { name, photo } = this.state.user;
    const { provider } = this.props;
    const { disabled } = this.state;
    const atSymbol = provider === 'twitter' ? '@' : '';

    return (
      <div>
        {name
          ? (
<div className={'card'}>
              <img src={photo} alt={name} />
            <FontAwesome
              name={'times-circle'}
              className={'close'}
              onClick={this.closeCard}
            />
            <h4>{`${atSymbol}${name}`}</h4>
          </div>
)
          : (
            <div className={'button-wrapper fadein-fast'}>
              <Icon>account_circle</Icon>
            <button
              onClick={this.startAuth}
              className={`${provider} ${disabled} button`}
            >
              <FontAwesome
                name={provider}
              />
            </button>
          </div>
)
        }
      </div>
    );
  }
}

OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired,
};
