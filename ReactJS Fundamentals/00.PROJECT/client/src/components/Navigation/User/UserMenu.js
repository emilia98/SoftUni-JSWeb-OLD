import React, { Component } from 'react';
import { connect } from 'react-redux';
import UnauthenticatedUser from './Unauthenticated';
import LoggedIn from './LoggedIn';

class UserMenu extends Component {
  constructor (props) {
    super(props);

    this.renderContent = this.renderContent.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.buttonClicked = this.buttonClicked.bind(this);

    this.state = {
      isOpened: false,
      iconClicked: this.props.iconClicked
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClickOutside);
  }

  setWrapperRef (node) {
    this.wrapper = node;
  }

  async buttonClicked (e) {
    let token = localStorage.getItem('token');
    let result = await fetch('http://localhost:8080/user/profile/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
        // [{'key':'Content-Type','value':'application/x-www-form-urlencoded','description':'','warning':''}]
      }
    });
    result = await result.json();
  }

  handleClickOutside (event) {
    if ((document.getElementById('user-info').contains(event.target)) ||
      (this.wrapper && this.wrapper.contains(event.target))) {
      this.setState({
        isOpened: true
      });
    } else {
      this.setState({
        isOpened: false
      });
    }
  }

  renderContent () {
    // console.log(this.props);
    switch (this.props.auth) {
      case false: {
        return <UnauthenticatedUser />;
      }
      case null: {
        return;
      }
      default: {
        return <LoggedIn user={this.props.auth.user}/>;
      }
    }
   //console.log(this.props.auth);
  }

  render() {
    let classes = this.state.isOpened === true ? 'opened' : '';
    return (
      <nav id='user' ref={this.setWrapperRef} className={classes}>
        {
          this.renderContent()
        }
      </nav>
    );
  }
}

/*
Possible States: 
-> null -> if the app does not know if the user is logged in or not
-> object with userId -> if the app knows thaht the user is logged in
-> false -> if the user is not logged in

function mapStateToProps(state) {
  return { auth: state.auth};
}
*/

/* The 'MODERN' Way */


function mapStateToProps ({auth}) {
  // console.log(auth);
  return { auth };
}
export default connect(mapStateToProps)(UserMenu);
