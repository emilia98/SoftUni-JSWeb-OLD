import React, { Component } from 'react';
// import './App.css';

import Slider from './components/slider/Slider';
import Roster from './components/roster/Roster';
/*
import Slider from './components/Slider/Slider';
import Characters from './components/Characters/Characters';
*/
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onFocus: 0
        };

        this.changeFocus = (episode) => {
            // console.log(episode);
            this.setState({
                onFocus: episode
            });
        }
    }
    render() {
        return (
            /*
            <div className="container">
                <h1>React Components</h1>
                <Slider />
                <Characters />
            </div>
            */
           <div className='App'>
              <Slider changeFocus={this.changeFocus} episodeOnFocus={this.state.onFocus}/>
              <Roster />
           </div>
        );
    }
}

export default App;
