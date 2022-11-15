import PropTypes from 'prop-types';

import React, { createContext, useMemo, useState } from 'react';

import { Context } from '../../config/constants';

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
