export const DEFAULT_API_OPTIONS = {
  headers: { 'content-type': 'application/json' },
  credentials: 'include',
  method: 'GET',
};

const APP_ROUTE = 'research';
export const DEFAULT_REQUEST_SAMPLE_SIZE = 2000;
export const ANALYTICS_PARAMETER = 'analytics';

export const buildAnalyticsEndpoint = (
  url,
  parameter,
  spaceId,
  requestedSampleSize,
) => {
  return `${url}/${APP_ROUTE}/${parameter}?spaceId=${spaceId}&requestedSampleSize=${requestedSampleSize}`;
};
