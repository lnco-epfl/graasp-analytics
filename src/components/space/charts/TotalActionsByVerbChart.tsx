import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import {
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { useAnalyticsTranslation } from '@/config/i18n';

import {
  DEFAULT_REQUEST_SAMPLE_SIZE,
  getColorForActionTriggerType,
} from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import ActionChartLabel from '../charts-layout/ActionChartLabel';
import EmptyChart from './EmptyChart';

const TotalActionsByVerbChart = (): JSX.Element | null => {
  const { t } = useAnalyticsTranslation();
  const { selectedActionTypes } = useContext(DataContext);
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  // get aggregate actions
  const {
    data: aggregateData,
    isLoading,
    isError,
  } = hooks.useAggregateActions(itemId, {
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    type: selectedActionTypes,
    countGroupBy: [CountGroupBy.User, CountGroupBy.ActionType],
    aggregateFunction: AggregateFunction.Sum,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.ActionType],
  });

  if (isLoading || isError) {
    return null;
  }

  const title = t('TOTAL_ACTIONS_DISTRIBUTIONS');
  if (!aggregateData?.length) {
    return <EmptyChart chartTitle={title} />;
  }

  const formattedAggregateData = aggregateData.map((d) => ({
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
  formattedAggregateData.push({
    actionCount: 0.0,
    type: t('OTHER_ACTION_TYPE'),
  });

  const formattedAggregateDataSorted = [...formattedAggregateData];
  formattedAggregateDataSorted.sort((a, b) =>
    (a?.type ?? 'Unknown').localeCompare(b.type ?? 'Unknown'),
  );

  return (
    <>
      <ChartTitle title={title} />
      <ChartContainer>
        <PieChart>
          <Pie
            data={formattedAggregateDataSorted}
            dataKey="actionCount"
            nameKey="type"
            label={ActionChartLabel}
            labelLine={false}
          >
            {formattedAggregateDataSorted.map((entry) => (
              <Cell
                key={entry.type}
                fill={getColorForActionTriggerType(entry.type)}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ChartContainer>
    </>
  );
};

export default TotalActionsByVerbChart;
