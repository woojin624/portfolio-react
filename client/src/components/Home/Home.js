import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { motion } from 'framer-motion';
import { ImArrowRight2 } from 'react-icons/im';
import { connect } from 'react-redux';
import * as framer from '../../framer/home';

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
  }, [projectsList]);

  const onAboutClick = () => {
    history.push(`/about`);
  };
  const onWorksClick = () => {
    history.push(`/projects`);
  };

  return (
    <>
      <motion.main variants={framer.home} initial='hidden' animate='visible' exit='out' className={styles.home}>
        <motion.h1 variants={framer.pageTitle} className={styles.pageTitle}>
          Portfolio
        </motion.h1>
        <motion.div variants={framer.landContain} className={styles.landContain}>
          <section className={styles.introSec}>
            <div className={styles.textWrap}>
              <h3>FRONT-END</h3>
              {introText.map((text, i) => (
                <p key={i}>
                  <motion.span variants={framer.introTextSpan} custom={i}>
                    {text}
                  </motion.span>
                </p>
              ))}
              <button onClick={onAboutClick} className={styles.aboutMe}>
                <p>
                  About Me <ImArrowRight2 className={styles.arrow} />
                </p>
              </button>
            </div>
          </section>
          <section className={styles.worksSec}>
            <div className={styles.worksWrap}>
              <button onClick={onWorksClick} className={styles.myWorks}>
                <p>
                  My Works <ImArrowRight2 className={styles.arrow} />
                </p>
              </button>
              <div className={styles.thumbBox}>
                {myWorks.map((work, i) => (
                  <motion.div onClick={onWorksClick} variants={framer.workThumb} initial='hidden' animate='visible' exit='out' whileHover='hover' custom={i} key={i} className={styles.workThumb}>
                    <img className={styles.thumbImg} src={work.thumbImg} alt='thumb' />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
        <motion.div variants={framer.cornerCircle} className={styles.cornerCircle}></motion.div>
        <motion.div variants={framer.backCircle} className={styles.backCircle}></motion.div>
      </motion.main>
    </>
  );
};

const mapStateToProps = ({ projects }) => {
  return {
    projectsList: projects.projects,
  };
};

export default connect(mapStateToProps)(Home);
