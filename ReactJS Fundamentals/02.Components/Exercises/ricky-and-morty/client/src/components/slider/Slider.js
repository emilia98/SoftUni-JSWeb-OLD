import React, { Component } from 'react';
import Image from './Image';
import leftArrow from '../../resources/left.png';
import rightArrow from '../../resources/right.png';

class Slider extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedImage: ''
    };

    this.onLeftArrowClicked = this.onLeftArrowClicked.bind(this);
    this.onRightArrowClicked = this.onRightArrowClicked.bind(this);
  }

  async fetching () {
    let episodeOnFocus = this.props.episodeOnFocus;
    let data = await fetch('http://localhost:9999/episodePreview/' + episodeOnFocus);
    data = await data.json();
    this.setState({
      selectedImage: data.url
    });
  }

  UNSAFE_componentWillReceiveProps () {
    this.fetching();
  }

  componentDidMount () {
    this.fetching();
  }

  onLeftArrowClicked (e) {
    let onFocus = parseInt(this.props.episodeOnFocus);

    if (onFocus <= 0) {
      this.props.changeFocus(2);
    } else {
      this.props.changeFocus(onFocus - 1);
    }
  }

  onRightArrowClicked (e) {
    let onFocus = parseInt(this.props.episodeOnFocus);

    if (onFocus >= 2) {
      this.props.changeFocus(0);
    } else {
      this.props.changeFocus(onFocus + 1);
    }
  }

  func () {

  }

  render () {
    return (
      <div id='slider'>
        <Image
          imageSrc={leftArrow}
          imageAlt='left-arrow'
          classes='slider-elem slider-button case-left'
          onClickFunc={this.onLeftArrowClicked} />

        <Image
          imageSrc={this.state.selectedImage}
          imageAlt='image-on-focus'
          classes='sliderImg slider-elem'
          onClickFunc={this.func} />

        <Image
          imageSrc={rightArrow}
          imageAlt='right-arrow'
          classes='slider-elem slider-button case-right'
          onClickFunc={this.onRightArrowClicked} />

      </div>
    );
  }
}

export default Slider;
