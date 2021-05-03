import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './NavBar.module.css';

const NavBar = () => {
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

  const navContainVariants = {
    in: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
    out: {
      opacity: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const navUlVariants = {
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

  const linkElVariants = {
    in: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    out: {
      opacity: 0,
      x: -70,
      y: 0,
    },
  };

  const navElVariants = {
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: 70,
    },
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
            variants={navContainVariants}
            className={styles.navContain}
          >
            <motion.ul className={styles.linkList} variants={navUlVariants}>
              {linkListNames.map((list, i) => (
                <motion.li
                  key={i} //
                  variants={linkElVariants}
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
            <motion.ul className={styles.navList} variants={navUlVariants}>
              {navListNames.map((list, i) => (
                <motion.li
                  key={i} //
                  variants={navElVariants}
                  transition={{ duration: 0.2 }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  onClick={navCloseHandler}
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
