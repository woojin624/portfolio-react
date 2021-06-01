import React, { useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import 'tui-chart/dist/tui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import hljs from 'highlight.js';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';

import './AdminWriteEditor.scss';

const AdminWriteEditor = ({ content, setContent }) => {
  const editorRef = useRef();

  const onContentHandler = () => {
    setContent(editorRef.current.getInstance().getMarkdown());
  };

  return (
    <Editor //
      initialValue={content}
      previewStyle='vertical'
      height='800px'
      initialEditType='markdown'
      useCommandShortcut={true}
      ref={editorRef}
      onChange={onContentHandler}
      usageStatistics={false}
      plugins={[chart, codeSyntaxHighlight.bind(hljs), colorSyntax, tableMergedCell, uml]}
    />
  );
};

export default AdminWriteEditor;
