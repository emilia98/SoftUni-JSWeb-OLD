import React, { Component } from 'react';

class Header extends Component {
  render () {
    return (
      <div className='header'>
        <h1>Menu</h1>
        <h2>{this.props.menuItem}</h2>
      </div>
    );
  }
}

export default Header;
