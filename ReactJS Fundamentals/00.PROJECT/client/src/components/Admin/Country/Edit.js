import React, { Component } from 'react';
import InputField from '../subcomponents/InputField';
import Validations from '../subcomponents/Validations';
import { Redirect } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      country: null,
      hasSent: false
    };

    this.editCountry = this.editCountry.bind(this);
  }

  async componentDidMount() {
    this.getFromDb();
  }


  async getFromDb() {

    let token = localStorage.getItem('token');
    let url = `http://localhost:8080/admin/manage/country/edit/${this.props.match.params.id}`
    let result = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (result.status === 200) {
      result = await result.json();

      this.setState({
        country: result,
        errors: {}
      })
      return;
    }
  }

  handleChnage(event) {
    this.setState({
      value: event.target.value
    })
  }

  async editCountry(e) {
    e.preventDefault();
    let token = localStorage.getItem('token');
    let formData = new FormData(e.target);

    let url = `http://localhost:8080/admin/manage/country/edit/${this.props.match.params.id}`

    let result = await fetch(url, {
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
      window.location.href='/admin';
      return;
      
    }

    // console.log()

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

  renderValidationMessage(message) {
    if (message) {
      return <Validations message={message} />;
    }
    return null;
  }

  showMessageIfExists() {
    if (this.state.exists) {
      return (
        <div class='data error-important'>
          <p>This country already exists (see ISO Code)</p>
        </div>
      );
    }
    return null;
  }

  render() {

    if (this.state.country === null) {
      return null;
    }
/*
    if (this.state.hasSent) {
      return (
        <div id='country-container'>
          <form id='create-country' onSubmit={this.editCountry}>
            <div class='data title'>
              <h1> <i class='fa fa-hashtag' aria-hidden='true'></i> Edit Country </h1>
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
*/
    return (
      <div id='country-container'>
        <form id='create-country' onSubmit={this.editCountry}>
          <div class='data title'>
            <h1> <i class='fa fa-hashtag' aria-hidden='true'></i> Edit Country </h1>
          </div>

          {this.showMessageIfExists()}
          <InputField
            labelFor='full-name'
            labelText='Country Full Name:'
            name='fullName'
            onChange={this.handleChange}
            val={this.state.country.fullName} />
           {this.renderValidationMessage(this.state.errors.name)}
          <InputField
            labelFor='abbreviated-name'
            labelText='Display Country Name:'
            name='abbreviated'
            onChange={this.handleChange}
            val={this.state.country.displayName} />
          <InputField
            labelFor='iso-code'
            labelText='ISO Code:'
            onChange={this.handleChange}
            name='isoCode'
            val={this.state.country.isoCode} />
            {this.renderValidationMessage(this.state.errors.isoCode)}
          <div class='data'>
            <InputField
              labelFor='latitude'
              labelText='Latitude:'
              name='latitude'
              class='data-half'
              onChange={this.handleChange}
              val={this.state.country.latitude} />
              {this.renderValidationMessage(this.state.errors.latitude)}
            <InputField
              labelFor='longitude'
              labelText='Longitude:'
              name='longitude'
              class='data-half right'
              onChange={this.handleChange}
              val={this.state.country.longitude} />
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

export default Edit;
