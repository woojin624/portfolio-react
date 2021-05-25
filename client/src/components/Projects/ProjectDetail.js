import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { BsArrowUpRight, BsX } from 'react-icons/bs';
import * as framer from '../../framer/projectDetail';

import ReactHtmlParser from 'react-html-parser';

import styles from './ProjectDetail.module.css';
import SubImg from './SubImg';
import OtherProjectBtn from './OtherProjectBtn';

const ProjectDetail = ({ match, projectsList }) => {
  const id = match.params.id;
  const openedProjects = projectsList.filter((project) => project.visible);
  const [project, setProject] = useState(openedProjects.find((project) => project._id === parseInt(id)));
  const curIndex = openedProjects.indexOf(project);

  let history = useHistory();
  window.scrollTo(0, 0);

  const projectClose = () => {
    history.push('/projects');
    window.scrollTo(0, 0);
  };

  return (
    <>
      {project.visible ? (
        <motion.div initial='hidden' animate='in' exit='out' variants={framer.projectDetail} className={styles.projectDetail}>
          {project.mainImg && (
            <motion.figure //
              variants={framer.mainImageWrap}
              className={styles.mainImageWrap}
            >
              <img src={project.mainImg} alt='main' />
              {/* <motion.div variants={framer.mainImageCover} className={styles.mainImageCover} style={{ backgroundColor: project.color ? project.color : '#f00' }}>
                <h1>{project.title}</h1>
              </motion.div> */}
            </motion.figure>
          )}
          <div className={styles.projectInfo}>
            <h3 className={styles.projectSubTitle}>
              {project.subTitle}
              <span />
            </h3>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            <div className={styles.skillSetEls}>{project.tag && project.tag.map((skill, i) => <span key={i}>{skill}</span>)}</div>
            <p className={styles.projectPeriod}>{project.period}</p>
            <section className={styles.mainInfo}>
              <article>
                <a href={project.siteLink ? project.siteLink : '#'}>
                  <span>SITE</span>
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
                <h2 className={styles.summaryTitle}>About the Project</h2>
              </article>
              <article>
                <p className={styles.projectDesc}>{project.desc}</p>
              </article>
            </section>
            <section className={styles.content}>{ReactHtmlParser(project.content)}</section>
          </div>
          <div className={styles.otherProjectsWrap}>
            <section className={styles.otherProjects}>
              {openedProjects[curIndex + 1] && <OtherProjectBtn order={'Prev'} project={openedProjects[curIndex + 1]} />}
              {openedProjects[curIndex - 1] && <OtherProjectBtn order={'Next'} project={openedProjects[curIndex - 1]} />}
            </section>
          </div>
        </motion.div>
      ) : (
        <div className={styles.hiddenProject}>
          <h1>비공개 프로젝트입니다.🤔</h1>
        </div>
      )}
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
