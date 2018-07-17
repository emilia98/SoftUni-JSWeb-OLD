import React, { Component } from 'react';

class InputData extends Component {
  constructor (props) {
    super(props);

    this.state = {
      classes: ''
    };
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.hasError !== this.props.hasError) {
      this.setState({
        classes: this.props.hasError === true ? 'validation-error' : ''
      });
    }
  }

  render () {
    return (
      <div className='data'>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input type={this.props.inputType} id={this.props.id} name={this.props.name} className={this.state.classes}/>
      </div>
    );
  }
}

export default InputData;
