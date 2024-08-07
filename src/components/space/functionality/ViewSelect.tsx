import { useContext } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import { Context } from '@graasp/sdk';

import { ActionViewContext } from '@/config/constants';
import { useAnalyticsTranslation, useEnumsTranslation } from '@/config/i18n';
import {
  SELECT_VIEW_ID,
  SELECT_VIEW_RENDERED_TEXT_ID,
  buildSelectViewId,
} from '@/config/selectors';

import { ViewDataContext } from '../../context/ViewDataProvider';

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
    <Stack
      direction="row"
      alignItems="center"
      width="100%"
      spacing={1}
      maxWidth={{ xs: '100%', sm: '300px' }}
    >
      <FormControl fullWidth>
        <InputLabel id="viewLabel">{t('VIEWS_SELECT')}</InputLabel>
        <Select
          id={SELECT_VIEW_ID}
          label={t('VIEWS_SELECT')}
          labelId="viewLabel"
          value={view}
          onChange={handleChange}
          renderValue={(selected) => (
            <span
              id={SELECT_VIEW_RENDERED_TEXT_ID}
              style={{ textTransform: 'capitalize' }}
            >
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
      <Tooltip title={viewMessage}>
        <InfoIcon color="primary" />
      </Tooltip>
    </Stack>
  );
};

export default ViewSelect;
