import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='/'>J.COM</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to='/projects'>
            Projects
          </Nav.Link>
          <Nav.Link as={Link} to='/games'>
            Games
          </Nav.Link>
          <Nav.Link as={Link} to='/blog'>
            Blog
          </Nav.Link>
          <Nav.Link as={Link} to='/github'>
            Github
          </Nav.Link>
          <Nav.Link as={Link} to='/admin'>
            Admin
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
