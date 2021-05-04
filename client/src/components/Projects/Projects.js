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
        duration: 0.1,
      },
    },
    out: {
      opacity: 1,
      transition: {
        when: 'afterChildren',
        duration: 0.1,
      },
    },
  };

  const projectBoxWrap = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.8,
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.7,
        duration: 0.3,
      },
    },
    out: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.3,
      },
    },
  };

  const initTitleWrap = {
    hidden: {
      opacity: 0,
      top: '100px',
      left: '0%',
      x: '-100%',
      // y: '-50%',
      letterSpacing: '-3rem',
    },
    visible: {
      opacity: 1,
      top: '100px',
      left: '0%',
      x: '-1.5%',
      // y: '-50%',
      letterSpacing: '0rem',
      transition: {
        duration: 1.1,
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
        duration: 0.7,
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

  // 프로젝트 카드 클릭시 해당 상세페이지로 이동
  const onCardClick = (e) => {
    let workId = e.target.dataset.id;
    history.push(`/projects/${workId}`);
  };

  return (
    <motion.div variants={projectMotion} initial='hidden' animate='visible' exit='out' style={{ position: 'relative', textAlign: 'left' }}>
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
              <div className={styles.projectBoxImg} style={{ backgroundImage: `url('${project.thumbImg}')` }}></div>
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
