import React, { useContext } from 'react';
import ChartsLayout from './ChartsLayout';
import { ViewDataContext } from '../../contexts/ViewDataProvider';

const Space = () => {
  const { view } = useContext(ViewDataContext);
  return (
    <div>
      <ChartsLayout view={view} />
    </div>
  );
};

export default Space;
