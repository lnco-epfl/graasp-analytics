import { SyntheticEvent, useContext } from 'react';

import { Autocomplete, FormControl, Stack, TextField } from '@mui/material';

import { useActionsTranslation, useAnalyticsTranslation } from '@/config/i18n';

import { DataContext } from '../../context/DataProvider';

const ActionsSelect = (): JSX.Element | null => {
  const { t } = useAnalyticsTranslation();
  const { t: translateAction } = useActionsTranslation();
  const { actions, selectedActionTypes, setSelectedActionTypes } =
    useContext(DataContext);

  if (!actions?.length) {
    return null;
  }

  const allActions = [...new Set(actions.map((a) => a.type))].map((ele) => ({
    title: translateAction(ele),
    value: ele,
  }));

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    actions: { title: string; value: string }[],
  ) => {
    setSelectedActionTypes(actions.map((ele) => ele.value));
  };

  const value = allActions.filter(
    ({ value }) => selectedActionTypes.indexOf(value) > -1,
  );

  return (
    <Stack direction="row" alignItems="center" width="100%">
      <FormControl fullWidth>
        <Autocomplete
          onChange={handleChange}
          options={allActions}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} label={t('ACTION_TYPES')} />
          )}
          multiple
          value={value}
          limitTags={2}
        />
      </FormControl>
    </Stack>
  );
};

export default ActionsSelect;
