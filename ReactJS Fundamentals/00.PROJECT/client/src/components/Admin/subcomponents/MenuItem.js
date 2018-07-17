import React, { Component } from 'react';

class MenuItem extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

  clicked(func) {
    
  }
  render() {
    let classNames = `fa fa-x fa-${this.props.iconTitle}`;
    
    return (
    <li onClick={(e) => this.clicked(this.props.clickFunc(e))}>
      <span className='menu-icon'><i className={classNames} aria-hidden="true"></i></span>
      <span className='menu-item'>{this.props.title}</span>
    </li>
    );
  }
}

export default MenuItem;
