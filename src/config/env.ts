export const APP_VERSION = import.meta.env.VITE_VERSION;
export const DOMAIN = import.meta.env.VITE_GRAASP_DOMAIN;

export const API_HOST =
  import.meta.env.VITE_GRAASP_API_HOST || 'http://localhost:3000';

export const GRAASP_AUTH_HOST =
  import.meta.env.VITE_GRAASP_AUTH_HOST || 'http://localhost:3001';
export const GRAASP_PLAYER_HOST =
  import.meta.env.VITE_GRAASP_PLAYER_HOST || 'http://localhost:3112';
export const GRAASP_LIBRARY_HOST =
  import.meta.env.VITE_GRAASP_LIBRARY_HOST || 'http://localhost:3005';
export const GRAASP_BUILDER_HOST =
  import.meta.env.VITE_GRAASP_BUILDER_HOST || 'http://localhost:3111';
export const GRAASP_ACCOUNT_HOST =
  import.meta.env.VITE_GRAASP_ACCOUNT_HOST || 'http://localhost:3115';

export const SENTRY_ENV = import.meta.env.VITE_SENTRY_ENV;
export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

export const ENABLE_MOCK_API =
  import.meta.env.VITE_ENABLE_MOCK_API === 'true' || false;

export const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_KEY;
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
