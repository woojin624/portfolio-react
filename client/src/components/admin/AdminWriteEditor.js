import React, { useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import './AdminWriteEditor.scss';

import { Editor } from '@toast-ui/react-editor';

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
    />
  );
};

export default AdminWriteEditor;
