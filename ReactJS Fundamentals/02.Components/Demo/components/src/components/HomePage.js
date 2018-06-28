import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class HomePage extends Component {
  render () {
    return (
      <div>
        <Header menuItem='Profile' />
        <h1>{this.props.title}</h1>
        <Footer message='ReactDemo' />
      </div>
    );
  }
}

export default HomePage;
