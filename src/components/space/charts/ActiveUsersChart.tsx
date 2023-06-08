import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const ActiveUsersChart = (): JSX.Element => {
  const { t } = useTranslation();
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  // get aggregate actions
  const {
    data: aggregateData,
    isLoading,
    isError,
  } = hooks.useAggregateActions({
    itemId,
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    type: null,
    countGroupBy: ['user', 'createdDay'],
    aggregateFunction: 'count',
    aggregateMetric: 'actionCount',
    aggregateBy: ['createdDay'],
  });

  if (isLoading || isError) {
    return null;
  }

  const title = 'Active Users by Day';
  if (aggregateData.size === 0) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  const formattedAggregateData = aggregateData
    .toArray()
    .sort((a, b) => a.createdDay.getTime() - b.createdDay.getTime())
    .map((d) => ({
      count: d.aggregateResult,
      date: `${d.createdDay.getDate()}-${
        d.createdDay.getMonth() + 1
      }-${d.createdDay.getFullYear()}`,
    }));

  const maxCount = formattedAggregateData.reduce(
    (max, cur) => Math.max(max, cur.count),
    0,
  );
  let yAxisMax;
  if (maxCount <= 100) {
    yAxisMax = Math.ceil(maxCount / 10) * 10;
  } else {
    yAxisMax = Math.ceil(maxCount / 100) * 100;
  }

  return (
    <>
      <ChartTitle title={t(title)} />
      <ChartContainer>
        <LineChart data={formattedAggregateData}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="date" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          <Legend />
          <Line
            dataKey="count"
            name={t('Count')}
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
};

export default ActiveUsersChart;
