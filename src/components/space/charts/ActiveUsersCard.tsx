import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import FaceIcon from '@mui/icons-material/Face';
import { CardContent, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import { ViewDataContext } from '../../context/ViewDataProvider';

const CustomRoot = styled(Card)(() => ({
  maxHeight: 150,
  marginBottom: 5,
  textAlign: 'right',
  margin: 20,
}));

const ActiveUsersCard = (): JSX.Element => {
  const { t } = useTranslation();
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  // get aggregate actions
  const {
    data: totalUsersData,
    isLoading: totalUsersDataIsLoading,
    isError: totalUsersDataIsError,
  } = hooks.useAggregateActions({
    itemId,
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    type: null,
    countGroupBy: ['user'],
    aggregateFunction: 'count',
    aggregateMetric: 'user',
    aggregateBy: [],
  });

  if (totalUsersDataIsLoading || totalUsersDataIsError) {
    return null;
  }

  const totalUsers = totalUsersData.get(0).aggregateResult;

  return (
    <>
      <CustomRoot variant="outlined">
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <FaceIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Total users')}
                <Typography variant="h5" component="div" align="center">
                  {totalUsers}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
      <CustomRoot variant="outlined">
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <FaceIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Users this month')}
                <Typography variant="h5" component="div" align="center">
                  --
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
      <CustomRoot variant="outlined">
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <FaceIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Users this week')}
                <Typography variant="h5" component="div" align="center">
                  --
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
      <CustomRoot variant="outlined">
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <FaceIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Users today')}
                <Typography variant="h5" component="div" align="center">
                  --
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
    </>
  );
};

export default ActiveUsersCard;
