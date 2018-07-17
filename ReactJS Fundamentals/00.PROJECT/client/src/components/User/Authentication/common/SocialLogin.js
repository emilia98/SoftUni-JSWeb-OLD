import React, { Component } from 'react';

class SocialLogin extends Component {
  render () {
    return (
      <div id='socials'>
        <div className='social-login facebook'>
          <span className='icon facebook'><i className='fa fa-facebook' aria-hidden='true'></i></span>
          <p>Login with <b>Facebook</b></p>
        </div>

        <div className='social-login google'>
          <span className='icon google'><i className='fa fa-google-plus' aria-hidden='true'></i></span>
          <p>Login with <b>Google +</b></p>
        </div>
      </div>
    );
  }
}

export default SocialLogin;
