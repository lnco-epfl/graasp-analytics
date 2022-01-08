const qs = require('qs');

// app routes and parameters
export const RESEARCH_API_ROUTE = 'research';
export const ITEM_API_ROUTE = 'item';
export const USERS_API_ROUTE = 'members';
export const ANALYTICS_PARAMETER = 'analytics';
export const TASKS_PARAMETER = 'tasks';
export const CURRENT_USER_PARAMETER = 'current';

// parameter used with analytics requests
export const DEFAULT_REQUEST_SAMPLE_SIZE = 5000;

// builds API options object used with all API calls
export const buildApiOptions = (method, { body } = {}) => {
  return {
    headers: { 'content-type': 'application/json' },
    credentials: 'include',
    method,
    body,
  };
};

// existing graasp API /users endpoint
export const buildUsersEndpoint = (url, apiRoute, parameter) => {
  return `${url}/${apiRoute}/${parameter}`;
};

// graasp-research custom API endpoints
export const buildAnalyticsEndpoint = (
  url,
  apiRoute,
  parameter,
  itemId,
  requestedSampleSize,
  requestedView,
) => {
  const analyticsQueryString = qs.stringify(
    { requestedSampleSize, view: requestedView },
    { addQueryPrefix: true },
  );
  return `${url}/${apiRoute}/${itemId}/${parameter}${analyticsQueryString}`;
};

export const buildTasksEndpoint = (
  url,
  apiRoute,
  parameter,
  { userId, spaceId, requestedView } = {},
) => {
  const tasksQueryString = qs.stringify(
    { userId, spaceId, view: requestedView },
    { addQueryPrefix: true },
  );
  return `${url}/${apiRoute}/${parameter}${tasksQueryString}`;
};
