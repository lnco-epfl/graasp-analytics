import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FaceIcon from '@material-ui/icons/Face';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { DataContext } from '../../context/DataProvider';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 300,
    maxHeight: 150,
    marginBottom: 5,
    textAlign: 'right',
  },
}));

const ReportData = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { actions, allMembers } = useContext(DataContext);

  return (
    <>
      <Card variant="outlined" className={classes.root}>
        <CardContent>
          <Grid container>
            <Grid item xs={3}>
              <FaceIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography align="center">
                {t('Total participants')}:
                <Typography variant="h5" component="div" align="center">
                  {allMembers.size}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card variant="outlined" className={classes.root}>
        <CardContent>
          <Grid container>
            <Grid item xs={3}>
              <TouchAppIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography align="center">
                {t('Total actions')}:
                <Typography variant="h5" component="div" align="center">
                  {actions.size}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ReportData;
