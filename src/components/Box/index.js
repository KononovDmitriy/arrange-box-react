import './Box.css';
import Card from './../Card';

const Box = (props) => {
  const { cards, header, onClickHandler, onCardDragStartHandler,
    onCardDragEndHandler, onCardDragEnterHandler, onCardDragLeaveHandler,
    onCardDropHandler, onBoxDragEnterHandler, onBoxDragLeaveHandler } = props;
  
  return (
    <div className = "Box">
      <div className = "Box-box">
        <div className = "Box-header">{ header }</div>
        <div 
          className = "Box-basket"
          onClick = { onClickHandler }
          data-type = 'box-backet'

          onDragEnter = { onBoxDragEnterHandler }
          onDragLeave = { onBoxDragLeaveHandler }
          onDragOver = { (ev) => ev.preventDefault() }
        >
          { cards.map(card => 
            <Card 
              id = {card.id}
              label = {card.label} 
              selected = { card.selected }
              key = { card.id }

              onDragStartHandler = { onCardDragStartHandler }
              onDragEndHandler = { onCardDragEndHandler }
              onDragEnterHandler = { onCardDragEnterHandler }
              onDragLeaveHandler = { onCardDragLeaveHandler }
              onDropHandler = { onCardDropHandler }

            />) }
        </div>
      </div>
    </div>
  );
};

export default Box;
