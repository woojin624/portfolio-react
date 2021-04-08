import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/projectlist')
      .then((res) => {
        setProjectsList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const projectBoxMotion = {
    in: {
      y: 0,
    },
    out: {
      y: 200,
    },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className='projects-contain'>
        <div className='project-box-wrap'>
          <motion.div initial='out' animate='in' exit='out' transition={{ duration: 0.3 }} variants={projectBoxMotion} className='project-box'></motion.div>
          <motion.div initial='out' animate='in' exit='out' transition={{ duration: 0.3 }} variants={projectBoxMotion} className='project-box'></motion.div>
          <motion.div initial='out' animate='in' exit='out' transition={{ duration: 0.3 }} variants={projectBoxMotion} className='project-box'></motion.div>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>{projectsList[0].title}</div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
