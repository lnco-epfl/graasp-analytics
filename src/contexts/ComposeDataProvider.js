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
  removeLearningAnalyticsUser,
  consolidateUsers,
  formatConsolidatedUsers,
  addValueKeyToUsers,
} from '../utils/api';
import { COMPOSE_VIEW_STRING } from '../config/constants';

export const ComposeDataContext = createContext();

const ComposeDataProvider = ({ children }) => {
  const [spaceName, setSpaceName] = useState(null);
  const [isLoadingComposeData, setIsLoadingComposeData] = useState(true);
  const [composeActions, setComposeActions] = useState([]);
  const [allComposeUsers, setAllComposeUsers] = useState([]);
  const [composeMetadata, setComposeMetadata] = useState({});
  const [composeFetchingError, setComposeFetchingError] = useState(null);
  const [composeUsersToFilter, setComposeUsersToFilter] = useState([]);
  const { spaceId } = useParams();

  useEffect(() => {
    const fetchComposeData = async () => {
      const requestUrl = buildAnalyticsEndpoint(
        REACT_APP_BASE_URL,
        RESEARCH_API_ROUTE,
        ANALYTICS_PARAMETER,
        spaceId,
        DEFAULT_REQUEST_SAMPLE_SIZE,
        COMPOSE_VIEW_STRING,
      );
      try {
        const response = await fetch(requestUrl, buildApiOptions('GET'));
        if (!response.ok) {
          throw response;
        }
        const resolvedData = await response.json();
        const mainSpaceName = extractMainSpace(resolvedData.spaceTree).name;
        const consolidatedUsers = addValueKeyToUsers(
          formatConsolidatedUsers(
            consolidateUsers(removeLearningAnalyticsUser(resolvedData.users)),
          ),
        );
        setSpaceName(mainSpaceName);
        setComposeActions(resolvedData.actions);
        setAllComposeUsers(consolidatedUsers);
        setComposeUsersToFilter(consolidatedUsers);
        setComposeMetadata(resolvedData.metadata);
        setIsLoadingComposeData(false);
      } catch (err) {
        setIsLoadingComposeData(false);
        setComposeFetchingError(err);
      }
    };
    fetchComposeData();
  }, [spaceId]);

  return (
    <ComposeDataContext.Provider
      value={{
        spaceName,
        isLoadingComposeData,
        composeActions,
        allComposeUsers,
        composeMetadata,
        composeFetchingError,
        composeUsersToFilter,
        setComposeUsersToFilter,
      }}
    >
      {children}
    </ComposeDataContext.Provider>
  );
};

ComposeDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ComposeDataProvider;
