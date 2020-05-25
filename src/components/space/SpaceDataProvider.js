import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

export const SpaceDataContext = createContext();

const SpaceDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const { id: routeId } = useParams();

  useEffect(() => {
    const baseUrl = 'https://graasp-users.api.graasp.eu';
    const apiOptions = {
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      method: 'GET',
    };
    const identifyIfLearningSpace = async (spaceId) => {
      try {
        const response = await fetch(
          `${baseUrl}/spaces/${spaceId}`,
          apiOptions,
        );
        const resolvedResponse = await response.json();
        return resolvedResponse.isLearningSpace;
      } catch (error) {
        setData([{ error: 'This space does not exist' }]);
        return null;
      }
    };
    const fetchData = async (spaceId) => {
      const isLearningSpace = await identifyIfLearningSpace(spaceId);
      if (isLearningSpace) {
        setData([{ error: 'This space does not have analytics' }]);
      } else {
        const pageSize = 1000;
        const fetchedData = await fetch(
          `${baseUrl}/actions?spaceId=${spaceId}&pageSize=${pageSize}`,
          apiOptions,
        );
        const resolvedData = await fetchedData.json();
        setData(resolvedData);
      }
    };
    fetchData(routeId);
  }, [routeId]);

  return (
    <SpaceDataContext.Provider value={data}>
      {children}
    </SpaceDataContext.Provider>
  );
};

SpaceDataProvider.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default SpaceDataProvider;
