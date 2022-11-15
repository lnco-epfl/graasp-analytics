import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';

import StyledAlert from '../common/StyledAlert';
import { DataContext } from '../context/DataProvider';
import { ViewDataContext } from '../context/ViewDataProvider';
import ChartsAlerts from './charts-layout/ChartsAlerts';
import ChartsArea from './charts-layout/ChartsArea';
import ChartsHeader from './charts-layout/ChartsHeader';

const ChartsLayout = () => {
  const { t } = useTranslation();
  const { view } = useContext(ViewDataContext);
  const { error } = useContext(DataContext);

  return (
    <div>
      <ChartsHeader />
      {error ? (
        <Box pl={2} pr={2} mb={2} flexGrow={1}>
          <StyledAlert severity="error">
            {t("There was an error retrieving this item's data.", { view })}
          </StyledAlert>
        </Box>
      ) : (
        <>
          <ChartsAlerts />
          <ChartsArea />
        </>
      )}
    </div>
  );
};

export default ChartsLayout;
