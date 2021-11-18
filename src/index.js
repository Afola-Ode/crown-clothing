import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';

import App from './App';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';

ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);