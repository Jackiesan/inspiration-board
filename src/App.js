import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import Board from './components/Board';
import Hamburger from './Hamburger';


class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedBoardName: 'jackie'
    };
  }

  selectedBoard = (boardName) => {
    this.setState({
      selectedBoardName: boardName
    })
  }

  render() {
    return (
      <section>
          <Hamburger
            switchBoard={this.selectedBoard}
          />
        <header className="header">
          <h1 className="header__h1"><span className="header__text">Inspiration Board</span></h1>
        </header>
        <Board
          url="https://inspiration-board.herokuapp.com/boards/"
          boardName={this.state.selectedBoardName}
          />
      </section>
    );
  }
}

export default App;
