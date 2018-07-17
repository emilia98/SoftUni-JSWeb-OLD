import React, { Component } from 'react';
import { Route } from 'react-router';
import CreateNewCountry from './Country/CreateNew';
import CountryManager from './CountryManager';

class Admin extends Component {
    render() {
        return (
            <div id="admin-container">
                <CountryManager />
            </div>
        )
    }
}

export default Admin;
