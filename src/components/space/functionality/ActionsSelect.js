import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { List } from 'immutable';
import Select from 'react-select';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DataContext } from '../../context/DataProvider';
import customStyles from '../../../styles/react-select-styles';
import CustomValueContainer from '../../custom/CustomValueContainer';
import { groupBy } from '../../../utils/array';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
}));

const ActionsSelect = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const { actions, selectedActions, setSelectedActions } =
    useContext(DataContext);
  if (!actions || !actions.size) {
    return null;
  }
  const allActions = Object.keys(groupBy('actionType', actions)).map(
    (action) => ({
      name: action,
      value: action,
    }),
  );
  const allOption = {
    name: t('Select All'),
    value: '*',
  };

  const handleChange = (selectedAction) => {
    setSelectedActions(List(selectedAction));
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={2}>
        <Typography>{t('Select Action(s)')}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Select
          styles={customStyles}
          options={[allOption, ...allActions]}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          getOptionValue={(option) => option.name}
          getOptionLabel={(option) => option.name}
          value={selectedActions.toArray()}
          onChange={(selected) => {
            if (
              selected !== null &&
              selected.size > 0 &&
              selected[selected.size - 1].value === allOption.value
            ) {
              return handleChange(allActions);
            }
            return handleChange(selected);
          }}
          components={{
            ValueContainer: CustomValueContainer,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ActionsSelect;
