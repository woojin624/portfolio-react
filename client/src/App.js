import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { loadingProjects } from './redux';

import './App.css';

import Home from './components/Home';
import Games from './components/Games/Games';
import Projects from './components/Projects';
import NavBar from './components/NavBar';
import Admin from './components/admin/Admin';
import ProjectDetail from './components/ProjectDetail';

const App = ({ loading, loadingProjects }) => {
  const location = useLocation();

  useEffect(() => {
    loadingProjects();
  }, []);

  return (
    <div className='App'>
      {loading ? (
        <div style={{ color: '#fff' }}>Loading...</div>
      ) : (
        <>
          <NavBar />
          <div className='whole-container'>
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route path='/projects/:id'>
                  <ProjectDetail />
                </Route>
                <Route exact path='/projects'>
                  <Projects />
                </Route>
                <Route path='/games'>
                  <Games />
                </Route>
                <Route path='/admin'>
                  <Admin />
                </Route>
                <Route exact path='/'>
                  <Home />
                </Route>
              </Switch>
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ projects }) => {
  return {
    projects: projects.projects,
    loading: projects.loading,
  };
};

const mapDispatchToProps = {
  loadingProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
