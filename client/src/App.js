import React from 'react';
import './App.css';

import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Home from './components/Home';
import Games from './components/Games';
import Projects from './components/Projects';
import NavBar from './components/NavBar';
import Admin from './components/admin/Admin';

const App = () => {
  const location = useLocation();

  return (
    <div className='App'>
      <NavBar />
      <div className='whole-container'>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
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
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
