import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectsList, setProjectsList] = useState([]);

  let history = useHistory();

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

  const projectBoxWrap = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
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
      <div className='projects-contain'>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <motion.div className='project-box-wrap' variants={projectBoxWrap} initial='hidden' animate='visible' exit='hidden'>
              {projectsList.map((project, i) => (
                <motion.div onClick={onCardClick} data-id={project._id} variants={projectBoxMotion} className={`project-box`} key={i}>
                  <h4>{project.title}</h4>
                  <p>{project.content}</p>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
