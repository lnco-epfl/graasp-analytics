import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  DEFAULT_API_OPTIONS,
  DEFAULT_REQUEST_PAGE_SIZE,
  ACTIONS_PARAMETER,
  buildActionsEndpoint,
} from '../api/graasp';

export const ActionsDataContext = createContext();

const ActionsDataProvider = ({ children }) => {
  const [actionsData, setActionsData] = useState({ actions: [], error: null });
  const [isLoading, setIsLoading] = useState(true);
  const [subspacesToFetch, setSubspacesToFetch] = useState([]);
  const { id: currentSpaceId } = useParams();

  useEffect(() => {
    const fetchData = async (spaceId, additionalSpaceIds) => {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const requestUrl = buildActionsEndpoint(
        baseUrl,
        ACTIONS_PARAMETER,
        spaceId,
        DEFAULT_REQUEST_PAGE_SIZE,
        ...additionalSpaceIds,
      );
      try {
        const response = await fetch(requestUrl, DEFAULT_API_OPTIONS);
        if (!response.ok) {
          throw response;
        }
        const resolvedData = await response.json();
        setIsLoading(false);
        setActionsData({ actions: resolvedData, error: null });
      } catch (error) {
        setIsLoading(false);
        setActionsData({ actions: [], error });
      }
    };
    fetchData(currentSpaceId, subspacesToFetch);
  }, [currentSpaceId, subspacesToFetch]);

  return (
    <ActionsDataContext.Provider
      value={{
        ...actionsData,
        isLoading,
        subspacesToFetch,
        setSubspacesToFetch,
      }}
    >
      {children}
    </ActionsDataContext.Provider>
  );
};

ActionsDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ActionsDataProvider;
