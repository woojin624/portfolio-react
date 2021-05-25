import React from 'react';
import ReactDOM from 'react-dom';
import { Reset } from 'styled-reset';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Reset />
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
