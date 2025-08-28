import React from 'react';
import * as Sentry from '@sentry/react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { logger } from '@shared/lib/logger';
import { App, createStore } from './app';
import './index.css';

const store = createStore();
logger.init();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Sentry.ErrorBoundary fallback={<p>Что-то пошло не так</p>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  </Provider>
);
