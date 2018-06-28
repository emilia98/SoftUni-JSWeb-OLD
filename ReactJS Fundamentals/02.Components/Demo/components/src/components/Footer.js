import React, { Component } from 'react';

class Footer extends Component {
  render () {
    return (<footer>
      {this.props.message} {(new Date()).getFullYear()}
    </footer>
    );
  }
}

export default Footer;
