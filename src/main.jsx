import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app';
import { logger } from '@shared/lib/logger';
import * as Sentry from '@sentry/react';

logger.init();

createRoot(document.getElementById('root')).render(
  <Sentry.ErrorBoundary fallback={<p>Что-то пошло не так</p>}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Sentry.ErrorBoundary>
);
