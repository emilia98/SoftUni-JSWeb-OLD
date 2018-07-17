import React, { Component } from 'react';

class Buttons extends Component {
  render () {
    return (
      <div className='data' id='buttons'>
        <button type='submit' id='cancel'>Cancel</button>
        <button type='submit' id='submit'>Submit</button>
      </div>
    );
  }
}

export default Buttons;
