import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop/Shop';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path ="/" component = {Home} />
        <Route path ="/shop" component = {Shop} />
      </Switch>
    </Router>
  );
}

export default App;
