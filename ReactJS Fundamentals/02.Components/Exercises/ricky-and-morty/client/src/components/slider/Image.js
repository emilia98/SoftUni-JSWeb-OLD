import React, { Component } from 'react';

class Image extends Component {
  render () {
    return (
      <div>
        <img src={this.props.imageSrc} 
          alt={this.props.imageAlt}
          className={this.props.classes} 
          onClick={(e) => this.props.onClickFunc(e) }
        />
      </div>
    );
  }
}

export default Image;
