import { SyntheticEvent, useContext } from 'react';

import { Autocomplete, FormControl, Stack, TextField } from '@mui/material';

import { useAnalyticsTranslation } from '@/config/i18n';

import { DataContext } from '../../context/DataProvider';

const ActionsSelect = (): JSX.Element | null => {
  const { t } = useAnalyticsTranslation();
  const { actions, selectedActionTypes, setSelectedActionTypes } =
    useContext(DataContext);

  if (!actions?.length) {
    return null;
  }
  const allActions = [...new Set(actions.map((a) => a.type))];

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    actions: string[],
  ) => {
    setSelectedActionTypes(actions);
  };
  return (
    <Stack direction="row" alignItems="center" width="100%">
      <FormControl fullWidth>
        <Autocomplete
          onChange={handleChange}
          options={allActions}
          renderInput={(params) => (
            <TextField {...params} label={t('ACTION_TYPES')} />
          )}
          multiple
          value={selectedActionTypes}
          limitTags={2}
        />
      </FormControl>
    </Stack>
  );
};

export default ActionsSelect;
