import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import showTime from './app/timer.js';
import ReactDOM from 'react-dom';

let time = new Date().toLocaleTimeString();

const showTime = () => {
  ReactDOM.render((
    new Date().toLocaleTimeString()
  ), document.getElementById('time'));
};

let timer = setInterval(showTime, 1000);

const Time = () => (
  <div id="result">
    <h1> Timer </h1>
    <p id="time" className="timer">{time}</p>
  </div>
)

export default Time;
