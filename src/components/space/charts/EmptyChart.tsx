import { useTranslation } from 'react-i18next';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

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
  const { t } = useTranslation();

  const message = t('No actions to show for this user');

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
