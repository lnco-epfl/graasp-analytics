import React from 'react';
import PropTypes from 'prop-types';
import ViewDataProvider from '../../contexts/ViewDataProvider';
import UserDataProvider from '../../contexts/UserDataProvider';
import TaskDataProvider from '../../contexts/TaskDataProvider';
import ComposeDataProvider from '../../contexts/ComposeDataProvider';
import LiveDataProvider from '../../contexts/LiveDataProvider';

const ContextsWrapper = ({ children }) => {
  return (
    <ViewDataProvider>
      <UserDataProvider>
        <TaskDataProvider>
          <ComposeDataProvider>
            <LiveDataProvider>{children}</LiveDataProvider>
          </ComposeDataProvider>
        </TaskDataProvider>
      </UserDataProvider>
    </ViewDataProvider>
  );
};

ContextsWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextsWrapper;
