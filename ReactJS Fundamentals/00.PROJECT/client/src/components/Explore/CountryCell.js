import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CountryCell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countryId: this.props.id
        };

        this.sendAction = this.sendAction.bind(this);
        this.visitCountry = this.visitCountry.bind(this);
        this.toVisitCountry = this.toVisitCountry.bind(this);
        this.likedCountry = this.likedCountry.bind(this);
    }

    async sendAction(where) {
        let countryId = this.state.countryId;
      
        let token = localStorage.getItem('token');
        let url = `http://localhost:8080/country/${where}/${countryId}`;
        let result = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        result = await result.json();
        return result;
    }

    async visitCountry(e) {
        console.log(await this.sendAction('visited'));
    }

    async toVisitCountry(e) {
        console.log(await this.sendAction('tovisit'));
    }

    async likedCountry(e) {
        console.log(await this.sendAction('liked'));
    }

    renderButtons() {
        if (this.props.isLoggedIn) {
            return (
                <div className='country-buttons'>
                    <button className='first-btn' title="Visited" onClick={this.visitCountry}><i className="fa fa-2x fa-check" aria-hidden="true"></i>
                    </button>
                    <button className='second-btn' title='To Visit' onClick={this.toVisitCountry}><i className="fa fa-2x fa-plane" aria-hidden="true"></i>
                    </button>
                    <button className='third-btn' title='Liked' onClick={this.likedCountry}><i className="fa fa-2x fa-heart" aria-hidden="true"></i>
                    </button>
                </div>
            )
        }

        return null;
    }
    render() {
        return (
            <div className='explore-cell'>
                { /* <Link to={'/country/' + this.props.id} > */ }
                <div className='country-data'>
                <Link to={'/country/' + this.props.isoCode} >
                    <input type='hidden' value={this.props.id} />
                    <h2>{this.props.countryName}</h2>
                    <span className={`country-icon flag-icon flag-icon-${this.props.isoCode}`}></span>
                    <h2>{this.props.isoCode}</h2>
                    </ Link> 
                </div>
                { /* </ Link> */ }
                {this.renderButtons()}
            </div>
        )
    }
}

export default CountryCell;
