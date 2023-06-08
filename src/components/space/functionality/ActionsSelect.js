import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import customStyles from '../../../styles/react-select-styles';
import { groupBy } from '../../../utils/array';
import { DataContext } from '../../context/DataProvider';
import CustomValueContainer from '../../custom/CustomValueContainer';

const CustomRoot = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ActionsSelect = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const { actions, selectedActions, setSelectedActions } =
    useContext(DataContext);
  if (!actions || !actions.size) {
    return null;
  }
  const allActions = Object.keys(groupBy('type', actions)).map((action) => ({
    name: action,
    value: action,
  }));

  const allOption = {
    name: t('Select All'),
    value: null,
  };

  const handleChange = (selectedAction) => {
    setSelectedActions(selectedAction);
  };

  return (
    <CustomRoot container>
      <Grid item xs={2}>
        <Typography>{t('Select Action(s)')}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Select
          styles={customStyles}
          options={[allOption, ...allActions]}
          isMulti={false}
          closeMenuOnSelect
          hideSelectedOptions={false}
          getOptionValue={(option) => option.name}
          getOptionLabel={(option) => option.name}
          value={selectedActions}
          onChange={(selected) => handleChange(selected)}
          components={{
            ValueContainer: CustomValueContainer,
          }}
        />
      </Grid>
    </CustomRoot>
  );
};

export default ActionsSelect;
