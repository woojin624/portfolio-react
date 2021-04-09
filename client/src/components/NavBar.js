import React, { useState } from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './NavBar.css';

const NavBar = () => {
  const navListNames = {
    names: ['projects', 'games', 'blog', 'github', 'admin'],
  };
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navToggleHandler = () => {
    setIsNavOpen(!isNavOpen);
  };
  const navCloseHandler = () => {
    setIsNavOpen(false);
  };

  const motionNav = {
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: 200,
    },
  };

  return (
    <>
      <h3 className='nav-logo' onClick={navCloseHandler}>
        <Link to={'/'}>J.com</Link>
      </h3>
      <div className={isNavOpen ? 'nav-toggle-btn opened' : 'nav-toggle-btn'} onClick={navToggleHandler}>
        <div className='nav-toggle-top'></div>
        <div className='nav-toggle-bottom'></div>
      </div>
      {isNavOpen ? (
        <AnimatePresence>
          <motion.div initial='out' animate='in' exit='out' transition={{ duration: 0.3 }} variants={motionNav} className='nav-contain'>
            <ul className='nav-list'>
              {navListNames.names.map((name, i) => (
                <li key={i} onClick={navCloseHandler}>
                  <Link to={`/${name}`}>{name}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default NavBar;
