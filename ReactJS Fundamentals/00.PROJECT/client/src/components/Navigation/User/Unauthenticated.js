import React, { Component } from 'react';

class UnauthenticatedUser extends Component {
  render () {
    return (
      <ul>
        <li>
          <div className='authenticate'>
            <a href='/user/register'>
              <button id='register'>Register</button>
            </a>
          </div>
        </li><li>
          <div className='authenticate'>
            <a href='/user/login'>
              <button id='login'>Login</button>
            </a>
          </div>
        </li>
      </ul>
    )
  }
}

export default UnauthenticatedUser;
