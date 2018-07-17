import React, { Component } from 'react';
import '../../styles/country.css';
import SimpleMap from './Map';

class Country extends Component {
    constructor(props) {
        super(props);

        this.state = {
            country: null
        };
    }

    async componentDidMount() {
        let url = `http://localhost:8080/country/${this.props.match.params.name}`;

        let user = JSON.parse(localStorage.getItem('user'));
        let token = user.token;
        let result = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        result = await result.json();
        this.setState(result);
    }

    render() {
        if (this.state.country !== null) {
            let classes = `flag-icon flag-icon-${this.state.country.isoCode}`;
            return (
                <main>
                    <div id="country-header">
                        <h1 className="one">
                            {this.state.country.officialName} <span className={classes}></span>
                        </h1>
                    </div>

                    <div id="map">
                      <SimpleMap latitude={this.state.country.latitude} longitude={this.state.country.longitude}/>
                    </div>

                    <h1>
                    </h1>
                </main>
            )
        }

        return (
            <div>
                <h2>Still loading...</h2>
            </div>
        )
    }
}

export default Country;
