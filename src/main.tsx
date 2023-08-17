import React from 'react';
import ReactDOM from 'react-dom/client';

import * as Sentry from '@sentry/react';

import pkg from '../package.json';
import Root from './components/Root';
import {
  API_HOST,
  APP_VERSION,
  ENABLE_MOCK_API,
  SENTRY_DSN,
} from './config/env';
import { SENTRY_ENVIRONMENT, SENTRY_TRACE_SAMPLE_RATE } from './config/sentry';
import MOCK_ITEMS from './mockServer/mockData/items';
import MOCK_MEMBERS from './mockServer/mockData/members';
import MOCK_MEMBERSHIP from './mockServer/mockData/membership';
import mockServer, { buildDatabase } from './mockServer/mockServer';

declare global {
  interface Window {
    Cypress?: any;
    database?: any;
  }
}

if (ENABLE_MOCK_API) {
  mockServer({
    urlPrefix: API_HOST,
    database: window.Cypress
      ? window.database
      : buildDatabase({
          currentMember: MOCK_MEMBERS[0],
          items: MOCK_ITEMS,
          itemMemberships: MOCK_MEMBERSHIP,
          members: MOCK_MEMBERS,
        }),
  });
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
