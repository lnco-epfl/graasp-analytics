import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  DEFAULT_API_OPTIONS,
  SPACES_PARAMETER,
  buildSpacesEndpoint,
} from '../api/graasp';

export const SubspaceDataContext = createContext();

const SubspaceDataProvider = ({ children }) => {
  const [currentSpaceName, setCurrentSpaceName] = useState(null);
  const [spaceSubspaces, setSpaceSubspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id: currentSpaceId } = useParams();

  useEffect(() => {
    const fetchData = async (spaceId) => {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const requestUrl = buildSpacesEndpoint(
        baseUrl,
        SPACES_PARAMETER,
        spaceId,
      );
      try {
        const response = await fetch(requestUrl, DEFAULT_API_OPTIONS);
        if (!response.ok) {
          throw response;
        }
        const resolvedData = await response.json();
        const { subpages: returnedSubspaces, name } = resolvedData;
        setIsLoading(false);
        setCurrentSpaceName(name);
        setSpaceSubspaces(returnedSubspaces);
      } catch (error) {
        setIsLoading(false);
        setCurrentSpaceName('Space not found');
      }
    };
    fetchData(currentSpaceId);
  }, [currentSpaceId]);

  return (
    <SubspaceDataContext.Provider
      value={{
        currentSpaceName,
        spaceSubspaces: [...spaceSubspaces],
        isLoading,
      }}
    >
      {children}
    </SubspaceDataContext.Provider>
  );
};

SubspaceDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SubspaceDataProvider;
