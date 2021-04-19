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
      <h1>{project.title}</h1>
      <p>{project.content}</p>
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
