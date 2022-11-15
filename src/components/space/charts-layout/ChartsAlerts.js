import React, { useContext } from 'react';
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

const AlertsTooltip = styled(({ theme }) => ({
  tooltip: {
    fontSize: '11px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    marginRight: theme.spacing(1),
  },
}))(Tooltip);

const ChartsAlerts = () => {
  const { t } = useTranslation();
  const { view, requestedSampleSize } = useContext(ViewDataContext);
  const { numActionsRetrieved } = useContext(DataContext);

  const displayWarningMessage = () => {
    if (numActionsRetrieved === 0) {
      return (
        <StyledAlert severity="warning">
          {t('This item does not have any actions yet.', {
            view,
          })}
        </StyledAlert>
      );
    }
    return null;
  };

  // adding a tooltip to an Alert is tricky; this hack uses the Alert's built-in 'action' prop to do this
  // eslint-disable-next-line react/jsx-wrap-multilines
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

  const displaySampleInfo = () => {
    if (numActionsRetrieved > 0) {
      return (
        // TODO: implement maxTreeLengthExceeded to show message if depth is capped
        <StyledAlert severity="info" action={action}>
          {t('The charts below display a sample of actions from this item.', {
            view,
            numActionsRetrieved,
            requestedSampleSize,
          })}
        </StyledAlert>
      );
    }
    return null;
  };

  return (
    <StyledRoot>
      {displayWarningMessage()}
      {displaySampleInfo()}
    </StyledRoot>
  );
};

export default ChartsAlerts;
