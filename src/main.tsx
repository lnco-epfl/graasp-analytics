import React from 'react';
import ReactDOM from 'react-dom/client';

import * as Sentry from '@sentry/react';

import pkg from '../package.json';
import Root from './components/Root';
import { APP_VERSION, ENABLE_MOCK_API, SENTRY_DSN } from './config/env';
import { SENTRY_ENVIRONMENT, SENTRY_TRACE_SAMPLE_RATE } from './config/sentry';

declare global {
  interface Window {
    Cypress?: any;
    database?: any;
  }
}

if (import.meta.env.MODE === 'test') {
  if (ENABLE_MOCK_API) {
    import('./mockServer/mockServer').then(({ initMockServer }) =>
      initMockServer(),
    );
  }
}

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  environment: SENTRY_ENVIRONMENT,
  release: `${pkg.name}@${APP_VERSION}`,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: SENTRY_TRACE_SAMPLE_RATE,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
