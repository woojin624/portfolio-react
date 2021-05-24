import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';

import * as framer from '../../framer/projects';

import styles from './Projects.module.css';

const Projects = ({ projectsList }) => {
  let history = useHistory();
  const initTitle = ['P', 'R', 'O', 'J', 'E', 'C', 'T', 'S'];
  const [reversedList, setReversedList] = useState([]);
  const [thumbClass, setThumbClass] = useState(styles.thumbHover);

  useEffect(() => {
    let arr = [...projectsList];
    arr.reverse();
    setReversedList(arr);
  }, []);

  const onCardClick = (e) => {
    let workId = e.target.parentNode.dataset.id;
    history.push(`/projects/${workId}`);
  };

  return (
    <motion.div variants={framer.projects} initial='hidden' animate='visible' exit='out' className={styles.projects}>
      <motion.h3 variants={framer.pageTitle} className={styles.pageTitle}>
        Projects
      </motion.h3>
      <motion.p className={styles.initTitle} variants={framer.initTitle}>
        {initTitle.map((a, i) => (
          <motion.span key={i} variants={framer.initTitleSpan} custom={i}>
            {a}
          </motion.span>
        ))}
      </motion.p>
      <motion.div className={styles.projectsContain} variants={framer.projectBox}>
        <div className={styles.projectBoxWrap}>
          {reversedList.map((project, i) =>
            project.visible ? (
              <div data-id={project._id} className={styles.projectBox} key={i}>
                <figure
                  className={styles.projectBoxImg}
                  onClick={onCardClick} //
                  onMouseUp={() => {
                    setThumbClass(`${styles.thumbHover} ${styles.mouseUp}`);
                  }}
                  style={{ backgroundColor: project.color }}
                >
                  <img src={project.thumbImg} alt='thumbImg' />
                  <div className={thumbClass}>
                    <AiOutlinePlus />
                  </div>
                </figure>
                <h4 className={styles.projectBoxTitle} onClick={onCardClick}>
                  {project.title}
                </h4>
                <div className={styles.projectBoxSkills}>{project.tag && project.tag.map((skill, i) => <span key={i}>{skill}</span>)}</div>
                <p className={styles.projectBoxDesc}>{project.subTitle}</p>
              </div>
            ) : null
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const mapStateToProps = ({ projects }) => {
  return {
    projectsList: projects.projects,
  };
};

export default connect(mapStateToProps)(withRouter(Projects));
