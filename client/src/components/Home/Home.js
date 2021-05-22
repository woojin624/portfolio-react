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
  }, []);

  const onAboutClick = () => {
    history.push(`/about`);
  };
  const onWorksClick = () => {
    history.push(`/projects`);
  };

  return (
    <>
      <motion.div variants={framer.home} initial='hidden' animate='visible' exit='out' className={styles.home}>
        <motion.h3 variants={framer.pageTitle} className={styles.pageTitle}>
          Portfolio
        </motion.h3>
        <motion.div variants={framer.landContain} className={styles.landContain}>
          <section className={styles.introSec}>
            <div className={styles.textWrap}>
              <h4>FRONT-END</h4>
              {introText.map((text, i) => (
                <p key={i}>
                  <motion.span variants={framer.introTextSpan} custom={i}>
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
                  <motion.div onClick={onWorksClick} variants={framer.workThumb} whileHover='hover' custom={i} key={i} className={styles.workThumb}>
                    <img className={styles.thumbImg} src={work.thumbImg} alt='' />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
        <motion.div variants={framer.cornerCircle} className={styles.cornerCircle}></motion.div>
        <div className={styles.backCircle}></div>
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
