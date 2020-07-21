// app routes and parameters
export const RESEARCH_API_ROUTE = 'research';
export const USERS_API_ROUTE = 'users';
export const ANALYTICS_PARAMETER = 'analytics';
export const TASKS_PARAMETER = 'tasks';
export const CURRENT_USER_PARAMETER = 'current';

// parameter used with analytics requests
export const DEFAULT_REQUEST_SAMPLE_SIZE = 2000;

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
  spaceId,
  requestedSampleSize,
) => {
  return `${url}/${apiRoute}/${parameter}?spaceId=${spaceId}&requestedSampleSize=${requestedSampleSize}`;
};

export const buildTasksEndpoint = (
  url,
  apiRoute,
  parameter,
  { userId, spaceId } = {},
) => {
  return userId && spaceId
    ? `${url}/${apiRoute}/${parameter}?userId=${userId}&spaceId=${spaceId}`
    : `${url}/${apiRoute}/${parameter}`;
};
