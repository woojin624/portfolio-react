import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { loadingGames, loadingProjects } from './redux';

import './App.css';

import Auth from './hoc/auth';
import Home from './components/Home/Home';
import About from './components/About/About';
import Games from './components/Games/Games';
import Projects from './components/Projects/Projects';
import NavBar from './components/NavBar';
import Admin from './components/admin/Admin';
import ProjectDetail from './components/Projects/ProjectDetail/ProjectDetail';
import Loading from './components/Loading';
import LoginPage from './components/admin/LoginPage';

const App = ({ loading, gLoading, loadingProjects, loadingGames }) => {
  const location = useLocation();

  useEffect(() => {
    loadingGames();
    loadingProjects();
  }, [loadingGames, loadingProjects]);

  return (
    <div className='App'>
      {!gLoading && !loading ? (
        <>
          <NavBar />
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route path='/projects/:id'>
                <ProjectDetail />
              </Route>
              <Route exact path='/about'>
                <About />
              </Route>
              <Route exact path='/projects'>
                <Projects />
              </Route>
              <Route path='/games'>
                <Games />
              </Route>
              <Route path='/admin' component={Auth(Admin, true)} />
              <Route path='/login' component={Auth(LoginPage, false)} />
              <Route exact path='/'>
                <Home />
              </Route>
            </Switch>
          </AnimatePresence>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

const mapStateToProps = ({ projects, games }) => {
  return {
    loading: projects.loading,
    gLoading: games.loading,
  };
};

const mapDispatchToProps = {
  loadingProjects,
  loadingGames,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
