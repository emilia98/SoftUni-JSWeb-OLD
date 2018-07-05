import React, { Component } from 'react';
import Image from './Image';

class RosterDetails extends Component {
  func () {
  }

  render () {
    return (
      <div id='roster-details'>
        <div id='bio'>
          <Image src={this.props.character.url}
            alt={this.props.character.name} func={this.func} />
          <p>
            {this.props.character.bio}
          </p>
        </div>
      </div>
    );
  }
}

export default RosterDetails;
