import React, { useRef, useState } from 'react';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

const AdminWriteEditor = ({ content, setContent }) => {
  const editorRef = useRef();

  //   const [content, setContent] = useState();

  const onContentHandler = () => {
    console.log(editorRef.current.getInstance().getHtml());
    setContent(editorRef.current.getInstance().getHtml());
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
