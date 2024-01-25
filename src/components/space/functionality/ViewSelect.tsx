import { useContext } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import { Context } from '@graasp/sdk';

import { ActionViewContext } from '@/config/constants';
import { useAnalyticsTranslation, useEnumsTranslation } from '@/config/i18n';
import { SELECT_VIEW_ID, buildSelectViewId } from '@/config/selectors';

import { ViewDataContext } from '../../context/ViewDataProvider';

const CustomRoot = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ViewSelect = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const { t: enumT } = useEnumsTranslation();

  const { view, setView } = useContext(ViewDataContext);

  const handleChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    setView(value);
  };

  let viewMessage = '';
  switch (view) {
    case Context.Builder:
      viewMessage = t('VIEW_BUILDER_TOOLTIP');
      break;
    case Context.Player:
      viewMessage = t('VIEW_PLAYER_TOOLTIP');
      break;
    case Context.Library:
      viewMessage = t('VIEW_LIBRARY_TOOLTIP');
      break;
    default:
      break;
  }
  return (
    <CustomRoot container>
      <Grid ml={2} xs={8} item>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel id="viewLabel">{t('VIEWS_SELECT')}</InputLabel>
          <Select
            id={SELECT_VIEW_ID}
            label={t('VIEWS_SELECT')}
            labelId="viewLabel"
            value={view}
            onChange={handleChange}
            renderValue={(selected) => (
              <span style={{ textTransform: 'capitalize' }}>
                {enumT(selected)}
              </span>
            )}
          >
            {Object.values(ActionViewContext).map((c) => (
              <MenuItem
                key={c}
                sx={{ textTransform: 'capitalize' }}
                value={c}
                id={buildSelectViewId(c)}
              >
                {enumT(c)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item ml={2} mr={1}>
        <Tooltip title={viewMessage}>
          <InfoIcon color="primary" />
        </Tooltip>
      </Grid>
    </CustomRoot>
  );
};

export default ViewSelect;
