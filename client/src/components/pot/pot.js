import { h } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import Fab from 'preact-material-components/Fab';
import 'preact-material-components/Fab/style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';
import Chips from 'preact-material-components/Chips';
import 'preact-material-components/Chips/style.css';
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
          <Typography headline5>
            {this.props.item.vendor}
            {', '}
            {this.props.item.title}
          </Typography>
          <div>
            <Chips>
              <Chips.Chip>
                <Chips.Text>{`Price: ${this.props.item.price}`}</Chips.Text>
              </Chips.Chip>
            </Chips>
          </div>
        </div>
        <div className={style.cardBody} />
        <Card.Media className="card-media">
          <img className={style.imageWidth} src={this.props.item.image} alt={this.props.item.title} />
        </Card.Media>
        <Card.Actions>
          <Card.ActionButtons default>
            <RatingStars
              count={5}
              onChange={ratingChanged}
              size={40}
              color2="#ffd700"
            />
            {/* <Card.ActionButton>Details</Card.ActionButton>
            <Card.ActionButton>Comments</Card.ActionButton> */}
          </Card.ActionButtons>
          <Card.ActionIcons>
            <Fab><Fab.Icon>share</Fab.Icon></Fab>
          </Card.ActionIcons>
        </Card.Actions>
      </Card>
    );
  }
}
