import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Icon from 'preact-material-components/Icon';
import style from './style';
import RatingStars from '../rating-stars/rating-stars';

export default class Pot extends Component {
	
	render() {
		const ratingChanged = (newRating) => {
			console.log(newRating)
		}
	
		return (
			<Card>
				<div class={style.cardHeader}>
					<h2 class=" mdc-typography--title">{this.props.item.vendor}</h2>
					<div class=" mdc-typography--caption">{this.props.item.title}</div>
					<div class=" mdc-typography--caption">{`Price: ${this.props.item.price}`}</div>
				</div>
				<div class={style.cardBody}>
				</div>
				<Card.Media className="card-media">
					<img style="width:200px" src={this.props.item.image}></img>
				</Card.Media>
				<Card.Actions>
					<Card.ActionButton default>
					<RatingStars
						count={5}
						onChange={ratingChanged}
						size={24}
						color2={'#ffd700'} />
						{/* <Icon>add</Icon> Add to list */}
					</Card.ActionButton>
				</Card.Actions>
			</Card>
		);
	}
}
