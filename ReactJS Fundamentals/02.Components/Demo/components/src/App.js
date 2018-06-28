import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';

class App extends Component {
  render () {
    return (
      <HomePage title='My first page' />
    );
  }
}

export default App;
