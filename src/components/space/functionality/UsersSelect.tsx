import { SyntheticEvent, useContext } from 'react';

import { Autocomplete, FormControl, Stack, TextField } from '@mui/material';

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

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    member: Member[],
  ) => {
    setSelectedUsers(member);
  };

  return (
    <Stack direction="row" alignItems="center" width="100%">
      <FormControl fullWidth>
        <Autocomplete
          multiple
          value={selectedUsers}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} label={t('USERS_SELECT')} />
          )}
          getOptionLabel={(option) => option.name}
          options={allMembers}
          limitTags={2}
        />
      </FormControl>
    </Stack>
  );
};

export default UsersSelect;
