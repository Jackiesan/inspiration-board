import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

class NewCardForm extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      emoji: '',
    }
  }

  onFieldChange = (event) => {
    const updateState = {};
    updateState['text'] = event.target.value;
    this.setState(updateState)
  }

  getEmoji = (event) => {
    const updateState = {};
    updateState['emoji'] = EMOJI_LIST[event.target.value]
    this.setState(updateState)
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className='new-card-form'>
        <header className='new-card-form__header'><h1>Add a note</h1></header>
        <div className='new-card-form__form'>
          <div>
          <label htmlFor='text' className='new-card-form__form-label'>Text: </label>
          <textarea
          name='text'
          value={this.state.text}
          onChange={this.onFieldChange}
          className='new-card-form__form-textarea'
          />
          </div>
          <div>
          <select name='emoji' onChange={this.getEmoji} className='new-card-form__form-select'>
          <option disabled selected value>Add Emoji</option>
          <option value={0}>None</option>
          <option value={1}>😍</option>
          <option value={2}>🍺</option>
          <option value={3}>👏</option>
          <option value={4}>💖</option>
          <option value={5}>😻</option>
          <option value={6}>🐶</option>
        </select>
        </div>
      <input type='submit' value='Add Card' className='new-card-form__form-button' />
      </div>

      </form>
    )
  }
}

export default NewCardForm;
