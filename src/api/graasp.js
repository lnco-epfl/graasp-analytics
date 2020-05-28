const baseUrl = process.env.REACT_APP_BASE_URL;
const apiOptions = {
  headers: { 'content-type': 'application/json' },
  credentials: 'include',
  method: 'GET',
};
const pageSize = 1000;

const buildActionsEndpoint = (spaceId) =>
  fetch(`${baseUrl}?spaceId=${spaceId}&pageSize=${pageSize}`, apiOptions);

export default buildActionsEndpoint;
