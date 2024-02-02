import { useContext } from 'react';

import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useAnalyticsTranslation } from '@/config/i18n';

import { DataContext } from '../../context/DataProvider';

const ActionsSelect = (): JSX.Element | null => {
  const { t } = useAnalyticsTranslation();
  // eslint-disable-next-line no-unused-vars
  const { actions, selectedActionTypes, setSelectedActionTypes } =
    useContext(DataContext);
  if (!actions?.length) {
    return null;
  }
  const allActions = [...new Set(actions.map((a) => a.type))];

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedActionTypes(Array.isArray(value) ? value : [value]);
  };
  return (
    <Stack direction="row" alignItems="center" flexGrow={1} flexShrink={0}>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">
          {t('ACTION_TYPES')}
        </InputLabel>
        <Select
          label={t('ACTION_TYPES')}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedActionTypes}
          // closeMenuOnSelect
          // hideSelectedOptions={false}
          // getOptionValue={(option) => option.name}
          // getOptionLabel={(option) => option.name}
          // value={selectedActionTypes}
          onChange={handleChange}
          // components={{
          //   ValueContainer: CustomValueContainer,
          // }}
          renderValue={(selected: string[]) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((a) => (
                <Chip key={a} label={a} />
              ))}
            </Box>
          )}
        >
          {allActions.map((a) => (
            <MenuItem key={a} value={a}>
              {a}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default ActionsSelect;
