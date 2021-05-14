import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as framer from '../../framer/projects';

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

  // 프로젝트 카드 클릭시 해당 상세페이지로 이동
  const onCardClick = (e) => {
    let workId = e.target.dataset.id;
    history.push(`/projects/${workId}`);
  };

  return (
    <motion.div variants={framer.projects} initial='hidden' animate='visible' exit='out' className={styles.projects}>
      <motion.h3 variants={framer.pageTitle} className={styles.pageTitle}>
        Projects
      </motion.h3>
      <motion.p className={styles.initTitle} variants={framer.initTitle}>
        {initTitle.map((a, i) => (
          <motion.span key={i} variants={framer.initTitleSpan}>
            {a}
          </motion.span>
        ))}
      </motion.p>
      <div className={styles.projectsContain}>
        <div className={styles.projectBoxWrap}>
          {reversedList.map((project, i) => (
            <motion.div
              onClick={onCardClick} //
              data-id={project._id}
              variants={framer.projectBox}
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
        </div>
      </div>
    </motion.div>
  );
};

const mapStateToProps = ({ projects }) => {
  return {
    projectsList: projects.projects,
  };
};

export default connect(mapStateToProps)(withRouter(Projects));
