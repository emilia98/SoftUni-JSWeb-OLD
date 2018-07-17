import React, { Component } from 'react';
import './App.css';
import './styles/admin.css';
import Register from './components/User/Authentication/Register';
import Login from './components/User/Authentication/Login';
import Navigation from './components/Navigation/Navigation';
import Map from './components/Country/Map';
import Explore from './components/Explore/Explore';
import Search from './components/Search/Search';

import Profile from './components/User/Profile/Profile';
import Home from './components/Home';
import Country from './components/Country/Country';
import Admin from './components/Admin/Admin';
import CreateNew from './components/Admin/Country/CreateNew';
import Edit from './components/Admin/Country/Edit';
import { Redirect, Route, Link, withRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import { connect } from 'react-redux';
import * as actions from './actions';

// import Test from './components/Test';
class App extends Component {
  constructor (props) {
    super(props);

    this.restrictAuthContent = this.restrictAuthContent.bind(this);
    this.restrictAdminContent = this.restrictAdminContent.bind(this);
    // this.renderThis = this.renderThis.bind(this);
  }

  componentDidMount () {
    // console.log(this.props);
    this.props.fetchUser();
    this.props.administrate();
  }

  restrictAuthContent (path, component) {
    return <Route path={path} exact
      render={() => this.props.auth ? (<Redirect to='/' />) : (component)} />
  }

  restrictUserContent (path, component) {
    console.log(this.props.auth);
    return <Route path={path} exact
      render={() => this.props.auth === false ? (<Redirect to='/' />) : (component)}  />
  }


  restrictAdminContent (path, component) {
    // let isAdmin = this.props.admin !== null && this.props.admin.isAdmin;
    // console.log(this.props.admin);

    let isAdmin = this.props.admin;
    //console.log(isAdmin);
    // console.log(isAdmin);
    if (isAdmin !== null) {
      // console.log(isAdmin.isAdmin);
      return <Route path={path} exact
      component={() => isAdmin.isAdmin ? (component) : (<Redirect to='/' />)}
        />
    }

    // console.log(this.props.admin);
  }

  render() {

    // this.restiricAdminContent();

    return (
      <div>
       
        <Switch>
          {/* <Route exact path="/" component={Home} />*/}
         
        </Switch>

        <Navigation />
        <Route path='/' exact render={Home} />
        <Route path='/explore' exact component={Explore} />
        <Route path='/search' exact component={Search} />
        <Route path='/country/:name' component={Country} />
        <Route path='/admin/country/edit/:id' component={Edit} />
        {this.restrictAuthContent('/user/login', <Login />)}
        {this.restrictAuthContent('/user/register', <Register />)}
        {this.restrictAdminContent('/admin', <Admin />)}
        {this.restrictAdminContent('/admin/country/new', <CreateNew />)}
        { /* this.restrictAdminContent('/admin/country/edit/:id', <Edit />) */}
        {this.restrictUserContent('/user/profile/me', <Profile />)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state);
  return { auth: state.auth, admin: state.admin };
}

export default withRouter(connect(mapStateToProps, actions)(App));

/**
 * 
 */