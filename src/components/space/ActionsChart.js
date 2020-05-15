import React from 'react';
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
import spaceData from '../../data/sample.json';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

function ActionsChart() {
  const theme = useTheme();
  const classes = useStyles();
  const actionsByDay = formatActions(getActionsByDay(spaceData));

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        Actions by day
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
