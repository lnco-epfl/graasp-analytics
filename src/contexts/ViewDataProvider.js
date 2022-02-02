import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { BUILDER_VIEW_STRING } from '../config/constants';

export const ViewDataContext = createContext();

const ViewDataProvider = ({ children }) => {
  const [view, setView] = useState(BUILDER_VIEW_STRING);
  return (
    <ViewDataContext.Provider value={{ view, setView }}>
      {children}
    </ViewDataContext.Provider>
  );
};

ViewDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ViewDataProvider;
