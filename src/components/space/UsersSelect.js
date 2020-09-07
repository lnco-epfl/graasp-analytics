import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { SpaceDataContext } from '../../contexts/SpaceDataProvider';
import CustomValueContainer from '../custom/CustomValueContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
  },
  typography: {
    marginRight: theme.spacing(1),
  },
}));

// custom styling used by react-select (deviates from material-ui approach used in rest of app)
const customStyles = {
  menu: () => ({
    width: '250px',
    border: 'solid 1px #dfe3e9',
    borderRadius: '4px',
    position: 'absolute',
    zIndex: 999999,
    backgroundColor: 'white',
    fontSize: '0.8rem',
  }),
  control: () => ({
    display: 'flex',
    minWidth: '250px',
    maxWidth: '600px',
    borderRadius: '4px',
    border: 'solid 1px #dfe3e9',
    fontSize: '0.8rem',
  }),
};

const UsersSelect = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { isLoading, allUsers, setUsersToFilter } = useContext(
    SpaceDataContext,
  );
  const [selectedUsers, setSelectedUsers] = useState([]);

  if (isLoading) {
    return null;
  }

  // custom option allowing us to select all users in the dropdown
  const allOption = {
    name: 'Select all',
    value: '*',
  };

  const handleChange = (selectedUser) => {
    setSelectedUsers(selectedUser);
    setUsersToFilter(selectedUser);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.typography}>
        {t('Filter by user:')}
      </Typography>
      <Select
        styles={customStyles}
        options={[allOption, ...allUsers]}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        allowSelectAll
        getOptionLabel={(option) => option.name}
        value={selectedUsers}
        onChange={(selected) => {
          if (
            selected !== null &&
            selected.length > 0 &&
            selected[selected.length - 1].value === allOption.value
          ) {
            return handleChange(allUsers);
          }
          return handleChange(selected);
        }}
        components={{
          ValueContainer: CustomValueContainer,
        }}
      />
    </div>
  );
};

export default UsersSelect;
