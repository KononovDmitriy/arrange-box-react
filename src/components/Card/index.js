import './Card.css';

const Card = (props) => {
  const { id, label, selected, onCardClickHabler } = props;
  
  return (
    <div 
      id = { id }
      className = { `card ${ (selected) ? 'card--active' : '' }` }
      onClick = { onCardClickHabler }
    >
      { label }
    </div>
  );
};

export default Card;