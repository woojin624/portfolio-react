import React from 'react';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Viewer } from '@toast-ui/react-editor';
import 'tui-chart/dist/tui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import hljs from 'highlight.js';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';

const TuiViewer = ({ content }) => {
  return <Viewer initialValue={content} height='800px' usageStatistics={false} plugins={[chart, codeSyntaxHighlight.bind(hljs), colorSyntax, tableMergedCell, uml]} />;
};

export default TuiViewer;
