import {App} from "App";
import React from 'react';
import ReactDOM from 'react-dom/client';

const container = window.document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App/>);
}
