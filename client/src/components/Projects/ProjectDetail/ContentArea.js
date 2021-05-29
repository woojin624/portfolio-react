import React from 'react';
import styled, { css } from 'styled-components';
import TuiViewer from '../../admin/TuiViewer';

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
    margin: 1rem auto 4rem;

    @media all and (max-width: 767px) {
      ${title('2rem')}
    }
  `;

  const Content = styled.section`
    div.tui-editor-contents {
      position: relative;
      width: 100%;
      min-height: 100px;
      height: auto;
      font-family: 'Roboto', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;

      * {
        box-sizing: border-box;
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
      p {
        img {
          width: 100%;
          margin: 0;
          padding: 0;
          display: block;
        }
      }

      ul {
        background: #242424;
        color: #f8f6f3;
        padding: 2rem 0;
        list-style-type: none;
      }

      ol {
        background: none;
        color: #242424;
        padding: 2rem 0;
        list-style: none;
      }

      li {
        margin: 0 auto;
        padding: 0;

        &::before {
          content: none;
        }

        strong {
          display: block;
          ${frame}
          ${title('3rem')}
          margin-top: 3rem;
        }

        em {
          display: block;
          ${frame}
          ${title('1.5rem')}
          font-style: normal;
          font-weight: 500;
        }

        img {
          ${frame}
          margin: 0 auto;
          padding: 1rem 50px;
          display: block;
        }
      }

      blockquote {
        ${frame};
        margin: 0 auto;
        font-size: 1rem;
        text-align: left;
        p {
        }
      }

      @media all and (max-width: 767px) {
        h1 {
          ${title('1.3rem')}
        }

        h2 {
          ${title('18px')}
        }

        h3 {
          ${title('14px')}
        }

        ul {
          padding: 0.5rem 0;
        }

        ol {
          padding: 0.5rem 0;
        }

        li {
          strong {
            ${title('1.3rem')}
            margin: 1rem auto;
          }

          em {
            ${title('0.8rem')}
            font-weight: 500;
            margin: 0.5rem auto;
          }

          img {
            ${frame}
            margin-bottom: 0;
            padding: 0.5rem 50px;
          }
        }
      }
    }
  `;

  return (
    <>
      <ContentTitle>Project Detail</ContentTitle>
      <Content>
        <TuiViewer content={project.content} />
      </Content>
    </>
  );
};

export default ContentArea;
