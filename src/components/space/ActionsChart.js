import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { getActionsByDay, formatActions } from '../../utils/api';
import spaceData from '../../data/sample.json';

function ActionsChart() {
  const actionsByDay = formatActions(getActionsByDay(spaceData));

  return (
    <Container>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Actions by day
      </Typography>
      <BarChart
        width={620}
        height={450}
        data={actionsByDay}
        margin={{ top: 50, bottom: 20, left: 20, right: 20 }}
      >
        <CartesianGrid strokeDasharray="2" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Count" fill="#5050d2" />
      </BarChart>
    </Container>
  );
}

export default ActionsChart;
