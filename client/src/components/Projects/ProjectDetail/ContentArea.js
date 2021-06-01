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
    ${title('4rem')}
    margin: 2rem auto 4rem;

    @media all and (max-width: 767px) {
      ${title('2rem')}
      margin: 1.5rem auto 3rem;
    }
  `;

  return (
    <>
      <ContentTitle>Project Detail</ContentTitle>
      <div className='toastui'>
        <TuiViewer content={project.content} />
      </div>
    </>
  );
};

export default ContentArea;
