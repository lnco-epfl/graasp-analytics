import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import InfoIcon from '@mui/icons-material/Info';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import { Context } from '@graasp/sdk';

import { ViewDataContext } from '../../context/ViewDataProvider';

const CustomRoot = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ViewSelect = (): JSX.Element => {
  const { t } = useTranslation();

  const { view, setView } = useContext(ViewDataContext);

  const handleChange = ({ target: { value } }: SelectChangeEvent<Context>) => {
    setView(value as Context);
  };

  let viewMessage = '';
  switch (view) {
    case Context.Builder:
      viewMessage =
        "The 'builder' view displays analytics from the default Graasp item creation interface.";
      break;
    case Context.Player:
      viewMessage =
        "The 'player' view displays analytics from the standalone Graasp interface typically used by students to access an item.";
      break;
    case Context.Library:
      viewMessage =
        "The 'library' view displays analytics from the standalone Graasp interface typically used by visualize resources.";
      break;
    case Context.Unknown:
      viewMessage =
        "The 'unknown' view groups all the other actions that might happen outside of the Graasp interfaces.";
      break;
    default:
      break;
  }
  return (
    <CustomRoot container>
      <Grid ml={2} xs={8} item>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel id="viewLabel">{t('View')}</InputLabel>
          <Select
            label={t('View')}
            labelId="viewLabel"
            value={view}
            onChange={handleChange}
            renderValue={(selected) => (
              <span style={{ textTransform: 'capitalize' }}>{selected}</span>
            )}
          >
            {Object.values(Context)
              // does not show analytics
              .filter((context) => context !== Context.Analytics)
              .map((c) => (
                <MenuItem
                  sx={{ textTransform: 'capitalize' }}
                  key={c}
                  value={c}
                >
                  {c}
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
