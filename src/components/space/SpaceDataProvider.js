import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

export const SpaceDataContext = createContext();

const SpaceDataProvider = ({ children }) => {
  const [data, setData] = useState({ actions: [], error: null });
  const [isLoading, setIsLoading] = useState(true);
  const { id: routeId } = useParams();

  useEffect(() => {
    const baseUrl = 'https://graasp-users.api.graasp.eu';
    const apiOptions = {
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      method: 'GET',
    };
    const pageSize = 1000;
    const fetchData = async (spaceId) => {
      try {
        const fetchedData = await fetch(
          `${baseUrl}/actions?spaceId=${spaceId}&pageSize=${pageSize}`,
          apiOptions,
        );
        const resolvedData = await fetchedData.json();
        setData({ actions: resolvedData, error: '' });
        setIsLoading(false);
        return resolvedData;
      } catch (error) {
        setData({ actions: [], error: 'This space does not exist.' });
        setIsLoading(false);
        return null;
      }
    };
    fetchData(routeId);
  }, [routeId]);

  return (
    <SpaceDataContext.Provider value={{ ...data, isLoading }}>
      {children}
    </SpaceDataContext.Provider>
  );
};

SpaceDataProvider.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default SpaceDataProvider;
