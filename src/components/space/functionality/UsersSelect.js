import { List } from 'immutable';

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

  // custom option allowing us to select all users in the dropdown
  const allOption = {
    name: t('Select All'),
    value: '*',
  };

  const handleChange = (selectedUser) => {
    setSelectedUsers(List(selectedUser));
  };

  return (
    <CustomRoot container>
      <Grid item xs={2}>
        <Typography>{t('Select User(s)')}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Select
          styles={customStyles}
          options={[allOption, ...allMembers.toArray()]}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          getOptionValue={(option) => option.name}
          getOptionLabel={(option) => option.name}
          value={selectedUsers.toArray()}
          onChange={(selected) => {
            if (
              // in the dropdown, say the option 'Option A' then the option 'Select All' are chosen
              // the 'selected' argument in this function would be [{"name": "Option A", value: "Option A"}, {name: "Select All", value: "*"}]
              // hence the third condition below: always check the last item in this array - if it's the Select All option, then handleChange(allItemTypes)
              // the other two conditions prevent the following errors occuring:
              // (selected !== null): when multiple options are selected THEN removed, 'selected' here becomes null - hence selected[selected.size - 1].value fails
              // (selected.size > 0): when multiple options are being selected, there are 'transitions' where 'selected' here becomes [] - and again [].value fails
              // (to see the errors, comment out 1 or more of the conditions)
              selected !== null &&
              selected.size > 0 &&
              selected[selected.size - 1].value === allOption.value
            ) {
              return handleChange(allMembers);
            }
            return handleChange(selected);
          }}
          components={{
            ValueContainer: CustomValueContainer,
          }}
        />
      </Grid>
    </CustomRoot>
  );
};

export default UsersSelect;
