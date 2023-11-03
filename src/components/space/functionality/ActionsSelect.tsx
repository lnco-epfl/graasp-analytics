import { useContext } from 'react';

import { Box, Chip, FormControl, InputLabel, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

import { useAnalyticsTranslation } from '@/config/i18n';

import { DataContext } from '../../context/DataProvider';

const CustomRoot = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

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
    <CustomRoot container>
      <FormControl sx={{ m: 1, width: '90%' }}>
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
    </CustomRoot>
  );
};

export default ActionsSelect;
