import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import buildActionsEndpoint from '../api/graasp';

export const SpaceDataContext = createContext();

const SpaceDataProvider = ({ children }) => {
  const [data, setData] = useState({ actions: [], error: null });
  const [isLoading, setIsLoading] = useState(true);
  const { id: routeId } = useParams();

  useEffect(() => {
    const fetchData = async (spaceId) => {
      try {
        const fetchedData = await buildActionsEndpoint(spaceId);
        const resolvedData = await fetchedData.json();
        setIsLoading(false);
        setData({ actions: resolvedData, error: null });
      } catch (error) {
        setIsLoading(false);
        setData({ actions: [], error });
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
