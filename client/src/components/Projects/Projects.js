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
    console.log(e.target);
    console.log(e.target.parentNode);
    console.log(workId);
    history.push(`/projects/${workId}`);
  };

  const onCardBtnClick = (e) => {
    let workId = e.target.parentNode.parentNode.dataset.id;
    history.push(`/projects/${workId}`);
  };

  return (
    <>
      <motion.main variants={framer.projects} initial='hidden' animate='visible' exit='out' className={styles.projects}>
        <motion.h1 variants={framer.pageTitle} className={styles.pageTitle}>
          Projects
        </motion.h1>
        <motion.h2 className={styles.initTitle} variants={framer.initTitle}>
          {initTitle.map((a, i) => (
            <motion.span key={i} variants={framer.initTitleSpan} custom={i}>
              {a}
            </motion.span>
          ))}
        </motion.h2>
        <motion.div className={styles.projectsContain} variants={framer.projectBox}>
          <div className={styles.projectBoxWrap}>
            {reversedList.map((project, i) => (
              <article data-id={project._id} className={i % 2 === 0 ? (i % 4 === 0 ? `${styles.projectBox} ${styles.odd} ${styles.top}` : `${styles.projectBox} ${styles.odd} ${styles.bottom}`) : i - (1 % 4) === 0 ? `${styles.projectBox} ${styles.even} ${styles.top}` : `${styles.projectBox} ${styles.even} ${styles.bottom}`} key={i}>
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
                <p className={styles.category}>{project.category}</p>
                <p className={styles.projectNum}>{i < 9 ? `0${i + 1}` : i + 1}</p>
                <div className={styles.projectBoxContent}>
                  <h3 className={styles.projectBoxTitle}>{project.title}</h3>
                  <p className={styles.projectBoxDesc}>{project.subTitle}</p>
                  <div className={styles.projectBoxSkills}>{project.tag && project.tag.map((skill, i) => <span key={i}>{skill}</span>)}</div>
                  <button className={styles.viewBtn} onClick={onCardBtnClick}>
                    VIEW PROJECT<div></div>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </motion.main>
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
