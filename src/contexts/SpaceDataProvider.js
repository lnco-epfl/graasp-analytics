import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  DEFAULT_API_OPTIONS,
  DEFAULT_REQUEST_PAGE_SIZE,
  buildActionsEndpoint,
} from '../api/graasp';

export const SpaceDataContext = createContext();

const SpaceDataProvider = ({ children }) => {
  const [data, setData] = useState({ actions: [], error: null });
  const [isLoading, setIsLoading] = useState(true);
  const { id: routeId } = useParams();

  useEffect(() => {
    const fetchData = async (spaceId) => {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const requestUrl = buildActionsEndpoint(
        baseUrl,
        spaceId,
        DEFAULT_REQUEST_PAGE_SIZE,
      );
      try {
        const response = await fetch(requestUrl, DEFAULT_API_OPTIONS);
        if (!response.ok) {
          throw response;
        }
        const resolvedData = await response.json();
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
