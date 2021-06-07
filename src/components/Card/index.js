import './Card.css';

import { CARD_TYPE } from './../../constants';

const dragOverHandler = (ev) => {
  ev.preventDefault();
};


const Card = (props) => {
  const { id, label, selected } = props;
  const { onDragStartHandler, onDragEndHandler, onDragEnterHandler,
    onDragLeaveHandler, onDropHandler } = props;
  
  return (
    <div 
      id = { id }
      className = { `card ${ (selected) ? 'card--active' : '' }` }
      draggable = { true }

      data-type = { CARD_TYPE }
      onDragStart = { onDragStartHandler }
      onDragOver = { dragOverHandler }
      onDragEnter = { onDragEnterHandler }
      onDragLeave = { onDragLeaveHandler }
      onDragEnd = { onDragEndHandler }
      onDrop = { onDropHandler }
    >
      { label }
    </div>
  );
};

export default Card;