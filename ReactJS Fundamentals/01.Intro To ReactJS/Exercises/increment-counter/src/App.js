import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

let counter = 0;
function onButtonClicked () {
  counter++;
  ReactDOM.render(counter, document.getElementById('counter'));
}

const Counter = () => (

  <div id="result">
    <p > Count:  <span id="counter">0</span> </p>
    <button onClick={onButtonClicked}>Click</button>

  </div>
);

export default Counter;
