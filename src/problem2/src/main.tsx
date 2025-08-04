import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

import './index.css';
import '@radix-ui/themes/styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
