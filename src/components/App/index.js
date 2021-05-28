import React from 'react';

import './App.css';

import Box from '../Box';
import LeftColumnControls from '../LeftColumnConrols';
import RightColumnControls from '../RightColumnControls';
import CenterControls from '../CenterControls';

import { stateBox1, stateBox2 } from './../../state/State';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {stateBox1, stateBox2};

    console.dir(this.state);
  }

  onCardClickHandler = (ev) => {
    const cardId = ev.target.id;

    this.setState({
      stateBox1: stateBox1.map(card => {
        return (card.id === cardId) ? card : card.selected = !card.selected;
      })
    });
  }
  
  render() {
    return (
      <div className="App">
        <LeftColumnControls />
        <Box 
          cards = { this.state.stateBox1 } 
          onCardClickHandler = { this.onCardClickHandler } 
          header = 'Левая коробка'
          key = '1'
        />
        <CenterControls />
        <Box 
          cards = { this.state.stateBox2 } 
          onCardClickHandler = { this.onCardClickHandler } 
          header = 'Правая коробка'
          key = '2'
        />
        <RightColumnControls />
      </div>
    );
  }
}

export default App;
