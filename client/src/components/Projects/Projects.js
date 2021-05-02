import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './Projects.module.css';

const Projects = ({ projectsList }) => {
  let history = useHistory();

  const [reversedList, setReversedList] = useState([]);

  useEffect(() => {
    let arr = [...projectsList];
    arr.reverse();
    setReversedList(arr);
  }, []);

  const projectBoxWrap = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
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
    },
  };

  // 프로젝트 카드 클릭시 해당 상세페이지로 이동
  const onCardClick = (e) => {
    let workId = e.target.dataset.id;
    history.push(`/projects/${workId}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
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
