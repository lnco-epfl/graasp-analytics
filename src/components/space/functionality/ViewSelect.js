import capitalize from 'lodash.capitalize';

import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import InfoIcon from '@mui/icons-material/Info';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { Context } from '../../../config/constants';
import customStyles from '../../../styles/react-select-styles';
import { ViewDataContext } from '../../context/ViewDataProvider';

const CustomRoot = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ViewSelect = () => {
  const { t } = useTranslation();

  const { view, setView } = useContext(ViewDataContext);
  const [selectedView, setSelectedView] = useState({
    name: capitalize(view),
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
    <CustomRoot container>
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
      <Grid item>
        <Tooltip tooltip={viewMessage}>
          <InfoIcon />
        </Tooltip>
      </Grid>
    </CustomRoot>
  );
};

export default ViewSelect;
