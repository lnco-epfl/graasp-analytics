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
  removeLearningAnalyticsUser,
  consolidateUsers,
  formatConsolidatedUsers,
  addValueKeyToUsers,
} from '../utils/api';
import { PERFORM_VIEW_STRING } from '../config/constants';

export const PerformDataContext = createContext();

const PerformDataProvider = ({ children }) => {
  const [isLoadingPerformData, setIsLoadingPerformData] = useState(true);
  const [performActions, setPerformActions] = useState([]);
  const [allPerformUsers, setAllPerformUsers] = useState([]);
  const [performMetadata, setPerformMetadata] = useState({});
  const [performFetchingError, setPerformFetchingError] = useState(null);
  const [performUsersToFilter, setPerformUsersToFilter] = useState([]);
  const { spaceId } = useParams();

  useEffect(() => {
    const fetchPerformData = async () => {
      const requestUrl = buildAnalyticsEndpoint(
        REACT_APP_BASE_URL,
        RESEARCH_API_ROUTE,
        ANALYTICS_PARAMETER,
        spaceId,
        DEFAULT_REQUEST_SAMPLE_SIZE,
        PERFORM_VIEW_STRING,
      );
      try {
        const response = await fetch(requestUrl, buildApiOptions('GET'));
        if (!response.ok) {
          throw response;
        }
        const resolvedData = await response.json();
        const consolidatedUsers = addValueKeyToUsers(
          formatConsolidatedUsers(
            consolidateUsers(removeLearningAnalyticsUser(resolvedData.users)),
          ),
        );
        setPerformActions(resolvedData.actions);
        setAllPerformUsers(consolidatedUsers);
        setPerformUsersToFilter(consolidatedUsers);
        setPerformMetadata(resolvedData.metadata);
        setIsLoadingPerformData(false);
      } catch (err) {
        setIsLoadingPerformData(false);
        setPerformFetchingError(err);
      }
    };
    fetchPerformData();
  }, [spaceId]);

  return (
    <PerformDataContext.Provider
      value={{
        isLoadingPerformData,
        performActions,
        allPerformUsers,
        performMetadata,
        performFetchingError,
        performUsersToFilter,
        setPerformUsersToFilter,
      }}
    >
      {children}
    </PerformDataContext.Provider>
  );
};

PerformDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PerformDataProvider;
