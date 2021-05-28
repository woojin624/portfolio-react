import React from 'react';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Viewer } from '@toast-ui/react-editor';

const TuiViewer = ({ content }) => {
  return <Viewer initialValue={content} height='800px' />;
};

export default TuiViewer;
