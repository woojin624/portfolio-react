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
        duration: 0.3,
      },
    },
    out: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        duration: 0.5,
      },
    },
  };

  const projectBoxWrap = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 2,
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const projectBoxMotion = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 2,
      },
    },
  };

  const initTitleWrap = {
    hidden: { x: 0 },
    visible: {
      x: 0,
      y: ['-50%', '-150%'],
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    out: { x: 500, opacity: 0 },
  };

  const initTitleMotion = {
    hidden: { y: 30 },
    visible: {
      y: 0,
      transition: {
        duration: 0.3,
        type: 'spring',
        damping: 20,
        stiffness: 500,
      },
    },
    out: {
      marginRight: '348px',
      transition: {
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
    <motion.div variants={projectMotion} initial='hidden' animate='visible' exit='out' style={{ position: 'relative' }}>
      <motion.p className={styles.initTitle} variants={initTitleWrap} initial='hidden' animate='visible' exit='out'>
        {initTitle.map((a, i) => (
          <motion.span key={i} variants={initTitleMotion}>
            {a}
          </motion.span>
        ))}
      </motion.p>
      <div className={styles.projectsContain}>
        <motion.div className={styles.projectBoxWrap} variants={projectBoxWrap} initial='hidden' animate='visible' exit='hidden'>
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
