import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import './main.css';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetail = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectsDetail, setProjectsDetail] = useState({});

  let history = useHistory();

  const id = match.params.id;

  useEffect(() => {
    axios
      .get(`/api/projectDetail/${id}`)
      .then((res) => {
        setProjectsDetail(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
    // <AnimatePresence>
    <motion.div initial='out' animate='in' exit='out' transition={{ duration: 0.3 }} variants={projectDetailMotion} className='projectDetail-wrap'>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <>
          <h1>{projectsDetail.title}</h1>
          <p>{projectsDetail.content}</p>
        </>
      )}
      <div className='project-close-btn' onClick={projectClose}></div>
    </motion.div>
    // </AnimatePresence>
  );
};

export default withRouter(ProjectDetail);
