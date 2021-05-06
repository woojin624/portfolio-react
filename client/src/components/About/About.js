import React from 'react';
import { motion } from 'framer-motion';

import styles from './About.module.css';

const About = (props) => {
  const aboutMotion = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0,
      },
    },
    out: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        duration: 0,
      },
    },
  };

  const pageTitleMotion = {
    hidden: {
      x: '-50%',
      y: '-450%',
    },
    visible: {
      x: '-50%',
      y: '-50%',
    },
    out: {
      x: '-50%',
      y: '-450%',
    },
  };

  return (
    <>
      <motion.div variants={aboutMotion} initial='hidden' animate='visible' exit='out' className={styles.about}>
        <motion.h3 variants={pageTitleMotion} className={styles.pageTitle}>
          About
        </motion.h3>
        <div className={styles.aboutContain}>
          <h1>About</h1>
        </div>
      </motion.div>
    </>
  );
};
export default About;
