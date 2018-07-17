import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuItem extends Component {
  constructor (props) {
    super(props);

    this.iconClicked = this.iconClicked.bind(this);
  }

  iconClicked (e) {
    if (this.props.openMenu) {
      return this.props.openMenu();
    }
  }

  render () {
    let classNames = `fa fa-2x ${this.props.iconClass}`;
    let itemClass = this.props.itemClass !== undefined ? this.props.itemClass : '';
    let itemId = this.props.itemId !== undefined ? this.props.itemId : '';
    let href = this.props.href !== '' ? this.props.href : '#';

    return (
      <Link to={href}>
        <li id={itemId} className={itemClass + ' clickable'} onClick={this.iconClicked}>
          <i className={classNames} aria-hidden='true' />
          <p>
            {this.props.link}
          </p>
        </li>
      </Link>
    );
  }
}

export default MenuItem;
