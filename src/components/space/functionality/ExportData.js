import React, { useState } from 'react';
import { MUTATION_KEYS } from '@graasp/query-client';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import { Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import LightTooltip from '../../common/LightTooltip';
import { useMutation } from '../../../config/queryClient';

const useStyles = makeStyles((theme) => ({
  downloadButton: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  clickedButton: {
    color: theme.palette.primary.main,
    margin: theme.spacing(0, 2),
  },
}));

const ExportData = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);
  const { mutate: exportActions } = useMutation(MUTATION_KEYS.EXPORT_ACTIONS);
  const { itemId } = useParams();

  const onClick = () => {
    setClicked(true);
    exportActions(itemId);
  };

  if (clicked) {
    return (
      <LightTooltip
        title={t(
          'Your request has been sent. An email will be sent to you in several minutes.',
        )}
        placement="right"
        arrow
      >
        <DoneIcon fontSize="large" className={classes.clickedButton} />
      </LightTooltip>
    );
  }

  return (
    <LightTooltip
      title={t('Download the full dataset for this space')}
      placement="right"
      arrow
    >
      <Button onClick={onClick}>
        <CloudDownloadIcon
          fontSize="large"
          className={classes.downloadButton}
        />
      </Button>
    </LightTooltip>
  );
};

export default ExportData;
