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
  }

  _getBoxCards(box) {
    return box.map((cardId) => {
      const card = this.state.stateCards.filter((card) => {
        return card.id === cardId;
      });

      return card[0];
    });
  }

  _moveCard(box1, box2) {
    let newStateBox1 = [...box1];
    const newStateBox2 = [...box2];
    const newStateCards = [...this.state.stateCards];
    
    stateBoxLeft.forEach((cardId) => {
      const cardIndex = stateCards.findIndex(card => card.id === cardId && card.selected);

      if (cardIndex > -1) {    
        newStateBox1 = newStateBox1.filter(id => id !== cardId);
        newStateBox2.push(cardId); 
        newStateCards[cardIndex].selected = false;
      }

    });

    return {
      box1State: newStateBox1,
      box2State: newStateBox2,
      cardsState: newStateCards
    }
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

  _onCenterControlButtonClickHandler = (ev) => {
    const { LEFT, RIGHT, DOUBLE_LEFT, DOUBLE_RIGHT } = ButtonsTypes;
    const { stateBoxLeft, stateBoxRight } = this.state;

    switch (ev.target.name) {
      case LEFT: 
        
        break;
      case RIGHT:
        const newState = this._moveCard(stateBoxLeft, stateBoxRight);
        this.setState({
          stateBoxLeft: newState.box1State,
          stateBoxRight: newState.box2State,
          stateCards: newState.cardsState
        });
        break;
      case DOUBLE_LEFT: console.log('ВСЕ ЛЕВО'); break;
      case DOUBLE_RIGHT: console.log('ВСЕ ПРАВО'); break;
    }

  }

  render() {
    const leftCards = this._getBoxCards(this.state.stateBoxLeft);
    const rightCards = this._getBoxCards(this.state.stateBoxRight);

    return (
      <div className="App">
        <LeftColumnControls 
         
        />
        <Box 
          cards = { leftCards } 
          onCardClickHandler = { this._onCardClickHandler } 
          header = 'Левая коробка'
          key = '1'
        />
        <CenterControls  onButtonClickHandler = { this._onCenterControlButtonClickHandler } />
        <Box 
          cards = { rightCards } 
          onCardClickHandler = { this._onCardClickHandler } 
          header = 'Правая коробка'
          key = '2'
        />
        <RightColumnControls />
      </div>
    );
  }
}

export default App;
