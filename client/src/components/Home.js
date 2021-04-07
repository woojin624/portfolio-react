import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

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

    // setTimeout(() => {
    //   setIsLoading(true);
    setLeftBoxClass('home-box-l');
    setRightBoxClass('home-box-r');
    // }, 2000);

    return () => {
      console.log('언마운트');
      setLeftBoxClass('home-box-l home-hide-l');
      setRightBoxClass('home-box-r home-hide-r');
    };
  }, []);

  useEffect(() => {}, [isLoading]);

  return (
    <>
      <div className='land-contain'>
        <div className={leftBoxClass}></div>
        <div className={rightBoxClass}></div>
      </div>
    </>
  );
};

export default Home;
