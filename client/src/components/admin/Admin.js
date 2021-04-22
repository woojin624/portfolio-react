import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom';
import AdminHome from './AdminHome';
import AdminList from './AdminList';
import AdminWrite from './AdminWrite';

import styles from './Admin.module.css';

const Admin = () => {
  return (
    <div className={styles.Admin}>
      <Router>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand href='/admin'>J.COM - admin</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link as={Link} to='/admin'>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to='/admin/write'>
                Write
              </Nav.Link>
              <Nav.Link as={Link} to='/admin/list'>
                List
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className='admin-container'>
          <Switch>
            <Route exact path='/admin'>
              <AdminHome />
            </Route>
            <Route path='/admin/write'>
              <AdminWrite />
            </Route>
            <Route path='/admin/list'>
              <AdminList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default withRouter(Admin);
