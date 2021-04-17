import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import styles from './Home.module.css';

const Home = () => {
  const [leftBoxClass, setLeftBoxClass] = useState(`${styles.homeBoxL} ${styles.homeHideL}`);
  const [rightBoxClass, setRightBoxClass] = useState(`${styles.homeBoxR} ${styles.homeHideR}`);

  const boxTransition = {
    leftIn: {
      transform: 'translate(0%, 0)',
    },
    leftOut: {
      transform: 'translate(-100%, 0)',
    },
    rightIn: {
      transform: 'translate(0%, 0)',
    },
    rightOut: {
      transform: 'translate(100%, 0)',
    },
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
        <div className={styles.landContain}>
          <motion.div initial='leftOut' animate='leftIn' exit='leftOut' transition={{ duration: 0.5 }} variants={boxTransition} className={leftBoxClass} />
          <motion.div initial='rightOut' animate='rightIn' exit='rightOut' transition={{ duration: 0.5 }} variants={boxTransition} className={rightBoxClass} />
        </div>
      </motion.div>
    </>
  );
};

export default Home;
