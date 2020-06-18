export const DEFAULT_API_OPTIONS = {
  headers: { 'content-type': 'application/json' },
  credentials: 'include',
  method: 'GET',
};

export const DEFAULT_REQUEST_PAGE_SIZE = 1000;

export const ACTIONS_PARAMETER = 'actions';
export const buildActionsEndpoint = (
  url,
  parameter,
  spaceId,
  pageSize,
  ...additionalSpaceIds
) => {
  const additionalSpacesString = additionalSpaceIds.reduce(
    (currentString, additionalSpaceId) => {
      return `${currentString}&spaceId=${additionalSpaceId}`;
    },
    '',
  );
  return `${url}/${parameter}?spaceId=${spaceId}&pageSize=${pageSize}${additionalSpacesString}`;
};

export const SPACES_PARAMETER = 'spaces';
export const buildSpacesEndpoint = (url, parameter, spaceId) =>
  `${url}/${parameter}/${spaceId}`;
