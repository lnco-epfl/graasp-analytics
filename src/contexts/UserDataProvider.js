import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  USERS_API_ROUTE,
  CURRENT_USER_PARAMETER,
  buildUsersEndpoint,
  buildApiOptions,
} from '../api/graasp';
import { REACT_APP_API_HOST } from '../config/env';

export const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [userId, setUserId] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const requestUrl = buildUsersEndpoint(
        REACT_APP_API_HOST,
        USERS_API_ROUTE,
        CURRENT_USER_PARAMETER,
      );
      try {
        const response = await fetch(requestUrl, buildApiOptions('GET'));
        if (!response.ok) {
          throw response;
        }
        const { id } = await response.json();
        setUserId(id);
      } catch (err) {
        setError(err);
      }
    };
    fetchUser();
  }, []);

  const value = useMemo(() => ({ userId, error }), [userId, error]);

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

UserDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserDataProvider;
