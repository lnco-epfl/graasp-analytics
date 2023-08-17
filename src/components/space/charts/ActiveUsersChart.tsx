import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  DEFAULT_REQUEST_SAMPLE_SIZE,
  GENERAL_COLOR,
} from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const ActiveUsersChart = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { view } = useContext(ViewDataContext);
  const { selectedActionTypes } = useContext(DataContext);
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
    type: selectedActionTypes.toJS(),
    countGroupBy: [CountGroupBy.User, CountGroupBy.CreatedDay],
    aggregateFunction: AggregateFunction.Count,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.CreatedDay],
  });

  if (isLoading || isError) {
    return null;
  }

  const title = 'Active Users by Day';
  if (!aggregateData.size) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  const formattedAggregateData: { count: number; date: string }[] =
    aggregateData
      .toArray()
      .sort(
        (a: { createdDay: Date }, b: { createdDay: Date }) =>
          a.createdDay.getTime() - b.createdDay.getTime(),
      )
      .map((d: { aggregateResult: number; createdDay: Date }) => ({
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
            stroke={GENERAL_COLOR}
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
};

export default ActiveUsersChart;
