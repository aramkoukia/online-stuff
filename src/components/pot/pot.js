import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
// import Icon from 'preact-material-components/Icon';
import style from './pot.css';
import RatingStars from '../rating-stars/rating-stars';

export default class Pot {
  render() {
    const ratingChanged = (_newRating) => {
      // console.log(newRating);
    };

    return (
      <Card>
        <div className={style.cardHeader}>
          <h2 className=" mdc-typography--title">{this.props.item.vendor}</h2>
          <div className=" mdc-typography--caption">{this.props.item.title}</div>
          <div className=" mdc-typography--caption">{`Price: ${this.props.item.price}`}</div>
        </div>
        <div className={style.cardBody} />
        <Card.Media className="card-media">
          <img className={style.imageWidth} src={this.props.item.image} alt={this.props.item.title} />
        </Card.Media>
        <Card.Actions>
          <Card.ActionButton default>
            <RatingStars
              count={5}
              onChange={ratingChanged}
              size={24}
              color2="#ffd700"
            />
          </Card.ActionButton>
        </Card.Actions>
      </Card>
    );
  }
}
