import { h, Component } from 'preact';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import Pot from '../pot/pot';
// import style from './pot-list.css';

export default class PotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch('https://qualitymj.blob.core.windows.net/main/products.json')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return (
        <div>
        Error:
          {' '}
          {error.message}
        </div>
      );
    } if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h1>Good stuff!</h1>
        <LayoutGrid>
          <LayoutGrid.Inner>
            {items.map(item => (
              <LayoutGrid.Cell cols="3">
                <Pot item={item} />
              </LayoutGrid.Cell>
            ))}
          </LayoutGrid.Inner>
        </LayoutGrid>
      </div>
    );
  }
}
