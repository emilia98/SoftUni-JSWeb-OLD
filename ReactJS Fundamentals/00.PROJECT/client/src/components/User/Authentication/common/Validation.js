import React, { Component } from 'react';

class Validation extends Component {
    render() {
        if (!this.props.message) {
            return (
                <span className='hidden'></span>
            )
        }

        return (
            <div className='error' >
                <span className='error'>{this.props.message}</span>
            </div>
        );
    }
}

export default Validation;