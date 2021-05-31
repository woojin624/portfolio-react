import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { BsArrowUpRight, BsX } from 'react-icons/bs';
import * as framer from '../../../framer/projectDetail';

import SubImg from './SubImg';
import OtherProjectBtn from './OtherProjectBtn';
import ToTopBtn from './ToTopBtn';
import ContentArea from './ContentArea';
import HiddenProject from './HiddenProject';

import styles from './ProjectDetail.module.scss';

const ProjectDetail = ({ match, projectsList }) => {
  const id = match.params.id;
  const openedProjects = projectsList.filter((project) => project.visible);
  const [project, setProject] = useState(openedProjects.find((project) => project._id === parseInt(id)));
  const curIndex = openedProjects.indexOf(project);

  let history = useHistory();

  const projectClose = () => {
    history.push('/projects');
  };

  return (
    <>
      {project.visible ? (
        <motion.main initial='hidden' animate='in' exit='out' variants={framer.projectDetail} className={styles.projectDetail}>
          {project.mainImg && (
            <motion.figure //
              variants={framer.mainImageWrap}
              className={styles.mainImageWrap}
            >
              <img src={project.mainImg} alt='main' />
            </motion.figure>
          )}
          <div className={styles.projectInfo}>
            <h2 className={styles.projectSubTitle}>
              {project.subTitle}
              <span />
            </h2>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <div className={styles.skillSetEls}>{project.tag && project.tag.map((skill, i) => <span key={i}>{skill}</span>)}</div>
            <p className={styles.projectPeriod}>{project.period}</p>
            <section className={styles.mainInfo}>
              <article>
                <a href={project.siteLink ? project.siteLink : '#'}>
                  <span>SITE LINK</span>
                  <BsArrowUpRight />
                </a>
                <a href={project.githubLink ? project.githubLink : '#'}>
                  <span>GITHUB</span>
                  <BsArrowUpRight />
                </a>
              </article>
              <article>
                <div>
                  <h4 className={styles.projectPeople}>참여인원</h4>
                  <p className={styles.peopleEl}>{project.people}명</p>
                </div>
                <div>
                  <h4 className={styles.projectRange}>내 업무범위</h4>
                  {project.workRange &&
                    project.workRange.map((range, i) => (
                      <p className={styles.rangeEls} key={i}>
                        {range}
                      </p>
                    ))}
                </div>
              </article>
            </section>

            {project.subImg && <SubImg subImg={project.subImg} />}

            <section className={styles.summary}>
              <article>
                <h3 className={styles.summaryTitle}>About the Project</h3>
              </article>
              <article>
                <p className={styles.projectDesc}>{project.desc}</p>
              </article>
            </section>
          </div>
          <ContentArea project={project} />
          <div className={styles.otherProjectsWrap}>
            <div className={styles.otherProjects}>
              {openedProjects[curIndex + 1] && <OtherProjectBtn order={'Prev'} project={openedProjects[curIndex + 1]} />}
              {openedProjects[curIndex - 1] && <OtherProjectBtn order={'Next'} project={openedProjects[curIndex - 1]} />}
              <ToTopBtn />
            </div>
          </div>
        </motion.main>
      ) : (
        <HiddenProject />
      )}
      <motion.button initial='hidden' animate='in' exit='out' variants={framer.projectCloseBtn} className={styles.projectCloseBtn} onClick={projectClose}>
        <BsX className={styles.xBtn} />
      </motion.button>
    </>
  );
};

const mapStateToProps = ({ projects }) => {
  return {
    projectsList: projects.projects,
  };
};

export default connect(mapStateToProps)(withRouter(ProjectDetail));
