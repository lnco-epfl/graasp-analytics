import React from 'react';
import Charts from './Charts';
import ActionsDataProvider from '../../contexts/ActionsDataProvider';
import SubspaceDataProvider from '../../contexts/SubspaceDataProvider';

function Space() {
  return (
    <div>
      <SubspaceDataProvider>
        <ActionsDataProvider>
          <Charts />
        </ActionsDataProvider>
      </SubspaceDataProvider>
    </div>
  );
}

export default Space;
