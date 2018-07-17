import React, { Component } from 'react';
import FormTitle from './common/FormTitle';
import InputData from './common/InputData';
import Buttons from './common/Buttons';
import SocialLogin from './common/SocialLogin';
import Validation from './common/Validation';
import '../authentication.css';

import { Redirect } from 'react-router-dom';

class Register extends Component {
  constructor (props) {
    super(props);

    this.state = {
      errors: {},
      result: {},
      hasSuccess: false
    };

    this.onFormSubmitted = this.onFormSubmitted.bind(this);
    this.returnError = this.returnError.bind(this);
  }

  async onFormSubmitted (event) {
    event.preventDefault();
    const data = new FormData(event.target);

    let result = await fetch('http://localhost:8080/user/register', {
      method: 'POST',
      body: data
    });

    result = await result.json();
    this.setState({
      result: result,
      errors: result.errors
    });

    if (Object.keys(result.errors).length === 0) {
      this.setState({
        hasSuccess: true
      });
    }
  }

  returnError (inputField) {
    return this.state.errors[inputField] !== undefined;
  }

  render () {
    if (this.state.hasSuccess) {
      return <Redirect to='/user/login' />;
    }

    return (
      <div id='auth-container'>
        <form id='authenticate' onSubmit={this.onFormSubmitted}>
          <FormTitle title='Register' />

          <InputData
            id='username' inputType='text' label='Username'
            name='username' hasError={this.returnError('username')} />
          <Validation message={this.state.errors.username} />

          <InputData
            id='email' inputType='email' label='Email'
            name='email' hasError={this.returnError('email')} />
          <Validation message={this.state.errors.email} />

          <InputData
            id='password' inputType='password' label='Password'
            name='password' hasError={this.returnError('password')} />
          <Validation message={this.state.errors.password} />

          <InputData
            id='repeat' inputType='password' label='Repeat Password'
            name='repeat' hasError={this.returnError('repeat')} />
          <Validation message={this.state.errors.repeat} />

          <Buttons />
        </form>
        <SocialLogin />
      </div>
    );
  }
}

export default Register;
