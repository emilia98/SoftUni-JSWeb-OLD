import React, { Component } from 'react';

class Image extends Component {
  constructor (props) {
    super(props);

    this.state = {
      detailsOnFocus: 0
    };
  }

  render () {
    return (
      <img className='roster-img'
        src={this.props.src}
        alt={this.props.alt}
        onClick={(e) => this.props.func(e, this.props.id)} />
    );
  }
}

export default Image;
