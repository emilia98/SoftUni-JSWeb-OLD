import React, { Component } from 'react';

class InputField extends Component {
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
      <div className={this.props.class !== undefined ? this.props.class : 'data'}>
        <label for={this.props.labelFor}> {this.props.labelText} </label>
        <input type='text' id={this.props.labelFor} name={this.props.name} defaultValue={this.props.val}/>
      </div>
    );
  }
}

export default InputField;
