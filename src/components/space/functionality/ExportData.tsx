import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton, Tooltip } from '@mui/material';

import { mutations } from '../../../config/queryClient';

const ExportData = (): JSX.Element => {
  const { t } = useTranslation();
  const [clicked, setClicked] = useState(false);
  const { mutate: exportActions } = mutations.useExportActions();
  const { itemId } = useParams();

  const onClick = () => {
    if (itemId) {
      setClicked(true);
      exportActions(itemId);
    }
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
      <IconButton sx={{ ml: 2 }} onClick={onClick} color="primary">
        <CloudDownloadIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default ExportData;
