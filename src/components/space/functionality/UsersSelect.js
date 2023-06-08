import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import customStyles from '../../../styles/react-select-styles';
import { DataContext } from '../../context/DataProvider';
import CustomValueContainer from '../../custom/CustomValueContainer';

const CustomRoot = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const UsersSelect = () => {
  const { t } = useTranslation();
  const { selectedUsers, setSelectedUsers, allMembers } =
    useContext(DataContext);

  if (!allMembers || !allMembers.size) {
    return null;
  }

  const handleChange = (selectedUser) => {
    setSelectedUsers(selectedUser);
  };

  return (
    <CustomRoot container>
      <Grid item xs={2}>
        <Typography>{t('Select User')}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Select
          styles={customStyles}
          options={allMembers.toArray()}
          isMulti={false}
          closeMenuOnSelect
          hideSelectedOptions={false}
          getOptionValue={(option) => option.name}
          getOptionLabel={(option) => option.name}
          value={selectedUsers}
          onChange={(selected) => handleChange(selected)}
          components={{
            ValueContainer: CustomValueContainer,
          }}
        />
      </Grid>
    </CustomRoot>
  );
};

export default UsersSelect;
