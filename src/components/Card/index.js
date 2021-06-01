import './Card.css';

import { CARD_TYPE } from './../../constants';

const Card = (props) => {
  const { id, label, selected } = props;
  
  return (
    <div 
      id = { id }
      className = { `card ${ (selected) ? 'card--active' : '' }` }
      data-type = { CARD_TYPE }
    >
      { label }
    </div>
  );
};

export default Card;