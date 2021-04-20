import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';

import styles from './ProjectDetail.module.css';

const ProjectDetail = ({ match, projectsList }) => {
  const id = match.params.id;
  const [project, setProject] = useState({});
  let history = useHistory();

  useEffect(() => {
    const newArr = [...projectsList].filter((data) => data._id === parseInt(id));
    setProject(...newArr);
  }, []);

  const projectDetailMotion = {
    in: {
      y: '0%',
    },
    out: {
      y: '100%',
    },
  };

  const projectClose = () => {
    history.push('/projects');
  };

  return (
    <motion.div initial='out' animate='in' exit='out' transition={{ duration: 0.3 }} variants={projectDetailMotion} className={styles.projectDetailWrap}>
      {project.mainImg && (
        <figure className={styles.mainImageWrap}>
          <img className={styles.mainImage} src={project.mainImg} alt='' />
        </figure>
      )}
      <div className={styles.projectInfo}>
        <section className={styles.mainInfo}>
          <article>
            <h1>project.title</h1>
            <h3>project.subTitle</h3>
            <p>project.period</p>
          </article>
          <article>
            <p>project.desc</p>
          </article>
        </section>

        {project.subImg && (
          <figure className={styles.subImageWrap}>
            <img className={styles.subImage} src={project.subImg} alt='' />
          </figure>
        )}

        <section className={styles.summary}>
          <article>
            <h2 className={styles.summaryTitle}>프로젝트 개요</h2>
          </article>
          <article>
            <h4>기술스택</h4>
            <span>project.tag</span>
            <span>project.tag</span>
            <span>project.tag</span>
            <span>project.tag</span>
            <h4>참여인원</h4>
            <p>project.people 명</p>
            <h4>내 업무범위</h4>
            <p>project.workRange</p>
            <p>project.workRange</p>
            <p>project.workRange</p>
          </article>
        </section>
      </div>

      <div className={styles.projectCloseBtn} onClick={projectClose}></div>
    </motion.div>
  );
};

const mapStateToProps = ({ projects }) => {
  return {
    projectsList: projects.projects,
  };
};

export default connect(mapStateToProps)(withRouter(ProjectDetail));
