import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Pot from '../pot/pot';

export default class PotList extends Component {
	render() {
		return (
			<div>
				<Pot />
				<Pot />
			</div>
		);
	}
}
