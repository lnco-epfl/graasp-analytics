import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CustomValueContainer from '../../custom/CustomValueContainer';
import customStyles from '../../../styles/react-select-styles';

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

const UsersSelect = ({ view, allUsers, setUsersToFilter }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [selectedUsers, setSelectedUsers] = useState([]);

  // custom option allowing us to select all users in the dropdown
  const allOption = {
    name: t('Select All'),
    value: '*',
  };

  // resets the display in the Select component below when the selected view is changed
  useEffect(() => {
    setSelectedUsers([]);
    setUsersToFilter(allUsers);
  }, [view, setUsersToFilter, allUsers]);

  const handleChange = (selectedUser) => {
    setSelectedUsers(selectedUser);
    setUsersToFilter(selectedUser);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.typography}>
        {t('Filter by User:')}
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

UsersSelect.propTypes = {
  view: PropTypes.string.isRequired,
  allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  setUsersToFilter: PropTypes.func.isRequired,
};

export default UsersSelect;
