import React, { Component } from 'react';
import Image from './Image';
import RosterDetails from './Details';

class Roster extends Component {
  constructor (props) {
    super(props);

    this.state = {
      characters: [],
      detailsOnFocus: 0
    };
    this.onImageClicked = this.onImageClicked.bind(this);
  }

  async fetching () {
    let data = await fetch('http://localhost:9999/roster');
    data = await data.json();

    this.setState({
      characters: data,
      detailsOnFocus: data[0]
    });
  }

  UNSAFE_componentWillReceiveProps () {
    this.fetching();
  }

  componentDidMount () {
    this.fetching();
  }

  charactersList () {
    let characters = this.state.characters;
    let charsList = [];
    characters.map(el => {
      charsList.push(
        <Image key={el.id}
          src={el.url}
          alt={el.name}
          id={el.id}
          func={this.onImageClicked} />);
    });
    return charsList;
  }

  onImageClicked (e, id) {
    this.setState({
      detailsOnFocus: this.state.characters[parseInt(id)]
    });
  }

  render () {
    return (
      <div id='roster'>
        {
          this.charactersList()
        }
        <RosterDetails character={this.state.detailsOnFocus} />
      </div>
    );
  }
}

export default Roster;
