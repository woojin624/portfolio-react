import React from 'react';
import './App.css';

import { Navbar, Nav } from 'react-bootstrap';
import { Link, Route, Switch, useHistory, BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand href='/'>J.COM</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to='/Proejects'>
                Projects
              </Nav.Link>
              <Nav.Link as={Link} to='/Games'>
                Games
              </Nav.Link>
              <Nav.Link as={Link} to='/Blog'>
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to='/Github'>
                Github
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className='whole-container'>
          <Switch>
            <Route exact path='/'></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
