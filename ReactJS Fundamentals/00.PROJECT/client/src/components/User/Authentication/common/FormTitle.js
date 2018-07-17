import React, { Component } from 'react';

class FormTitle extends Component {
  render () {
    return (
      <div className='data title'>
        <h1><i className='fa fa-hashtag' aria-hidden='true'></i> {this.props.title} </h1>
      </div>
    );
  }
}

export default FormTitle;
