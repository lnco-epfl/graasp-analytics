import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import LightTooltip from '../../common/LightTooltip';
import { ViewDataContext } from '../../../contexts/ViewDataProvider';
import {
  COMPOSE_VIEW_STRING,
  LIVE_VIEW_STRING,
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

  return (
    <LightTooltip
      title={
        view === COMPOSE_VIEW_STRING
          ? t(
              "The 'compose' view displays analytics from the default Graasp space creation interface. The data below is sampled from this space and its subspaces.",
            )
          : t(
              "The 'live' view displays analytics from the standalone Graasp interface typically used by students to access a space. The data below is sampled from this space and its subspaces.",
            )
      }
      placement="left"
    >
      <div className={classes.root}>
        <Typography className={classes.typography}>
          {t('Select View:')}
        </Typography>
        <Select
          styles={customStyles}
          options={[
            {
              name: _.capitalize(COMPOSE_VIEW_STRING),
              value: COMPOSE_VIEW_STRING,
            },
            { name: _.capitalize(LIVE_VIEW_STRING), value: LIVE_VIEW_STRING },
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
