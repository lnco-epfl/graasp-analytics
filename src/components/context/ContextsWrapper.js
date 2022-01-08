import React from 'react';
import PropTypes from 'prop-types';
import ViewDataProvider from '../../contexts/ViewDataProvider';
import UserDataProvider from '../../contexts/UserDataProvider';
import TaskDataProvider from '../../contexts/TaskDataProvider';
import BuilderDataProvider from '../../contexts/BuilderDataProvider';
import PlayerDataProvider from '../../contexts/PlayerDataProvider';
import ExplorerDataProvider from '../../contexts/ExplorerDataProvider';

const ContextsWrapper = ({ children }) => {
  return (
    <ViewDataProvider>
      <UserDataProvider>
        <TaskDataProvider>
          <BuilderDataProvider>
            <PlayerDataProvider>
              <ExplorerDataProvider>{children}</ExplorerDataProvider>
            </PlayerDataProvider>
          </BuilderDataProvider>
        </TaskDataProvider>
      </UserDataProvider>
    </ViewDataProvider>
  );
};

ContextsWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextsWrapper;
