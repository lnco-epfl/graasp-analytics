import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

import { COLORS, DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const TotalActionsByVerbChart = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { selectedActionTypes } = useContext(DataContext);
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
    type: selectedActionTypes.toJS(),
    countGroupBy: [CountGroupBy.User, CountGroupBy.ActionType],
    aggregateFunction: AggregateFunction.Sum,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.ActionType],
  });

  if (isLoading || isError) {
    return null;
  }

  const title = 'Total Actions Distributions';
  if (!aggregateData.size) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  const formattedAggregateData: { actionCount: number; type: string }[] =
    aggregateData
      .toArray()
      .map((d: { aggregateResult: number; actionType: string }) => ({
        actionCount: d.aggregateResult,
        type: d.actionType,
      }));

  const totalActions = formattedAggregateData.reduce(
    (sum, cur) => sum + cur.actionCount,
    0,
  );

  formattedAggregateData.forEach((d) => {
    // eslint-disable-next-line no-param-reassign
    d.actionCount = parseFloat(
      ((d.actionCount / totalActions) * 100).toFixed(2),
    );
  });
  formattedAggregateData.push({ actionCount: 0.0, type: 'other' });

  formattedAggregateData.sort((a, b) => a.type.localeCompare(b.type));

  return (
    <>
      <ChartTitle title={t(title)} />
      <ChartContainer>
        <PieChart>
          <Pie
            data={formattedAggregateData}
            dataKey="actionCount"
            nameKey="type"
            fill="#82ca9d"
            label={({ value }) => `${value}%`}
          >
            {formattedAggregateData.map((entry, index) => (
              <Cell key={entry.type} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ChartContainer>
    </>
  );
};

export default TotalActionsByVerbChart;
