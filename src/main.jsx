import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app';
import { logger } from '@shared/lib/logger';
import * as Sentry from '@sentry/react';
import { createStore } from './app';

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
