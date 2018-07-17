import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CountryRow extends Component {

    render() {
        let editLink = `/admin/country/edit/${this.props.id}`;
        let deleteLink = `/admin/country/delete/${this.props.id}`;
        return (
          
        <tr>
            <td class="country">{this.props.name}</td>
            <td>
                <Link to={editLink}>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </Link>
            </td>
            <td>
                <Link to={deleteLink}>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </Link>
            </td>
        </tr>
       )
    }
};