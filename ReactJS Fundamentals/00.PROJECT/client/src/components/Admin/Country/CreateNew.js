import React, { Component } from 'react';
import InputField from '../subcomponents/InputField';
import Validations from '../subcomponents/Validations';
import { Redirect } from 'react-router-dom';

class CreateNewCountry extends Component {
  constructor (props) {
      super(props);
      this.createCountry = this.createCountry.bind(this);

      this.state = {
        errors: {},
        exists: false,
        ready: false
      }
  }  

  async createCountry (e) {
      e.preventDefault();
      let token = localStorage.getItem('token');
      let formData = new FormData(e.target);

      let result = await fetch('http://localhost:8080/admin/manage/country/new', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
        body: formData
    });

    result = await result.json();
    
    if (result === null) {
      this.setState({
        errors: {}, exists: false, ready: true
      });
      return;
    }

    if (result.exists) {
      this.setState({
        errors: {},
        exists: true
      });
      return;
    }
    this.setState({
      errors: result,
      exists: false
    });
  }

  renderValidationMessage (message) {
    if (message) {
      return <Validations message={message} />;
    }
    return null;
  }

  showMessageIfExists () {
    if (this.state.exists) {
      return (
        <div class='data error-important'>
          <p>This country already exists (see ISO Code)</p>
        </div>
      );
    }
    return null;
  }

  render () {
    // console.log(this.props);
    if (this.state.ready) {
      return <Redirect to='/' />;
    }
    return (
      <div id='country-container'>
        <form id='create-country' onSubmit={this.createCountry}>
          <div class='data title'>
            <h1> <i class='fa fa-hashtag' aria-hidden='true'></i> Add New Country </h1>
          </div>

          {this.showMessageIfExists()}
          <InputField labelFor='full-name' labelText='Country Full Name:' name='fullName' />
          {this.renderValidationMessage(this.state.errors.name)}
          <InputField labelFor='abbreviated-name' labelText='Display Country Name:' name='abbreviated' />
          {this.renderValidationMessage(this.state.errors.abbreviatedName)}
          <InputField labelFor='iso-code' labelText='ISO Code:' name='isoCode' />
          {this.renderValidationMessage(this.state.errors.isoCode)}
          <div class='data'>
            <InputField labelFor='latitude' labelText='Latitude:' name='latitude' class='data-half' />
            {this.renderValidationMessage(this.state.errors.latitude)}
            <InputField labelFor='longitude' labelText='Longitude:' name='longitude' class='data-half right' />
            {this.renderValidationMessage(this.state.errors.longitude)}
          </div>

          <div class='data' id='buttons'>
            <button type='submit' id='submit'>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateNewCountry;
