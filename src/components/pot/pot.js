import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Icon from 'preact-material-components/Icon';
import style from './style';

export default class Pot extends Component {
	
	render() {
		return (
			<Card>
				<div class={style.cardHeader}>
					<h2 class=" mdc-typography--title">{this.props.item.title}</h2>
					<div class=" mdc-typography--caption">{this.props.item.vendor}</div>
					<div class=" mdc-typography--caption">{this.props.item.price}</div>
				</div>
				<div class={style.cardBody}>
					<img src={this.props.item.image}></img>
				</div>
				<Card.Actions>

					<Card.ActionButton default>
						<Icon>add</Icon> Add to list
					</Card.ActionButton>
				
				</Card.Actions>

			</Card>
		);
	}
}
