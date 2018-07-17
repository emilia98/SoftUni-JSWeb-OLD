import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LoggedInUser extends Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
    this.renderAdminLink = this.renderAdminLink.bind(this);
  }

  async onLogout(e) {
    let token = localStorage.getItem('token');
    let result = await fetch('http://localhost:8080/user/logout', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (result.status === 200) {
      localStorage.clear();
      window.location.href = '/';
      return;
    }
  }

  async goToProfile() {

  }

  renderAdminLink() {
    if (this.props.isAdmin && this.props.isAdmin.isAdmin) {
     
      return (
        <Link to='/admin'>
          <li className='user-logged'>
            <a href='#'>
              <h3>
                <p>
                  <i className='fa fa-cog' aria-hidden='true'></i>
                  <span>ADMIN AREA</span>
                </p>
              </h3>
            </a>
          </li>
        </Link>
      )
    }
    return null;
  }

  render() {
    return (
      <ul>
        <li id='personal-profile'>
          <a href='#'>
            <div>
              <img src={this.props.user.profilePicture} alt='Avatar' />
              <p>
                <i className='fa fa-hashtag' aria-hidden='true'></i> {this.props.user.username}
              </p>
            </div>
          </a>
        </li>
        {this.renderAdminLink()}
        <li className='user-logged' onClick={this.onLogout}>

          <a href='#'>
            <h3>
              <p>
                <i className='fa fa-sign-out' aria-hidden='true'></i>
                <span>Logout</span>
              </p>

            </h3>
          </a>

        </li>
      </ul>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return { isAdmin: state.admin };
}

export default connect(mapStateToProps)(LoggedInUser);
