import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';
import emoji from 'emoji-dictionary';


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

  removeCard = (id, index) => {
    const cardList = this.state.cards;

    axios.delete(`https://inspiration-board.herokuapp.com/boards/jackie/cards/${id}`)
    .then((response) => {
      console.log(response);
      cardList.splice(index, 1);
      this.setState({
        cardList,
        message: `Successfully deleted card`
      });
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
          index={index}
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
      <div>
      <header> {this.state.message ? this.state.message: ""} </header>

      <div className="board">
        <p>{this.state.error}</p>
        {this.renderCardList()}
      </div>
      <div>
        <NewCardForm />
      </div>
      </div>
    )
  }

}

Board.propTypes = {

};

export default Board;
