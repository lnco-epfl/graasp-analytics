import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Context } from '@graasp/utils';

export const ViewDataContext = createContext();

const ViewDataProvider = ({ children }) => {
  const [view, setView] = useState(Context.BUILDER);
  const value = useMemo(() => ({ view, setView }), [view, setView]);
  return (
    <ViewDataContext.Provider value={value}>
      {children}
    </ViewDataContext.Provider>
  );
};

ViewDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ViewDataProvider;
