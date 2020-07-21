import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  USERS_API_ROUTE,
  CURRENT_USER_PARAMETER,
  buildUsersEndpoint,
  buildApiOptions,
} from '../api/graasp';

export const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [userId, setUserId] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const requestUrl = buildUsersEndpoint(
        baseUrl,
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

  return (
    <UserDataContext.Provider value={{ userId, error }}>
      {children}
    </UserDataContext.Provider>
  );
};

UserDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserDataProvider;
