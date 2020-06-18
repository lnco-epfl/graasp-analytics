import React from 'react';
import Charts from './Charts';
import SpaceDataProvider from '../../contexts/SpaceDataProvider';

function Space() {
  return (
    <div>
      <SpaceDataProvider>
        <Charts />
      </SpaceDataProvider>
    </div>
  );
}

export default Space;
