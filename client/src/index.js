import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleWare } from 'redux';

import App from './components/App';

const store = createStore(() => [], {}, applyMiddleWare());

ReactDOM.render(
    <provider store={store}><App /></provider>,
    document.querySelector('#root')
);
