/* eslint-disable default-case */
import React from 'react';

import './App.css';

import Box from '../Box';
import LeftColumnControls from '../LeftColumnConrols';
import RightColumnControls from '../RightColumnControls';
import CenterControls from '../CenterControls';

import { CARD_TYPE, BUTTON_TYPE, ButtonsTypes } from './../../constants';

import { stateBoxLeft, stateBoxRight } from './../../state/State';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {stateBoxLeft, stateBoxRight};
    this.multiSelect = false;
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
        />
        <CenterControls  
          onButtonClickHandler = { this._onControlCentrButtonClickHandler } 
        />
        <Box 
          cards = { this.state.stateBoxRight }  
          header = 'Правая коробка'
          key = '2'

          onClickHandler = { this._onRightBoxClickHAndler }
        />
        <RightColumnControls 
          onButtonClickHandler = { this._onControlRightButtonClickHandler } 
        />
      </div>
    );
  }
}

export default App;
