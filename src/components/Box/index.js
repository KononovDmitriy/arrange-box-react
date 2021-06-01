import './Box.css';
import Card from './../Card';

const Box = (props) => {
  const { cards, header, onClickHandler } = props;
  
  return (
    <div className = "Box">
      <div className = "Box-box">
        <div className = "Box-header">{ header }</div>
        <div 
          className = "Box-basket"
          onClick = { onClickHandler }
        >
          { cards.map(card => 
            <Card 
              id = {card.id}
              label = {card.label} 
              selected = { card.selected }
              key = { card.id }
            />) }
        </div>
      </div>
    </div>
  );
};

export default Box;


