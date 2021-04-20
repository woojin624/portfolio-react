import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { BsChevronRight, BsX } from 'react-icons/bs';

import styles from './ProjectDetail.module.css';

const ProjectDetail = ({ match, projectsList }) => {
  const id = match.params.id;
  const [project, setProject] = useState({});
  const [projectSkills, setProjectSkills] = useState([]);
  const [projectRange, setProjectRange] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const newArr = [...projectsList].filter((data) => data._id === parseInt(id));
    setProject(...newArr);
  }, []);

  useEffect(() => {
    if (project !== {}) {
      const skills = project.tag ? project.tag.split('&&') : [];
      const ranges = project.workRange ? project.workRange.split('&&') : [];
      setProjectSkills(skills);
      setProjectRange(ranges);
    }
  }, [project]);

  const projectDetailMotion = {
    in: {
      y: '0%',
    },
    out: {
      y: '100vh',
    },
  };

  const mainImageVariants = {
    in: {
      height: '50vh',
      transition: { duration: 0.7, delay: 0.6, ease: 'easeIn' },
    },
    out: {
      height: '100vh',
      transition: { duration: 0.3, delay: 0 },
    },
  };

  const projectClose = () => {
    history.push('/projects');
  };

  return (
    <>
      <motion.div initial='out' animate='in' exit='out' transition={{ duration: 0.3 }} variants={projectDetailMotion} className={styles.projectDetailWrap}>
        {project.mainImg && (
          <motion.figure initial='out' animate='in' exit='out' variants={mainImageVariants} className={styles.mainImageWrap}>
            <img className={styles.mainImage} src={project.mainImg} alt='' />
          </motion.figure>
        )}
        <div className={styles.projectInfo}>
          <section className={styles.mainInfo}>
            <article>
              <h1 className={styles.projectTitle}>{project.title}</h1>
              <h3 className={styles.projectSubTitle}>{project.subTitle}</h3>
              <p className={styles.projectPeriod}>{project.period}</p>

              <a href='#'>
                <span>SITE</span>
                <BsChevronRight />
              </a>
              <a href='#'>
                <span>GITHUB</span>
                <BsChevronRight />
              </a>
            </article>
            <article>
              <p className={styles.projectDesc}>{project.desc}</p>
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
              <h4 className={styles.projectSkillSet}>기술스택</h4>
              <div className={styles.skillSetEls}>{projectSkills && projectSkills.map((skill, i) => <span key={i}>{skill}</span>)}</div>
              <h4 className={styles.projectPeople}>참여인원</h4>
              <p className={styles.PeopleEl}>{project.people}명</p>
              <h4 className={styles.projectRange}>내 업무범위</h4>
              {projectRange &&
                projectRange.map((range, i) => (
                  <p className={styles.rangeEls} key={i}>
                    {range}
                  </p>
                ))}
            </article>
          </section>
        </div>
      </motion.div>
      <div className={styles.projectCloseBtn} onClick={projectClose}>
        <BsX className={styles.xBtn} />
      </div>
    </>
  );
};

const mapStateToProps = ({ projects }) => {
  return {
    projectsList: projects.projects,
  };
};

export default connect(mapStateToProps)(withRouter(ProjectDetail));