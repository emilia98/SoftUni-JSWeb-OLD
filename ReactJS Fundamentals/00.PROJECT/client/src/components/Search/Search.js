import React, { Component } from 'react';
import '../../styles/search.css';
import CountriesGrid from '../Explore/CountriesGrid';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: []
        }

        this.onInputChanged = this.onInputChanged.bind(this);
        this.fetchQuery = this.fetchQuery.bind(this);
    }

    async fetchQuery (query) {
        let url = `http://localhost:8080/search?query=${query}`;
        window.history.pushState({}, '', `/search?query=${query}`)

        let result = await fetch(url, {
            method: 'GET',
        });
        result = await result.json();

        this.setState({
            countries: result
        });
    }

    async componentDidMount() {
       this.fetchQuery('');
    }

    async onInputChanged(e) {
        this.fetchQuery(e.target.value);
    }

    render() {
        return (
            <div>
                <div id="search-container">
                    <input type="text" name="search" placeholder="Search" onChange={this.onInputChanged} />
                </div>
                <CountriesGrid countries={this.state.countries} />
            </div>
        )
    }
}

export default Search;
