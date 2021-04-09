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

  const navContainVariants = {
    in: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
    out: {
      opacity: 0,
      y: 200,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const navElVariants = {
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: -50,
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
      <AnimatePresence>
        {isNavOpen ? (
          <motion.div
            initial='out' //
            animate='in'
            exit='out'
            variants={navContainVariants}
            className='nav-contain'
          >
            <ul className='nav-list'>
              {navListNames.names.map((name, i) => (
                <motion.li
                  key={i} //
                  variants={navElVariants}
                  transition={{ duration: 0.4 }}
                  whileHover={{
                    scale: 1.1,
                    textShadow: '0px 0px 2px rgb(255,255,255)',
                  }}
                  onClick={navCloseHandler}
                >
                  <Link to={`/${name}`}>{name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
