import './Card.css';

import { CARD_TYPE } from './../../constants';

const Card = (props) => {
  const { card, onClickHandler } = props;
  const { id, label, selected } = card;
  
  return (
    
    <div className = 'card-wrapper'>
      <div  
        id = { id }
        className = { `card ${ (selected) ? 'card--active' : '' }` }
        data-type = { CARD_TYPE }
        onClick = { onClickHandler }
      >
        { label }
      </div>
    </div>
    
  );
};

export default Card;
