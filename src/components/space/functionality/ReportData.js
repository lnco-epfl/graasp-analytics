import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import FaceIcon from '@mui/icons-material/Face';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

const CustomRoot = styled(Card)(() => ({
  maxHeight: 150,
  marginBottom: 5,
  textAlign: 'right',
}));

const ReportData = () => {
  const { t } = useTranslation();
  const { actions, allMembers } = useContext(DataContext);

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
                  {allMembers.size}
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
              <TouchAppIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Total actions')}
                <Typography variant="h5" component="div" align="center">
                  {actions.size}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
    </>
  );
};

export default ReportData;
