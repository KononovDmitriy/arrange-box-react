/* eslint-disable default-case */
import React from 'react';

import './App.css';

import Box from '../Box';
import Card from '../Card';
import Controls from '../Controls';
import Button from './../Button';

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

    const { UP, DOUBLE_UP, DOWN, DOUBLE_DOWN, 
      RIGHT, DOUBLE_RIGHT, DOUBLE_LEFT, LEFT } = ButtonsTypes;

    return (
      <div className="App" onClick={ this._onAppClick }>
        <Controls key = 'contLeft'>
          <Button key = { UP } type = { UP } onClickHandler = { this._onControlLeftButtonClickHandler } />
          <Button key = { DOUBLE_UP } type = { DOUBLE_UP } onClickHandler = { this._onControlLeftButtonClickHandler } />
          <Button key = { DOWN } type = { DOWN } onClickHandler = { this._onControlLeftButtonClickHandler } />
          <Button key = { DOUBLE_DOWN } type = { DOUBLE_DOWN } onClickHandler = { this._onControlLeftButtonClickHandler } />
        </Controls>

        <Box header = 'Левая коробка' key = 'box1'>
          { this.state.stateBoxLeft.map(card => 
            <Card 
              key = { card.id }
              card = { card }
              onClickHandler = { this._onLeftBoxClickHAndler }
            />) }
        </Box>

        <Controls key = 'contCenter'>
          <Button key = { RIGHT } type = { RIGHT } onClickHandler = { this._onControlCentrButtonClickHandler } />
          <Button key = { DOUBLE_RIGHT } type = { DOUBLE_RIGHT } onClickHandler = { this._onControlCentrButtonClickHandler } />
          <Button key = { DOUBLE_LEFT } type = { DOUBLE_LEFT } onClickHandler = { this._onControlCentrButtonClickHandler } />
          <Button key = { LEFT } type = { LEFT } onClickHandler = { this._onControlCentrButtonClickHandler } />
        </Controls>


        <Box header = 'Правая коробка' key = 'box2'> 
          { this.state.stateBoxRight.map(card => 
            <Card 
              key = { card.id }
              card = { card }
              onClickHandler = { this._onRightBoxClickHAndler }
            />) }
        </Box>

        <Controls key = 'contRight'>
          <Button key = { UP } type = { UP } onClickHandler = { this._onControlRightButtonClickHandler } />
          <Button key = { DOUBLE_UP } type = { DOUBLE_UP } onClickHandler = { this._onControlRightButtonClickHandler } />
          <Button key = { DOWN } type = { DOWN } onClickHandler = { this._onControlRightButtonClickHandler } />
          <Button key = { DOUBLE_DOWN } type = { DOUBLE_DOWN } onClickHandler = { this._onControlRightButtonClickHandler } />
        </Controls>

      </div>
    );
  }
}

export default App;
