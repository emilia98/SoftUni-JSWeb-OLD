import React, { Component } from 'react';
import MenuItem from './MenuItem';

import { Link } from 'react-router-dom';

export default class MainMenu extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isResponsive: '',
            userMenuVisible: false
        }

        this.openMenu = this.openMenu.bind(this);
    }

  openMenu (value) {
    this.props.userItemClicked();
  }

  render () {
    return (
      <div id='nav-bar' className={this.props.responsiveClass}>
        <nav id='main-menu' className={this.props.responsiveClass}>

          <ul>
            <MenuItem iconClass='fa-home' href='/' link='Home' openMenu={null} />
            <MenuItem iconClass='fa-globe' href='/explore' link='Explore' />
            <MenuItem iconClass='fa-search' href='/search' link='Search' />
            {/*<MenuItem iconClass='fa-compass' href='/activate/pro' link='Go Pro' itemClass='pro' />*/}
            <MenuItem iconClass='fa-user' href='' link='User' itemId='user-info' openMenu={this.openMenu} />
          </ul>
        </nav>

        <nav id='sub-menu' className={this.props.responsiveClass}>
          <ul>
            <li>
              <a target='_blank' href='https://github.com/emilia98/ReactJS-Project/tree/master/Passportera/React'>
            About the Project
            </a>
            </li>

          </ul>
        </nav>
      </div>
    );
  }
}
