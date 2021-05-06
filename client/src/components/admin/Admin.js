import React, { useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AdminHome from './AdminHome';
import AdminList from './AdminList';
import AdminWrite from './AdminWrite';
import AdminEdit from './AdminEdit';

import styles from './Admin.module.css';
import Sidebar from './Sidebar';

const Admin = ({ user }) => {
  const [isLogin, setIsLogin] = useState();

  useEffect(() => {
    if (user.userData.isAuth) {
      setIsLogin(user.userData.isAuth);
    }
  }, [user]);

  return (
    <div className={styles.admin}>
      {isLogin ? (
        <Router>
          {/* <Navbar bg='light' expand='lg'>
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
          </Navbar> */}
          <Sidebar />
          <div className={styles.adminContainer}>
            <div className={styles.adminTop}>
              <h1>Admin</h1>
            </div>
            <Switch>
              <Route exact path='/admin'>
                <AdminHome />
              </Route>
              <Route path='/admin/write'>
                <AdminWrite />
              </Route>
              <Route path='/admin/edit/:id'>
                <AdminEdit />
              </Route>
              <Route path='/admin/list'>
                <AdminList />
              </Route>
            </Switch>
          </div>
        </Router>
      ) : (
        ''
      )}
    </div>
  );
};

// export default withRouter(Admin);

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(withRouter(Admin));
