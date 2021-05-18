import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './NavBar.module.css';
import * as framer from '../framer/navBar';

const NavBar = () => {
  console.log(window.location.pathname);

  const navListNames = [
    { name: 'about', link: '/about', type: 'in' },
    { name: 'projects', link: '/projects', type: 'in' },
    { name: 'games', link: '/games', type: 'in' },
    // { name: 'blog', link: 'https://velog.io/@woojin', type: 'out' },
    // { name: 'github', link: 'https://github.com/woojin624', type: 'out' },
  ];
  const linkListNames = [
    { name: 'velog', link: 'https://velog.io/@woojin', type: 'out' },
    { name: 'github', link: 'https://github.com/woojin624', type: 'out' },
    { name: 'codepen', link: 'https://codepen.io/woojin624', type: 'out' },
  ];
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navToggleHandler = () => {
    setIsNavOpen(!isNavOpen);
  };
  const navCloseHandler = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      <h3 className={styles.navLogo} onClick={navCloseHandler}>
        <Link to={'/'}>J.com</Link>
      </h3>
      <div className={isNavOpen ? `${styles.navToggleBtn} ${styles.opened}` : styles.navToggleBtn} onClick={navToggleHandler}>
        <div className={styles.navToggleTop}></div>
        <div className={styles.navToggleBottom}></div>
      </div>
      <AnimatePresence>
        {isNavOpen ? (
          <motion.div
            initial='out' //
            animate='in'
            exit='out'
            variants={framer.navContain}
            className={styles.navContain}
          >
            <motion.ul className={styles.linkList} variants={framer.navUl}>
              {linkListNames.map((list, i) => (
                <motion.li
                  key={i} //
                  variants={framer.linkEl}
                  transition={{ duration: 0.4 }}
                >
                  <a target='_blank' href={`${list.link}`}>
                    {list.name}
                  </a>
                </motion.li>
              ))}
              <hr />
              <p className={styles.mail}>624jang@gmail.com</p>
              <p className={styles.copy}>ⓒ Woojin. All rights reserved.</p>
            </motion.ul>
            <motion.ul className={styles.navList} variants={framer.navUl}>
              {navListNames.map((list, i) => (
                <motion.li
                  key={i} //
                  variants={framer.navEl}
                  transition={{ duration: 0.2 }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  onClick={navCloseHandler}
                  className={window.location.pathname === list.link ? styles.active : null}
                >
                  <Link to={`${list.link}`}>{list.name}</Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
