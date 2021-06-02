/* eslint-disable default-case */
import React from 'react';

import './App.css';

import Box from '../Box';
import LeftColumnControls from '../LeftColumnConrols';
import RightColumnControls from '../RightColumnControls';
import CenterControls from '../CenterControls';

import { CARD_TYPE, ButtonsTypes } from './../../constants';

// import { stateCards, stateBoxLeft, stateBoxRight } from './../../state/State';
import { stateBoxLeft, stateBoxRight } from './../../state/State';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {stateBoxLeft, stateBoxRight};
    this.multiSelect = false;
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

  _moveCardInsideBox = () => {

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

    return (
      <div className="App">
        <LeftColumnControls 
          onButtonClickHandler = { this._onControlButtonClickHandler } 
        />
        <Box 
          cards = { this.state.stateBoxLeft } 
          onClickHandler = { this._onLeftBoxClickHAndler } 
          header = 'Левая коробка'
          key = '1'
        />
        <CenterControls  
          onButtonClickHandler = { this._onControlButtonClickHandler } 
        />
        <Box 
          cards = { this.state.stateBoxRight } 
          onClickHandler = { this._onRightBoxClickHAndler } 
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
