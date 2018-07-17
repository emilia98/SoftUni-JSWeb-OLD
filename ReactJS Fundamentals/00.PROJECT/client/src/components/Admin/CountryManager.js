import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CountryRow from './CountryRow';

class CountryManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: []
        };

    }

    async componentDidMount() {
        let token = localStorage.getItem('token');

        let url = `http://localhost:8080/admin/manage/country/all`;
        let getAll = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        getAll = await getAll.json();
        this.setState({
            countries: getAll.countries
        });
    }

    render() {
        return (
            <main>
                <Link to='/admin/country/new'>
                    <button> Create New </button>
                </Link>
                <div id="countries-table">
                    <table>
                        <thead>
                            <tr>
                                <th class="country">
                                    Country
        </th>
                                <th>
                                    Edit
        </th>
                                <th>
                                    Delete
        </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.countries.map(el => {
                                return <CountryRow name={el.name} id={el.id} />
                            })}
                        </tbody>
                    </table>
                </div>
            </main>

        )
    }
}


export default CountryManager;
