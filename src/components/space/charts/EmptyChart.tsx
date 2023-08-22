import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { useAnalyticsTranslation } from '@/config/i18n';

import { CONTAINER_HEIGHT } from '../../../config/constants';
import ChartTitle from '../../common/ChartTitle';
import SelectContainer from '../../common/SelectContainer';

const EmptyChartAlert = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: `${CONTAINER_HEIGHT}px`,
});

type Props = {
  chartTitle: string;
  selectFilter?: JSX.Element;
};

const EmptyChart = ({ chartTitle, selectFilter }: Props): JSX.Element => {
  const { t } = useAnalyticsTranslation();

  const message = t('NO_ACTIONS_TO_SHOW_FOR_THIS_USER');

  return (
    <>
      <ChartTitle title={t(chartTitle)} />
      {selectFilter && <SelectContainer>{selectFilter}</SelectContainer>}
      <EmptyChartAlert>
        <Typography>{message}</Typography>
      </EmptyChartAlert>
    </>
  );
};

export default EmptyChart;
