import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import styled, { css } from 'styled-components';

const ContentArea = ({ project }) => {
  const frame = css`
    position: relative;
    width: 100%;
    max-width: 1600px;
    padding: 50px;
  `;

  const title = (size) => {
    return css`
      text-align: left;
      font-size: ${size};
      font-weight: 700;
      margin: 1rem auto;
      padding: 0 50px;
    `;
  };

  const ContentTitle = styled.h1`
    ${frame}
    ${title('3rem')}
    margin: 1rem auto 4rem;
  `;

  const Content = styled.section`
    position: relative;
    width: 100%;
    min-height: 100px;
    height: auto;

    img {
      width: 100%;
      margin-bottom: 3rem;
    }

    h1 {
      ${frame}
      ${title('32px')}
    }

    h2 {
      ${frame}
      ${title('24px')}
    }

    h3 {
      ${frame}
      ${title('18px')}
    }

    h5 {
      background: #242424;

      img {
        ${frame}
        margin-bottom: 0;
      }
    }

    h6 {
      background: none;

      img {
        ${frame}
        margin-bottom: 0;
      }
    }
  `;

  return (
    <>
      <ContentTitle>Project Detail</ContentTitle>
      <Content>{ReactHtmlParser(project.content)}</Content>
    </>
  );
};

export default ContentArea;
