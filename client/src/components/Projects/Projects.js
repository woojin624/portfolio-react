import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';

import * as framer from '../../framer/projects';

import styles from './Projects.module.css';
import Footer from '../Footer';

const Projects = ({ projectsList }) => {
  const openedProjects = projectsList.filter((project) => project.visible);
  const initTitle = ['P', 'R', 'O', 'J', 'E', 'C', 'T', 'S'];
  const [reversedList, setReversedList] = useState([]);
  const [thumbClass, setThumbClass] = useState(styles.thumbHover);

  let history = useHistory();

  useEffect(() => {
    let arr = [...openedProjects];
    arr.reverse();
    setReversedList(arr);
  }, []);

  const onCardClick = (e) => {
    let workId = e.target.parentNode.dataset.id;
    history.push(`/projects/${workId}`);
  };

  const onCardBtnClick = (e) => {
    let workId = e.target.parentNode.parentNode.dataset.id;
    history.push(`/projects/${workId}`);
  };

  return (
    <>
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
            {reversedList.map((project, i) => (
              <div data-id={project._id} className={i % 2 === 0 ? `${styles.projectBox} ${styles.odd}` : `${styles.projectBox} ${styles.even}`} key={i}>
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
                <div className={styles.projectBoxContent}>
                  <p className={styles.projectNum}>{i < 9 ? `0${i + 1}` : i + 1}</p>
                  <h4 className={styles.projectBoxTitle}>{project.title}</h4>
                  <div className={styles.projectBoxSkills}>{project.tag && project.tag.map((skill, i) => <span key={i}>{skill}</span>)}</div>
                  <p className={styles.projectBoxDesc}>{project.subTitle}</p>
                  <button className={styles.viewBtn} onClick={onCardBtnClick}>
                    VIEW PROJECT<div></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

const mapStateToProps = ({ projects }) => {
  return {
    projectsList: projects.projects,
  };
};

export default connect(mapStateToProps)(withRouter(Projects));
