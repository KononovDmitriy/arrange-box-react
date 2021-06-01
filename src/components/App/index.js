/* eslint-disable default-case */
import React from 'react';

import './App.css';

import Box from '../Box';
import LeftColumnControls from '../LeftColumnConrols';
import RightColumnControls from '../RightColumnControls';
import CenterControls from '../CenterControls';

import { ButtonsTypes } from './../../constants';

import { stateCards, stateBoxLeft, stateBoxRight } from './../../state/State';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {stateCards, stateBoxLeft, stateBoxRight};

    this._currentBox = '';
  }

  _getBoxCards(box) {
    return box.map((cardId) => {
      const card = this.state.stateCards.filter((card) => {
        return card.id === cardId;
      });

      return card[0];
    });
  }

  _moveCardBetweenBoxes = (box1, box2, moveAll = false) => {
    const { stateCards } = this.state;

    let newStateBox1 = [...box1];
    const newStateBox2 = [...box2];
    const newStateCards = [...this.state.stateCards];
    
    box1.forEach((cardId) => {
      const cardIndex = (moveAll) ?  stateCards.findIndex(card => card.id === cardId) :
        stateCards.findIndex(card => card.id === cardId && card.selected);

      if (cardIndex > -1) {    
        newStateBox1 = newStateBox1.filter(id => id !== cardId);
        newStateBox2.push(cardId); 
        newStateCards[cardIndex].selected = false;
      }

    });

    return {
      box1: newStateBox1,
      box2: newStateBox2,
      cards: newStateCards
    }
  }

  _moveCardInsideBox = () => {

  } 

  _moveCardToLeftBox = (all = false) => {
    const { stateBoxLeft, stateBoxRight } = this.state;
    const newState = this._moveCardBetweenBoxes (stateBoxRight, stateBoxLeft, all);

    this.setState({
      stateBoxLeft: newState.box2,
      stateBoxRight: newState.box1,
      stateCards: newState.cards
    });
  }

  _moveCardToRightBox = (all = false) => {
    const { stateBoxLeft, stateBoxRight } = this.state;
    const newState = this._moveCardBetweenBoxes (stateBoxLeft, stateBoxRight, all);

    this.setState({
      stateBoxLeft: newState.box1,
      stateBoxRight: newState.box2,
      stateCards: newState.cards
    });
  }

  _onCardClickHandler = (ev) => {
    const cardId = Number(ev.target.id);
    const cards = this.state.stateCards;
    
    const selectedCardIndex = cards.findIndex(card => card.id === cardId);
    
    const newState = cards.map((card, index) => {
      return {
      ...card,
      selected: (index === selectedCardIndex) ? !cards[selectedCardIndex].selected
      : (ev.ctrlKey) ? cards[index].selected : false
    }});

    this.setState({
      stateCards: newState
    });
  }

  _onControlButtonClickHandler = (ev) => {
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
      case ButtonsTypes.UP: 
        console.dir('UP');
        break;
      case ButtonsTypes.DOWN: 
        console.dir('DOWN');
        break;
      case ButtonsTypes.DOUBLE_UP: 
        console.dir('DOUBLE_UP');
        break;
      case ButtonsTypes.DOUBLE_DOWN: 
        console.dir('DOUBLE_DOWN');
        break;
    }
  }

  render() {
    const leftCards = this._getBoxCards(this.state.stateBoxLeft);
    const rightCards = this._getBoxCards(this.state.stateBoxRight);

    return (
      <div className="App">
        <LeftColumnControls 
          onButtonClickHandler = { this._onControlButtonClickHandler } 
        />
        <Box 
          cards = { leftCards } 
          onCardClickHandler = { this._onCardClickHandler } 
          header = 'Левая коробка'
          key = '1'
        />
        <CenterControls  
          onButtonClickHandler = { this._onControlButtonClickHandler } 
        />
        <Box 
          cards = { rightCards } 
          onCardClickHandler = { this._onCardClickHandler } 
          header = 'Правая коробка'
          key = '2'
        />
        <RightColumnControls 
          onButtonClickHandler = { this._onControlButtonClickHandler } 
        />
      </div>
    );
  }
}

export default App;
