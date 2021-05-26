import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import styled, { css } from 'styled-components';

const ContentArea = ({ project }) => {
  const frame = css`
    position: relative;
    width: 100%;
    max-width: 1600px;
    padding: 50px;

    @media all and (max-width: 767px) {
      padding: 1rem;
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

    ul {
      background: #242424;
      color: #f8f6f3;
      padding: 1rem 0;

      li {
        strong {
          display: block;
          ${frame}
          ${title('3rem')}
        }

        em {
          display: block;
          ${frame}
          ${title('1.5rem')}
          font-weight: 500;
        }
      }

      img {
        ${frame}
        margin-bottom: 0;
        padding: 1rem 50px;
      }
    }

    ol {
      background: none;
      color: #242424;
      padding: 1rem 0;

      li {
        strong {
          display: block;
          ${frame}
          ${title('3rem')}
        }

        em {
          display: block;
          ${frame}
          ${title('1.5rem')}
          font-weight: 500;
        }
      }

      img {
        ${frame}
        margin-bottom: 0;
        padding: 1rem 50px;
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
