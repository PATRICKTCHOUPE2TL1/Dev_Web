import React from 'react';
import ReactDOM from 'react-dom';
//import {render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
