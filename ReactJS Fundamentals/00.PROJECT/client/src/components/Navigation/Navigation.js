import React, { Component } from 'react';
import './navigation.css';
import MainMenu from './Main/MainMenu';
// import '../../jquery-3.3.1.min.js';
import $ from 'jquery';
import UserMenu from './User/UserMenu';

export default class Navigation extends Component {
    constructor(props) {
        super(props);

        // console.log('construct');

        this.state = {
            responsive: '',
            userMenuVisible: false,
            iconClicked: false
        };

        this.looksForResizing = this.looksForResizing.bind(this);
        this.userItemClicked = this.userItemClicked.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        //this.subMenu = $('#sub-menu');
        // this.mainMenu = $('#main-menu');
    }

    looksForResizing(e) {
        let width = e.target.innerWidth;

        if (width < 700) {
            this.setState({
                responsive: 'responsive'
            });
            $('#main-menu').insertBefore($('#sub-menu'));
        } else {
            this.setState({
                responsive: ''
            });

            $('#sub-menu').insertBefore($('#main-menu'));
        }
    }

    componentDidMount() {
        let width = window.innerWidth;
        if (width >= 700) {
            $('#sub-menu').insertBefore($('#main-menu'));
        }
        else {
            // console.log(this.state);
            this.setState({
                responsive: 'responsive'
            });
        }
        //console.log($(this.state.subMenu));
        // console.log(window.i)
        // console.log('da');
        window.addEventListener('resize', this.looksForResizing);

    }

    /*
        componentWillUnmount() {
            window.removeEventListener('resize', this.looksForResizing);
        }
    */
    /*
    componentWillUpdate() {
        //console.log('here');
        window.addEventListener('resize', (e) => {
            let width = e.innerWidth;
            if (width < 700) {
                this.setState({
                    responsive: 'responsive'
                });
            } else {
                this.setState({
                    responsive: ''
                });
            }
        });
    }
    */

    /* componentDidMount() {

    }*/
    userItemClicked() {
         // console.log('da');
        this.setState({
            userMenuVisible: true,
            iconClicked: true
        });

        // console.log(this.state);
    }

    closeMenu() {
        // console.log('closing');
        this.setState({
            userMenuVisible: false
        });
    }

    
    render() {
        return (
            <div>
                <MainMenu
                    responsiveClass={this.state.responsive}
                    userItemClicked={this.userItemClicked}
                />
                <UserMenu closeMenu={this.closeMenu}
                iconClicked={this.state.iconClicked} />
            </div>
        )
    }
}
