import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './Projects.module.css';

const Projects = ({ projectsList }) => {
  let history = useHistory();
  const initTitle = ['P', 'R', 'O', 'J', 'E', 'C', 'T', 'S'];
  const [reversedList, setReversedList] = useState([]);

  useEffect(() => {
    let arr = [...projectsList];
    arr.reverse();
    setReversedList(arr);
  }, []);

  const projectMotion = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0,
      },
    },
    out: {
      opacity: 1,
      transition: {
        when: 'afterChildren',
        duration: 0,
      },
    },
  };

  const projectBoxWrap = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.1,
        duration: 0.3,
      },
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const projectBoxMotion = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.1,
        duration: 0.3,
      },
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const initTitleWrap = {
    hidden: {
      opacity: 0,
      top: '80px',
      left: '0%',
      x: '-100%',
      letterSpacing: '-3rem',
    },
    visible: {
      opacity: 1,
      top: '80px',
      left: '0%',
      x: '-1.5%',
      letterSpacing: '0rem',
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
    out: {
      opacity: 0,
      letterSpacing: '15rem',
      transition: {
        delay: 0.3,
        duration: 0.4,
      },
    },
  };

  const initTitleMotion = {
    hidden: {
      y: 100,
      x: -100,
    },
    visible: {
      y: 0,
      x: 0,
      transition: {
        ease: 'easeInOut',
        duration: 0.4,
      },
    },
    out: {
      y: -10,
      x: 0,
      transition: {
        delay: 0.5,
        ease: 'easeInOut',
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

  // 프로젝트 카드 클릭시 해당 상세페이지로 이동
  const onCardClick = (e) => {
    let workId = e.target.dataset.id;
    history.push(`/projects/${workId}`);
    window.scrollTo(0, 0);
  };

  return (
    <motion.div variants={projectMotion} initial='hidden' animate='visible' exit='out' className={styles.projectWrap}>
      <motion.h3 variants={pageTitleMotion} className={styles.pageTitle}>
        Projects
      </motion.h3>
      <motion.p className={styles.initTitle} variants={initTitleWrap} initial='hidden' animate='visible' exit='out'>
        {initTitle.map((a, i) => (
          <motion.span key={i} variants={initTitleMotion}>
            {a}
          </motion.span>
        ))}
      </motion.p>
      <div className={styles.projectsContain}>
        <motion.div className={styles.projectBoxWrap} variants={projectBoxWrap} initial='hidden' animate='visible' exit='out'>
          {reversedList.map((project, i) => (
            <motion.div
              onClick={onCardClick} //
              data-id={project._id}
              variants={projectBoxMotion}
              className={styles.projectBox}
              key={i}
            >
              <figure className={styles.projectBoxImg}>
                <img src={project.thumbImg} alt='dominant color placeholder' />
              </figure>
              <h4 className={styles.projectBoxTitle}>{project.title}</h4>
              <div className={styles.projectBoxSkills}>
                <span>React Js</span>
                <span>Node Js</span>
                <span>Express</span>
                <span>AWS</span>
              </div>
              <p className={styles.projectBoxDesc}>{project.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 이 부분에서 새로고침이나 url을 통한 접근 시 렌더링이 안되는 현상 체크 */}
      {/* <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route path='/projects/:id'>
            <ProjectDetail />
          </Route>
        </Switch>
      </AnimatePresence> */}
    </motion.div>
  );
};

const mapStateToProps = ({ projects }) => {
  return {
    projectsList: projects.projects,
  };
};

export default connect(mapStateToProps)(withRouter(Projects));
