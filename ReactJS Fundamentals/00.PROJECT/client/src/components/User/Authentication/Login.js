import React, { Component } from 'react';
import FormTitle from './common/FormTitle';
import InputData from './common/InputData';
import Buttons from './common/Buttons';
import SocialLogin from './common/SocialLogin';
import Validation from './common/Validation';
import '../authentication.css';

import { Redirect } from 'react-router-dom';

class Login extends Component {
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

    let result = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      body: data
    });

    result = await result.json();
    // console.log(result);

    this.setState({
      result: result,
      errors: result.errors
    });

    if (result.token) {
      localStorage.setItem('user', JSON.stringify({
          user: result.user
      }));
      localStorage.setItem('token', result.token);
      window.location.href = '/';
      /* this.setState({
          hasSuccess: true
      });*/
    }
  }

  returnError (inputField) {
    return this.state.errors[inputField] !== undefined;
  }

    render() {
        if (this.state.hasSuccess) {
            return <Redirect to='/' />;
        }

        return (
            <div id='auth-container'>
                <form id='authenticate' onSubmit={this.onFormSubmitted}>
                    <FormTitle title='Login' />

                    <InputData
                        id='username'
                        inputType='text'
                        label='Username'
                        name='username'
                        hasError={this.returnError('username')} />
                    <Validation message={this.state.errors.username} />
                    <InputData
                        id='password'
                        inputType='password'
                        label='Password'
                        name='password'
                        hasError={this.returnError('password')}
                    />
                    <Validation message={this.state.errors.password} />

                    <Buttons />

                </form>

                <SocialLogin />
            </div>
        )
    }
}

export default Login;
