import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import LightTooltip from '../../common/LightTooltip';
import { ViewDataContext } from '../../../contexts/ViewDataProvider';
import {
  BUILDER_VIEW_STRING,
  PLAYER_VIEW_STRING,
  EXPLORER_VIEW_STRING,
} from '../../../config/constants';
import customStyles from '../../../styles/react-select-styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  typography: {
    marginRight: theme.spacing(1),
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
  if (view === BUILDER_VIEW_STRING) {
    viewMessage =
      "The 'builder' view displays analytics from the default Graasp item creation interface.";
  } else if (view === PLAYER_VIEW_STRING) {
    viewMessage =
      "The 'player' view displays analytics from the standalone Graasp interface typically used by students to access an item.";
  } else if (view === EXPLORER_VIEW_STRING) {
    viewMessage =
      "The 'explore' view displays analytics from the standalone Graasp interface typically used by visualize resources.";
  }
  return (
    <LightTooltip title={t(viewMessage)} placement="left">
      <div className={classes.root}>
        <Typography className={classes.typography}>
          {t('Select View:')}
        </Typography>
        <Select
          styles={customStyles}
          options={[
            {
              name: _.capitalize(BUILDER_VIEW_STRING),
              value: BUILDER_VIEW_STRING,
            },
            {
              name: _.capitalize(PLAYER_VIEW_STRING),
              value: PLAYER_VIEW_STRING,
            },
            {
              name: _.capitalize(EXPLORER_VIEW_STRING),
              value: EXPLORER_VIEW_STRING,
            },
          ]}
          closeMenuOnSelect
          hideSelectedOptions={false}
          getOptionLabel={(option) => option.name}
          value={selectedView}
          onChange={handleChange}
        />
      </div>
    </LightTooltip>
  );
};

export default ViewSelect;
