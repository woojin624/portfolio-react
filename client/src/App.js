import React from 'react';
import './App.css';

import { Route, Switch, useHistory, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Games from './components/Games';
import Projects from './components/Projects';
import NavBar from './components/NavBar';
import Admin from './components/admin/Admin';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <div className='whole-container'>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/projects'>
              <Projects />
            </Route>
            <Route path='/games'>
              <Games />
            </Route>
            <Route path='/admin'>
              <Admin />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
