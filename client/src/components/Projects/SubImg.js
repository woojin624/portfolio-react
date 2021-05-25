import React, { useEffect, useRef, useState } from 'react';

import styles from './ProjectDetail.module.css';

const SubImg = ({ subImg }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [transY, setTransY] = useState(20);
  const imageWrap = useRef();

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    let top = imageWrap.current.getBoundingClientRect().top + scrollTop;
    if (scrollTop > top / 3 && scrollTop <= top) {
      setTransY(((scrollTop - top / 3) / (top - top / 3)) * 60 + 20);
    } else if (scrollTop <= top / 3) {
      setTransY(20);
    } else {
      setTransY(80);
    }
  }, [scrollTop]);

  const onScroll = () => {
    setScrollTop(window.scrollY);
  };

  return (
    <figure ref={imageWrap} className={styles.subImageWrap}>
      <img className={styles.subImage} src={subImg} style={{ transform: `translateY(-${transY}%)` }} alt='sub' />
    </figure>
  );
};

export default SubImg;
