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

import { Member } from '@graasp/sdk';

import { useAnalyticsTranslation } from '@/config/i18n';

import { DataContext } from '../../context/DataProvider';

const UsersSelect = (): JSX.Element | null => {
  const { t } = useAnalyticsTranslation();
  const { selectedUsers, setSelectedUsers, allMembers } =
    useContext(DataContext);

  if (!allMembers || !allMembers.length) {
    return null;
  }

  const handleChange = (event: SelectChangeEvent<Member[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(value as Member[]);
  };

  return (
    <Stack direction="row" alignItems="center" flexGrow={1} flexShrink={0}>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">
          {t('USERS_SELECT')}
        </InputLabel>
        <Select
          label={t('USERS_SELECT')}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedUsers}
          onChange={handleChange}
          // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected: Member[]) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
          )}
        >
          {allMembers.map((m) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <MenuItem key={m.id} value={m}>
              {m.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default UsersSelect;
