import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import LightTooltip from '../../common/LightTooltip';
import { ViewDataContext } from '../../context/ViewDataProvider';
import customStyles from '../../../styles/react-select-styles';
import { Context } from '../../../config/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
}));

const ViewSelect = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { view, setView } = useContext(ViewDataContext);
  const [selectedView, setSelectedView] = useState({
    name: _.capitalize(view),
    value: view,
  });

  const handleChange = (userSelection) => {
    setSelectedView(userSelection);
    setView(userSelection.value);
  };

  let viewMessage = '';
  switch (view) {
    case Context.BUILDER:
      viewMessage =
        "The 'builder' view displays analytics from the default Graasp item creation interface.";
      break;
    case Context.PLAYER:
      viewMessage =
        "The 'player' view displays analytics from the standalone Graasp interface typically used by students to access an item.";
      break;
    case Context.LIBRARY:
      viewMessage =
        "The 'library' view displays analytics from the standalone Graasp interface typically used by visualize resources.";
      break;
    default:
      break;
  }
  return (
    <LightTooltip
      title={t(viewMessage)}
      placement="left"
      className={classes.root}
    >
      <Grid container>
        <Grid item xs={2}>
          <Typography>{t('Select a View')}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Select
            styles={customStyles}
            options={Object.values(Context)
              // does not show analyzer
              .filter((context) => context !== Context.ANALYTICS)
              .map((context) => ({
                value: context,
                name: context,
              }))}
            closeMenuOnSelect
            hideSelectedOptions={false}
            getOptionLabel={(option) => option.name}
            value={selectedView}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </LightTooltip>
  );
};

export default ViewSelect;
