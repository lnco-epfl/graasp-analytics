import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import { createRoot } from 'react-dom/client';

import Root from './components/Root';
import { API_HOST, ENABLE_MOCK_API } from './config/constants';
import {
  SENTRY_DSN,
  SENTRY_ENVIRONMENT,
  SENTRY_TRACE_SAMPLE_RATE,
} from './config/sentry';
import './index.css';
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
  integrations: [new BrowserTracing()],
  environment: SENTRY_ENVIRONMENT,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: SENTRY_TRACE_SAMPLE_RATE,
});

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<Root />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
