import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './app';
import { AppProvider } from './context';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);
