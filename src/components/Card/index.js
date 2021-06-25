import React from 'react';
import './Card.css';

import { CARD_TYPE } from './../../constants';

import { dndPugHandler } from './../../tools';

// const Card = (props) => {
//   const { card, onClickHandler } = props;
//   const { dndStartHandler, dndEndHandler } = props;
  
//   const { id, label, selected } = card;
  
//   return (
     
//     <div className = 'card-wrapper'>
//       <div  
//         id = { id }
//         className = { `card ${ (selected) ? 'card--active' : '' }` }
//         data-type = { CARD_TYPE }
//         onClick = { onClickHandler }

//         draggable = { true }
//         onDragStart = { dndStartHandler }
//         onDragEnd = { dndEndHandler}
//       >
//         { label }
//       </div>
//     </div>
    
//   );
// };

class Card extends React.Component {

  constructor(props) {
    super(props);

    this.id = props.card.id;
    this.createRef = (ref) => {
      this.node = ref;
    }

    this.dnd = false;
  }

  
  componentDidUpdate() {
    // console.log(`card ${this.id} DID UPDATE!`);
  }
  
  render() {
    const { card, onClickHandler } = this.props;
    const { dndStartHandler, dndEndHandler, dndEnterHandler,
      dndLeaveHandler } = this.props;
  
    const { id, label, selected, dnd } = card;
  
    return (
      <div 
        className = 'card-wrapper'
        
        onDragEnter = { dndPugHandler }
        onDragLeave = { dndPugHandler }
        onDragOver = { dndPugHandler }
      >
        <div  
          id = { id }
          ref = { this.createRef }

          className = { `
            card 
            ${ (selected) ? 'card--active' : '' }
            ${ (dnd) ? 'card--dnd': '' } 
          ` }
          data-type = { CARD_TYPE }
          onClick = { onClickHandler }

          draggable = { true }
          onDragStart = { dndStartHandler }
          onDragEnd = { dndEndHandler}
          onDragEnter = { dndEnterHandler }
          onDragLeave = { dndLeaveHandler }
          onDragOver = { dndPugHandler }
          
        >
          { label }
        </div>
      </div>
    );
  }
  
  
  
};

export default Card;
