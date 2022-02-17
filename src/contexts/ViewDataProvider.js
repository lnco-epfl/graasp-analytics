import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { BUILDER_VIEW_STRING } from '../config/constants';

export const ViewDataContext = createContext();

const ViewDataProvider = ({ children }) => {
  const [view, setView] = useState(BUILDER_VIEW_STRING);
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
