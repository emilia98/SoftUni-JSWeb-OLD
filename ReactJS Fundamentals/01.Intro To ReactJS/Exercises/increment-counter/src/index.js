import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Counter from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Counter />, document.getElementById('root'));
registerServiceWorker();
