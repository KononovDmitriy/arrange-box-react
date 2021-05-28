import './Box.css';
import Card from './../Card';

const onCardClickHandler = () => {
  console.log('onCardClickHandler');
}


const Box = () => {
  return (
    <div className="Box">
      <div className="Box-box">
        <div className="Box-header">FFFF</div>
        <div className="Box-basket">
          <Card 
            id = '123'
            label = 'KJHGHFGHJJKLKL'
            selected = { false }
            onCardClickHabler = { onCardClickHandler }
          />
        </div>
      </div>
    </div>
  );
};

export default Box;