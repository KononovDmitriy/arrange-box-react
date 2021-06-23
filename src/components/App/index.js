/* eslint-disable default-case */
import React from 'react';

import './App.css';

import Box from '../Box';
import LeftColumnControls from '../LeftColumnConrols';
import RightColumnControls from '../RightColumnControls';
import CenterControls from '../CenterControls';

import { CARD_TYPE, BUTTON_TYPE, ButtonsTypes } from './../../constants';

import { stateBoxLeft, stateBoxRight } from './../../state/State';
const DND_PUG = {
  id: 777,
  label: '!',
  pug: true
}

const DndFocusObjects = {
  BOX: 'BOX',
  CARD: 'CARD'
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {stateBoxLeft, stateBoxRight};
    this.multiSelect = false;

    this.oldState = null;
    
    this.dragEnd = false; 
    this.currentDragCard = null;
    this.dndOldFocus = null;
  }

  _getSelectedCardsIndexes = (box) => {
    const selectedCards = [];
  
    box.forEach((card, index) => {
      if (card.selected) {
        selectedCards.push({
          index,
          card 
        });
      }
    });
  
    return selectedCards;
  }

  _selectCards = (box, selectedCardId, multi = false) => {
    const newState = box.map(card => {
      return (card.id === Number(selectedCardId)) ? 
        {...card, selected: (this.multiSelect && !multi) ? true : !card.selected} : 
        {...card, selected: (multi) ? card.selected : false}
    });
    
    this.multiSelect = multi;
    
    return newState;
  }

  _clearSelected = (box) => {
    return box.map(card => {
      return {...card, selected: false};
    });
  }

  _moveCardBetweenBoxes = (box1, box2, all) => {
    const newStateBox1 = [];
    const newStateBox2 = [...box2];

    box1.forEach((card => {
      if (all || card.selected) {
        newStateBox2.push(card)
      } else {
        newStateBox1.push(card);
      };
    }));

    return {
      box1: newStateBox1,
      box2: newStateBox2
    }
  }

  _moveCardUpInsideBox = (box, all = false) => {
    const newStateBox = [...box];
    const selectedCards = this._getSelectedCardsIndexes(box);

    if (selectedCards.length === 0 || selectedCards[0].index < 1 ) return false; 
    
    let first = true;
    
    while((selectedCards[0].index !== 0 && all) || first) {

      selectedCards.forEach((selectedCard) => {
        selectedCard.index -= 1;
        newStateBox.splice(selectedCard.index, 0, selectedCard.card);
        const ind = selectedCard.index + 2;
        newStateBox.splice(ind, 1);
      });

      first = false;
    }

    return newStateBox;
  } 

  _moveCardDownInsideBox = (box, all = false) => {
    const newStateBox = [...box];
    const selectedCards = this._getSelectedCardsIndexes(box);

    const maxCardIndex = selectedCards.length - 1;
    const maxPositionInBox = box.length -1
    
    if (selectedCards.length === 0 || selectedCards[maxCardIndex].index >= maxPositionInBox)
      return false; 
    
    let first = true;
    
    while((selectedCards[maxCardIndex].index < maxPositionInBox && all) || first) {
      
      for (let i = maxCardIndex; i >= 0; i--) {
        const selectedCard = selectedCards[i];
        const addingIndex = selectedCard.index + 2;
        
        newStateBox.splice(addingIndex, 0, selectedCard.card);
        newStateBox.splice(selectedCard.index, 1);

        selectedCard.index++;
      }

      first = false;
    }

    return newStateBox;
  } 

  _moveCardToLeftBox = (all = false) => {
    const { stateBoxLeft, stateBoxRight } = this.state;
    const newState = this._moveCardBetweenBoxes (stateBoxRight, stateBoxLeft, all);

    this.setState({
      stateBoxLeft: newState.box2,
      stateBoxRight: newState.box1,
    });
  }

  _moveCardToRightBox = (all = false) => {
    const { stateBoxLeft, stateBoxRight } = this.state;
    const newState = this._moveCardBetweenBoxes (stateBoxLeft, stateBoxRight, all);

    this.setState({
      stateBoxLeft: newState.box1,
      stateBoxRight: newState.box2,
    });
  }
  
  _onAppClick = (ev) => {
    const type = ev.target.dataset['type'];

    if (type === BUTTON_TYPE || type === CARD_TYPE) return;

    this.setState({
      stateBoxLeft: this._clearSelected(this.state.stateBoxLeft),
      stateBoxRight: this._clearSelected(this.state.stateBoxRight)
    });
    
  }

  _onLeftBoxClickHAndler = (ev) => {
    if (ev.target.dataset['type'] !== CARD_TYPE) return;

    this.setState({
      stateBoxLeft: this._selectCards(this.state.stateBoxLeft, ev.target.id, ev.ctrlKey),
      stateBoxRight: this._clearSelected(this.state.stateBoxRight)
    });
  }

  _onRightBoxClickHAndler = (ev) => {
    if (ev.target.dataset['type'] !== CARD_TYPE) return;
    
    this._clearSelected(this.state.stateBoxRight);
    
    this.setState({
      stateBoxRight: this._selectCards(this.state.stateBoxRight, ev.target.id, ev.ctrlKey),
      stateBoxLeft: this._clearSelected(this.state.stateBoxLeft)
    });
  }
  
  _onControlCentrButtonClickHandler = (ev) => {
    switch (ev.target.name) {
      case ButtonsTypes.LEFT: 
        this._moveCardToLeftBox();
        break;
      case ButtonsTypes.RIGHT:
        this._moveCardToRightBox();
        break;
      case ButtonsTypes.DOUBLE_LEFT:
        this._moveCardToLeftBox(true);
        break;
      case ButtonsTypes.DOUBLE_RIGHT: 
        this._moveCardToRightBox(true);
        break;
    }
  }

  _onControlLeftButtonClickHandler = (ev) => {
    switch(ev.target.name) {
      case ButtonsTypes.UP:
        this.setState({ 
          stateBoxLeft: this._moveCardUpInsideBox(this.state.stateBoxLeft) ||  this.state.stateBoxLeft
        });
        break;
      case ButtonsTypes.DOUBLE_UP: 
      this.setState({ 
        stateBoxLeft: this._moveCardUpInsideBox(this.state.stateBoxLeft, true) ||  this.state.stateBoxLeft
      });
        break;
      case ButtonsTypes.DOWN: 
        this.setState({ 
          stateBoxLeft: this._moveCardDownInsideBox(this.state.stateBoxLeft) ||  this.state.stateBoxLeft
        });
        break;
      case ButtonsTypes.DOUBLE_DOWN:
        this.setState({ 
          stateBoxLeft: this._moveCardDownInsideBox(this.state.stateBoxLeft, true) ||  this.state.stateBoxLeft
        }); 
        break;
    }
  }

  _onControlRightButtonClickHandler = (ev) => {
    switch(ev.target.name) {
      case ButtonsTypes.UP:
        this.setState({ 
          stateBoxRight: this._moveCardUpInsideBox(this.state.stateBoxRight) ||  this.state.stateBoxRight
        });
        break;
      case ButtonsTypes.DOUBLE_UP: 
      this.setState({ 
        stateBoxRight: this._moveCardUpInsideBox(this.state.stateBoxRight, true) ||  this.state.stateBoxRight
      });
        break;
      case ButtonsTypes.DOWN: 
        this.setState({ 
          stateBoxRight: this._moveCardDownInsideBox(this.state.stateBoxRight) ||  this.state.stateBoxRight
        });
        break;
      case ButtonsTypes.DOUBLE_DOWN:
        this.setState({ 
          stateBoxRight: this._moveCardDownInsideBox(this.state.stateBoxRight, true) ||  this.state.stateBoxRight
        }); 
        break;
    }
  }

  _onCardDragStartHandler = (ev) => {
    ev.stopPropagation();
    
    this.oldState = this.state.stateBoxLeft;
    this.currentDragCard = this.state.stateBoxLeft.find(card => card.id === Number(ev.target.id));
    this.dragEnd = false;
  }
  
  _onCardDragEnterHandler = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    
    const currentId  = Number(ev.target.id);
    
    if (currentId === this.currentDragCard.id || currentId === 777) return;

    this.dndOldFocus = DndFocusObjects.CARD;
    
    console.log(`Card ${currentId} ENTER`);

    const newState = this.state.stateBoxLeft.filter(card => card.id !== 777);
    
    let plugIndex = newState.findIndex((card) => card.id === currentId);
    
    newState.splice(plugIndex, 0, DND_PUG);
    
    this.setState({ stateBoxLeft: newState });
  }
    
  _onCardDragLeaveHandler = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    console.log(`Card ${ev.target.id} LEAVE`);
    
    if (ev.target.id === '777') {
      console.log(`dndOldFocus = ${this.dndOldFocus}`)
    
        console.log('delete 777')
      this.setState({ stateBoxLeft: this.state.stateBoxLeft.filter(card => card.id !== 777) });
    };
  }

  _onCardDragEndHandler = (ev) => {
    ev.stopPropagation();
  }
  
  _onCardDropHandler = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    
    const currentId  = Number(ev.target.id);
    
    if (currentId === this.currentDragCard.id) return;

    this.dragEnd = true;

    const targetId = Number(ev.target.id);
      
    const sourcesIndex = this.state.stateBoxLeft.findIndex(card => card.id === this.currentDragCard.id);
    let targetindex = this.state.stateBoxLeft.findIndex(card => card.id === targetId);

    if (sourcesIndex < targetindex) {
      targetindex++;
    }

    const newState = this.state.stateBoxLeft.map(card => {
      return (card.id === this.currentDragCard.id) ? {
        ...card,
        remove: true
      } : card;
    });

    newState.splice(targetindex, 0, this.currentDragCard);

    this.setState({
      stateBoxLeft: newState.filter(el => (el.remove) ? false : true)
    });
  }

  _onBoxDragEnterHandler = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    
    if (ev.target.dataset['type'] !== 'box-backet' || this.dndOldFocus === DndFocusObjects.BOX ) return;
    
    console.log('Box Enter');
    console.log(`dndOldFocus = ${this.dndOldFocus}`);

    this.dndOldFocus = DndFocusObjects.BOX;

    const newState = this.state.stateBoxLeft.filter(card => card.id !== 777);
    newState.push(DND_PUG);

    this.setState({ stateBoxLeft: newState });

  }

  _onBoxDragLeaveHandler = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    
    
    if (ev.target.dataset['type'] !== 'box-backet' || ev.target.id === '777' || this.dndOldFocus === DndFocusObjects.CARD) return;

    console.log('Box Leave');
    
    // const newState = this.state.stateBoxLeft.filter(card => card.id !== 777);
    // this.setState({ stateBoxLeft: newState });
    
    
  }

  render() {

    return (
      <div className="App" onClick={ this._onAppClick }>
        <LeftColumnControls 
          onButtonClickHandler = { this._onControlLeftButtonClickHandler } 
        />
        <Box 
          cards = { this.state.stateBoxLeft } 
          header = 'Левая коробка'
          key = '1'

          onClickHandler = { this._onLeftBoxClickHAndler } 
          
          onBoxDragEnterHandler = { this._onBoxDragEnterHandler }
          onBoxDragLeaveHandler = { this._onBoxDragLeaveHandler }
          
          onCardDragStartHandler = { this._onCardDragStartHandler }
          onCardDragEndHandler = { this._onCardDragEndHandler }
          onCardDragEnterHandler = { this._onCardDragEnterHandler }
          onCardDragLeaveHandler = { this._onCardDragLeaveHandler }
          onCardDropHandler = { this._onCardDropHandler }
          
        />
        <CenterControls  
          onButtonClickHandler = { this._onControlCentrButtonClickHandler } 
        />
        <Box 
          cards = { this.state.stateBoxRight }  
          header = 'Правая коробка'
          key = '2'

          onClickHandler = { this._onRightBoxClickHAndler }
          onCardDragStartHandler = { this._onCardDragStartHandler }
          onCardDragEndHandler = { this._onCardDragEndHandler }
          onCardDragEnterHandler = { this._onCardDragEnterHandler }
          onCardDragLeaveHandler = { this._onCardDragLeaveHandler }
          onCardDropHandler = { this._onCardDropHandler }
        />
        <RightColumnControls 
          onButtonClickHandler = { this._onControlRightButtonClickHandler } 
        />
      </div>
    );
  }
}

export default App;
