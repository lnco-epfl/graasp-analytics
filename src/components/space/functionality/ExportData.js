import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton, Tooltip } from '@mui/material';

import { MUTATION_KEYS } from '@graasp/query-client';

import { useMutation } from '../../../config/queryClient';

const ExportData = () => {
  const { t } = useTranslation();
  const [clicked, setClicked] = useState(false);
  const { mutate: exportActions } = useMutation(MUTATION_KEYS.EXPORT_ACTIONS);
  const { itemId } = useParams();

  const onClick = () => {
    setClicked(true);
    exportActions(itemId);
  };

  if (clicked) {
    return (
      <Tooltip
        title={t(
          'Your request has been sent. An email will be sent to you in several minutes.',
        )}
        placement="right"
        arrow
      >
        <DoneIcon sx={{ mx: 2 }} fontSize="large" color="primary" />
      </Tooltip>
    );
  }

  return (
    <Tooltip
      title={t('Download the full dataset for this space')}
      placement="right"
      arrow
    >
      <IconButton onClick={onClick} color="primary">
        <CloudDownloadIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default ExportData;
