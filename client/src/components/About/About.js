import React from 'react';
import { motion } from 'framer-motion';

import styles from './About.module.css';

const About = (props) => {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
        <h1>About</h1>
      </motion.div>
    </>
  );
};
export default About;
