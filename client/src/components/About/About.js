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
          <section className={styles.introSec}>
            <article className={styles.introLeft}>
              <h1>ABOUT</h1>
              <h2>개발자를 위한 개발을 하는 개발자</h2>
            </article>
            <article className={styles.introRight}>
              <figure>
                <img src='/images/profile-img1.png' alt='' />
              </figure>
            </article>
          </section>
        </div>
      </motion.div>
    </>
  );
};
export default About;
