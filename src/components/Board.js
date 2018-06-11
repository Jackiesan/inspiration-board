import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
    };
  }

  componentDidMount = () => {
    axios.get('https://inspiration-board.herokuapp.com/boards/jackie/cards')
    .then( (response) => {
      console.log(response);
      this.setState({ cards: response.data });
    })
    .catch( (error) => {
      this.setState({ error: error.message });
    });
  }

  removeCard = (id) => {
    // const cardList = this.state.cards;
    console.log(`https://inspiration-board.herokuapp.com/boards/jackie/cards/${id}`);
    axios.delete(`https://inspiration-board.herokuapp.com/boards/jackie/cards/${id}`)
    .then((response) => {
      console.log(response);
      window.location.reload();
    })
    .catch( (error) => {
      this.setState({ error: error.message });
    });
  }

  renderCardList = () => {
    // For data from json file
    // const cardList = CARD_DATA.cards.map((card, index) => {
    // For data from api
    const cardList = this.state.cards.map((card, index) => {
      return (
        <Card
          key={index}
          id={card.card.id}
          text={card.card.text}
          emoji={card.card.emoji}
          removeCard={this.removeCard}
        />
      )
    });
    return cardList;
  }

  render() {
    return (
      <div className="board">
        <p>{this.state.error}</p>

        {this.renderCardList()}
      </div>
    )
  }

}

Board.propTypes = {

};

export default Board;
