import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

const AdminWriteEditor = ({ content, setContent }) => {
  const editorRef = useRef();

  const onContentHandler = () => {
    setContent(editorRef.current.getInstance().getMarkdown());
  };

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

        * {
          color: #f8f6f3;
        }
      }

      ol {
        background: none;
        color: #242424;
        padding: 2rem 0;
        list-style: none;

        * {
          color: #242424;
        }
      }

      li {
        margin: 0 auto;
        padding: 0;

        &::before {
          content: none;
        }

        b,
        strong {
          display: block;
          ${frame}
          ${title('3rem')}
          margin-top: 3rem;
        }

        i,
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

      @media all and (min-width: 768px) and (max-width: 1023px) {
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
          b,
          strong {
            ${title('2rem')}
            margin: 1rem auto;
          }

          i,
          em {
            ${title('1.2rem')}
            font-weight: 500;
            margin: 0.5rem auto;
          }

          img {
            ${frame}
            margin: 0 auto;
            padding: 1rem 50px;
          }
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
          b,
          strong {
            ${title('1.3rem')}
            margin: 1rem auto;
          }

          i,
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
    <Content>
      <Editor //
        initialValue={content}
        previewStyle='vertical'
        height='800px'
        initialEditType='markdown'
        useCommandShortcut={true}
        ref={editorRef}
        onChange={onContentHandler}
      />
    </Content>
  );
};

export default AdminWriteEditor;
