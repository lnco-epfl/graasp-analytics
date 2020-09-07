import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  RESEARCH_API_ROUTE,
  ANALYTICS_PARAMETER,
  buildAnalyticsEndpoint,
  buildApiOptions,
  DEFAULT_REQUEST_SAMPLE_SIZE,
} from '../api/graasp';
import { REACT_APP_BASE_URL } from '../config/env';
import {
  extractMainSpace,
  consolidateUsers,
  formatConsolidatedUsers,
  addValueKeyToUsers,
} from '../utils/api';

export const SpaceDataContext = createContext();

const SpaceDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [spaceName, setSpaceName] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [actions, setActions] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [error, setError] = useState(null);
  const [usersToFilter, setUsersToFilter] = useState([]);
  const { spaceId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const requestUrl = buildAnalyticsEndpoint(
        REACT_APP_BASE_URL,
        RESEARCH_API_ROUTE,
        ANALYTICS_PARAMETER,
        spaceId,
        DEFAULT_REQUEST_SAMPLE_SIZE,
      );
      try {
        const response = await fetch(requestUrl, buildApiOptions('GET'));
        if (!response.ok) {
          throw response;
        }
        const resolvedData = await response.json();
        const mainSpaceName = extractMainSpace(resolvedData.spaceTree).name;
        const consolidatedUsers = addValueKeyToUsers(
          formatConsolidatedUsers(consolidateUsers(resolvedData.users)),
        );
        setSpaceName(mainSpaceName);
        setActions(resolvedData.actions);
        setAllUsers(consolidatedUsers);
        setUsersToFilter(consolidatedUsers);
        setMetadata(resolvedData.metadata);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err);
      }
    };
    fetchData();
  }, [spaceId]);

  return (
    <SpaceDataContext.Provider
      value={{
        isLoading,
        spaceName,
        actions,
        allUsers,
        metadata,
        error,
        usersToFilter,
        setUsersToFilter,
      }}
    >
      {children}
    </SpaceDataContext.Provider>
  );
};

SpaceDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SpaceDataProvider;
