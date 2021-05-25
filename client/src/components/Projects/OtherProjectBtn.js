import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import styles from './ProjectDetail.module.css';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';

const OtherProjectBtn = ({ project, order }) => {
  let history = useHistory();

  const moveToProject = (e) => {
    e.preventDefault();
    history.push(`/projects/${project._id}`);
  };

  const ProjectBtn = styled.button`
    position: absolute;
    ${order === 'Prev' ? 'text-align: left; left:0;' : 'text-align: right; right:0;'}
    border: none;
    padding: 0;
    width: 50%;
    height: 100%;
    color: #fff;
    background-position: center;
    background-color: #242424;
    background-size: 50% auto;
    background-repeat: no-repeat;
    background-image: url(${project.mainImg});

    @media all and (max-width: 767px) {
      position: relative;
      width: 100%;
      height: 160px;
    }
  `;

  const BtnBack = styled.div`
    padding: 50px;
    background-color: #242424;
    width: 100%;
    height: 100%;
    transition: 0.6s;

    &:hover {
      background-color: #24242490;

      h2 {
        letter-spacing: 0.1rem;
      }
    }

    h3 {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 1rem;

      svg {
        font-size: 2rem;
        margin: 0 0.5rem;
      }
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
      transition: 0.4s ease-out;
    }

    @media all and (max-width: 767px) {
      padding: 2rem 1.5rem;
    }
  `;

  return (
    <ProjectBtn
      className={order === 'Prev' ? styles.prevProject : styles.nextProject}
      onClick={(e) => {
        moveToProject(e);
      }}
    >
      <BtnBack>
        {order === 'Prev' ? (
          <h3>
            <BsArrowLeft />
            Prev
          </h3>
        ) : (
          <h3>
            Next
            <BsArrowRight />
          </h3>
        )}
        <h2>{project.title}</h2>
      </BtnBack>
    </ProjectBtn>
  );
};

export default OtherProjectBtn;
