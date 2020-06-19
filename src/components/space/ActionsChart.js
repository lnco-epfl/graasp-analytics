import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { getActionsByDay, formatActions } from '../../utils/api';
import { SpaceDataContext } from '../../contexts/SpaceDataProvider';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

function ActionsChart() {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const { actions } = useContext(SpaceDataContext);
  const actionsByDay = formatActions(getActionsByDay(actions));

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {t('Actions by Day')}
      </Typography>
      <ResponsiveContainer width="95%" height={450}>
        <BarChart
          data={actionsByDay}
          margin={{ top: 30, bottom: 20, left: 20, right: 20 }}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" name="Count" fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default ActionsChart;
