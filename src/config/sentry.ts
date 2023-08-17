import { SENTRY_ENV } from './env';

const generateSentryConfig = () => {
  // when app is built, PROD will be true
  // when running the app with `yarn dev` it will be false
  const SENTRY_TRACE_SAMPLE_RATE = import.meta.env.PROD ? 0.5 : 0.0;

  return { SENTRY_ENVIRONMENT: SENTRY_ENV, SENTRY_TRACE_SAMPLE_RATE };
};

export const { SENTRY_ENVIRONMENT, SENTRY_TRACE_SAMPLE_RATE } =
  generateSentryConfig();
