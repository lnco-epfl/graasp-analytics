import PropTypes from 'prop-types';

import React from 'react';

import DataProvider from './DataProvider';
import ViewDataProvider from './ViewDataProvider';

const ContextsWrapper = ({ children }) => (
  <ViewDataProvider>
    <DataProvider>{children}</DataProvider>
  </ViewDataProvider>
);

ContextsWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextsWrapper;
