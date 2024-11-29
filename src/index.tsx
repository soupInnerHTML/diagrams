import './css/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components';
import {DiagramsProvider} from "./context";
import { configure } from 'mobx';

configure({
    enforceActions: 'never'
})

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
      <DiagramsProvider>
          <App />
      </DiagramsProvider>
  </React.StrictMode>
);
