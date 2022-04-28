import React from 'react';
import PropTypes from 'prop-types';
import ViewDataProvider from './ViewDataProvider';
import DataProvider from './DataProvider';

const ContextsWrapper = ({ children }) => {
  return (
    <ViewDataProvider>
      <DataProvider>{children}</DataProvider>
    </ViewDataProvider>
  );
};

ContextsWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextsWrapper;
