import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './NavBar.module.css';

const NavBar = () => {
  const navListNames = [
    { name: 'projects', link: '/projects', type: 'in' },
    { name: 'games', link: '/games', type: 'in' },
    { name: 'blog', link: 'https://velog.io/@woojin', type: 'out' },
    { name: 'github', link: 'https://github.com/woojin624', type: 'out' },
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

  const navElVariants = {
    in: {
      opacity: 1,
      x: 0,
    },
    out: {
      opacity: 0,
      x: -70,
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
            <motion.ul className={styles.navList} variants={navUlVariants}>
              {navListNames.map((list, i) => (
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
                  {list.type === 'in' ? (
                    <Link to={`${list.link}`}>{list.name}</Link>
                  ) : (
                    <a target='_blank' href={`${list.link}`}>
                      {list.name}
                    </a>
                  )}
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
