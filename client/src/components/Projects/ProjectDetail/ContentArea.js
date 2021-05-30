import React from 'react';
import styled, { css } from 'styled-components';
import TuiViewer from '../../admin/TuiViewer';

import '../../admin/AdminWriteEditor.scss';

const ContentArea = ({ project }) => {
  const frame = css`
    position: relative;
    width: 100%;
    max-width: 1600px;
    padding: 50px;

    @media all and (max-width: 767px) {
      padding: 0.5rem 1rem;
    }
  `;

  const title = (size) => {
    return css`
      text-align: left;
      font-size: ${size};
      font-weight: 700;
      margin: 1rem auto;
      padding: 0 50px;

      @media all and (max-width: 767px) {
        padding: 0 1rem;
      }
    `;
  };

  const ContentTitle = styled.h2`
    ${frame}
    ${title('3rem')}
    margin: 1rem auto;

    @media all and (max-width: 767px) {
      ${title('2rem')}
    }
  `;

  return (
    <>
      <ContentTitle>Project Detail</ContentTitle>
      <TuiViewer content={project.content} />
    </>
  );
};

export default ContentArea;
