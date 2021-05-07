import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { motion } from 'framer-motion';
import { ImArrowRight2 } from 'react-icons/im';
import { connect } from 'react-redux';

import styles from './Home.module.css';

const Home = ({ projectsList }) => {
  let history = useHistory();
  const [myWorks, setMyWorks] = useState([]);

  const introText = ['DEVELOPER', 'TO', 'DEVELOP', 'FOR', 'DEVELOPERS'];

  useEffect(() => {
    let arr = [...projectsList];
    if (arr.length > 4) {
      arr.length = 4;
    }
    setMyWorks(arr);
  }, []);

  const homeMotion = {
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

  const introTextSpan = {
    hidden: {
      y: '100%',
    },
    visible: (i) => ({
      y: '0%',
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    out: (i) => ({
      y: '-100%',
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const thumbImgMotion = {
    hidden: (i) => ({
      x: '0%',
      y: '0%',
    }),
    visible: (i) => ({
      x: `${-i * 5}%`,
      y: `${i * 15}%`,
      transition: {
        delay: 0.5,
        duration: 1,
      },
    }),
    out: (i) => ({
      x: `${-i * 5}%`,
      y: `${i * 15}%`,
    }),
  };

  const introSecMotion = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    out: {
      opacity: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
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

  const cornerCircleMotion = {
    hidden: {
      x: '-50%',
      y: '-50%',
      scale: 0,
    },
    visible: {
      x: '-50%',
      y: '-50%',
      scale: 0.5,
      transition: {
        delay: 0,
        ease: 'easeInOut',
        duration: 0.8,
      },
    },
    out: {
      opacity: [1, 1, 0],
      x: '-50%',
      y: '-50%',
      scale: [1, 15, 15],
      transition: {
        ease: 'easeInOut',
        duration: 1,
      },
    },
  };

  const onAboutClick = () => {
    history.push(`/about`);
  };
  const onWorksClick = () => {
    history.push(`/projects`);
  };

  return (
    <>
      <motion.div variants={homeMotion} initial='hidden' animate='visible' exit='out' className={styles.home}>
        <motion.h3 variants={pageTitleMotion} className={styles.pageTitle}>
          Portfolio
        </motion.h3>
        <motion.div variants={introSecMotion} className={styles.landContain}>
          <section className={styles.introSec}>
            <div className={styles.textWrap}>
              <h4>FRONT-END</h4>
              {introText.map((text, i) => (
                <p key={i}>
                  <motion.span variants={introTextSpan} custom={i}>
                    {text}
                  </motion.span>
                </p>
              ))}
              <div onClick={onAboutClick} className={styles.aboutMe}>
                <p>
                  About Me <ImArrowRight2 className={styles.arrow} />
                </p>
              </div>
            </div>
          </section>
          <section className={styles.worksSec}>
            <div className={styles.worksWrap}>
              <div onClick={onWorksClick} className={styles.myWorks}>
                <p>
                  My Works <ImArrowRight2 className={styles.arrow} />
                </p>
              </div>
              <div className={styles.thumbBox}>
                {myWorks.map((work, i) => (
                  <motion.div variants={thumbImgMotion} custom={i} key={i} className={styles.workThumb}>
                    <img src={work.thumbImg} alt='' />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
        <motion.div variants={cornerCircleMotion} className={styles.cornerCircle}></motion.div>
      </motion.div>
    </>
  );
};

const mapStateToProps = ({ projects }) => {
  return {
    projectsList: projects.projects,
  };
};

export default connect(mapStateToProps)(Home);
