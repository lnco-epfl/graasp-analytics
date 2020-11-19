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
import { LIVE_VIEW_STRING } from '../config/constants';

export const LiveDataContext = createContext();

const LiveDataProvider = ({ children }) => {
  const [isLoadingLiveData, setIsLoadingLiveData] = useState(true);
  const [liveActions, setLiveActions] = useState([]);
  const [allLiveUsers, setAllLiveUsers] = useState([]);
  const [liveMetadata, setLiveMetadata] = useState({});
  const [liveFetchingError, setLiveFetchingError] = useState(null);
  const [liveUsersToFilter, setLiveUsersToFilter] = useState([]);
  const { spaceId } = useParams();

  useEffect(() => {
    const fetchLiveData = async () => {
      const requestUrl = buildAnalyticsEndpoint(
        REACT_APP_BASE_URL,
        RESEARCH_API_ROUTE,
        ANALYTICS_PARAMETER,
        spaceId,
        DEFAULT_REQUEST_SAMPLE_SIZE,
        LIVE_VIEW_STRING,
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
        setLiveActions(resolvedData.actions);
        setAllLiveUsers(consolidatedUsers);
        setLiveUsersToFilter(consolidatedUsers);
        setLiveMetadata(resolvedData.metadata);
        setIsLoadingLiveData(false);
      } catch (err) {
        setIsLoadingLiveData(false);
        setLiveFetchingError(err);
      }
    };
    fetchLiveData();
  }, [spaceId]);

  return (
    <LiveDataContext.Provider
      value={{
        isLoadingLiveData,
        liveActions,
        allLiveUsers,
        liveMetadata,
        liveFetchingError,
        liveUsersToFilter,
        setLiveUsersToFilter,
      }}
    >
      {children}
    </LiveDataContext.Provider>
  );
};

LiveDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default LiveDataProvider;
