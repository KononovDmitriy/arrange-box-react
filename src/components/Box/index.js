import './Box.css';
import Card from './../Card';

const Box = (props) => {
  const { cards, header, onCardClickHandler } = props;
  
  return (
    <div className="Box">
      <div className="Box-box">
        <div className="Box-header">{ header }</div>
        <div className="Box-basket">
          { cards.map(card => 
            <Card 
              id = {card.id}
              label = {card.label} 
              selected = { card.selected }
              onCardClickHabler = { onCardClickHandler }
              key = { card.id }
            />) }
        </div>
      </div>
    </div>
  );
};

export default Box;


