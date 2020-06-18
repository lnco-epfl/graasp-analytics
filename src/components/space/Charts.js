import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import ChartsHeader from './ChartsHeader';
import ActionsChart from './ActionsChart';
import ActionsMap from './ActionsMap';
import Loader from '../common/Loader';
import { ActionsDataContext } from '../../contexts/ActionsDataProvider';

function Charts() {
  const { actions, error, isLoading } = useContext(ActionsDataContext);
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <div>
        <ChartsHeader />
        <div>
          <Loader />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <ChartsHeader status={t('This space does not exist.')} />
      </div>
    );
  }
  if (!isLoading && actions.length === 0) {
    return (
      <div>
        <ChartsHeader status={t('This space does not have any actions yet.')} />
      </div>
    );
  }
  return (
    <div>
      <ChartsHeader />
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <ActionsChart />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <ActionsMap />
        </Grid>
      </Grid>
    </div>
  );
}

export default Charts;
