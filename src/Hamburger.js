import React, { Component } from 'react';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';
import './App.css';

const Drawer = styled.div`
position: absolute;
height: 90%;
background: black;
width: 40vh;
left: ${props => props.left}vh;
`;

const Link = styled.div`
cursor: pointer;
padding: 1em 1em 1em 3em;
color: white;
font-weight: bold;
`;

class Hamburger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleState: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.selectedBoard = this.selectedBoard.bind(this);

  }

  handleClick = () => {
    this.refs.container.classList.toggle('change');
    this.setState({
      toggleState: this.state.toggleState ? 0 : 1
    });
  }

  selectedBoard = (event) => {
    this.props.switchBoard(event.target.getAttribute('name'))
    this.handleClick();
  }

  render() {
    return (
      <div id="parent">
      <div id="nav-bar">
      <div className="container" ref="container" onClick={this.handleClick}>
      <div className="bar1" />
      <div className="bar2" />
      <div className="bar3" />

      </div>
      </div>

      <Motion
      defaultStyle={{ left: -40 }}
      style={{
        left: spring(this.state.toggleState ? 0 : -40, {
          stiffness: 210,
          damping: 10
        })
      }}
      >
      {style => (
        <Drawer left={style.left} onClick={this.selectedBoard}>
        <Link name='jackie'>Inspiration Board</Link>
        <Link name='jackie-todo'>To Do List</Link>
        </Drawer>
      )}
      </Motion>
      </div>
    );
  }
}

export default Hamburger;
