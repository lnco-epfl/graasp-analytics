export const DEFAULT_API_OPTIONS = {
  headers: { 'content-type': 'application/json' },
  credentials: 'include',
  method: 'GET',
};
export const DEFAULT_REQUEST_PAGE_SIZE = 1000;

export const buildActionsEndpoint = (url, spaceId, pageSize) =>
  `${url}?spaceId=${spaceId}&pageSize=${pageSize}`;
