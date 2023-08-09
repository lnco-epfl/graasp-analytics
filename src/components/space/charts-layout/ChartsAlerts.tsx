import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Info from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import StyledAlert from '../../common/StyledAlert';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';

const StyledRoot = styled('div')(({ theme }) => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const AlertsTooltip = styled(Tooltip)(({ theme }) => ({
  tooltip: {
    fontSize: '11px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    marginRight: theme.spacing(1),
  },
}));

const ChartsAlerts = (): JSX.Element => {
  const { t } = useTranslation();
  const { view } = useContext(ViewDataContext);
  const { requestedSampleSize } = useContext(DataContext);

  // adding a tooltip to an Alert is tricky; this hack uses the Alert's built-in 'action' prop to do this
  const action = (
    <AlertsTooltip
      title={t(
        'By default, only a sample of actions is requested and displayed in the charts below, in order to provide a general overview of activity in this item.',
        { requestedSampleSize },
      )}
      placement="left"
    >
      <Info fontSize="small" />
    </AlertsTooltip>
  );

  const displaySampleInfo = () => (
    // TODO: implement maxTreeLengthExceeded to show message if depth is capped
    <StyledAlert severity="info" action={action}>
      {t('The charts below display a sample of actions from this item.', {
        view,
        requestedSampleSize,
      })}
    </StyledAlert>
  );

  return <StyledRoot>{displaySampleInfo()}</StyledRoot>;
};

export default ChartsAlerts;
