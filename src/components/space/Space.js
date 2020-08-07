import React from 'react';
import Charts from './Charts';
import UserDataProvider from '../../contexts/UserDataProvider';
import TaskDataProvider from '../../contexts/TaskDataProvider';
import SpaceDataProvider from '../../contexts/SpaceDataProvider';

function Space() {
  return (
    <div>
      <UserDataProvider>
        <TaskDataProvider>
          <SpaceDataProvider>
            <Charts />
          </SpaceDataProvider>
        </TaskDataProvider>
      </UserDataProvider>
    </div>
  );
}

export default Space;
