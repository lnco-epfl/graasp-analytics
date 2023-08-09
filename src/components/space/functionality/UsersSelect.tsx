import { List } from 'immutable';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Chip, FormControl, InputLabel, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

import { MemberRecord } from '@graasp/sdk/frontend';

import { DataContext } from '../../context/DataProvider';

const CustomRoot = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const UsersSelect = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { selectedUsers, setSelectedUsers, allMembers } =
    useContext(DataContext);

  if (!allMembers || !allMembers.size) {
    return null;
  }

  const handleChange = (event: SelectChangeEvent<MemberRecord[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(List(value as MemberRecord[]));
  };

  return (
    <CustomRoot container>
      <FormControl sx={{ m: 1, width: '90%' }}>
        <InputLabel id="demo-multiple-chip-label">{t('Users')}</InputLabel>
        <Select
          label={t('Users')}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedUsers.toArray()}
          onChange={handleChange}
          // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected: MemberRecord[]) => (
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
    </CustomRoot>
  );
};

export default UsersSelect;
