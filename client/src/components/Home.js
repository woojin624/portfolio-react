import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';
import { motion } from 'framer-motion';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [leftBoxClass, setLeftBoxClass] = useState('home-box-l home-hide-l');
  const [rightBoxClass, setRightBoxClass] = useState('home-box-r home-hide-r');

  useEffect(() => {
    axios
      .get('/api/projectlist')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // setLeftBoxClass('home-box-l');
    // setRightBoxClass('home-box-r');

    return () => {
      console.log('언마운트');
    };
  }, []);

  const boxTransition = {
    leftIn: {
      transform: 'translate(0, 0)',
    },
    leftOut: {
      transform: 'translate(-100%, 0)',
    },
    rightIn: {
      transform: 'translate(0, 0)',
    },
    rightOut: {
      transform: 'translate(100%, 0)',
    },
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
        <div className='land-contain'>
          <motion.div initial='leftIn' animate='leftIn' exit='leftOut' transition={{ duration: 0.3 }} variants={boxTransition} className={leftBoxClass} />
          <motion.div initial='rightIn' animate='rightIn' exit='rightOut' transition={{ duration: 0.3 }} variants={boxTransition} className={rightBoxClass} />
        </div>
      </motion.div>
    </>
  );
};

export default Home;
