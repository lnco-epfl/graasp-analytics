import { useState } from 'react';
import { useParams } from 'react-router-dom';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton, Tooltip } from '@mui/material';

import { useAnalyticsTranslation } from '@/config/i18n';

import { mutations } from '../../../config/queryClient';

const ExportData = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
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
      <Tooltip title={t('EXPORT_SUCCESS_MESSAGE')} placement="right" arrow>
        <DoneIcon fontSize="large" color="primary" />
      </Tooltip>
    );
  }

  return (
    <Tooltip title={t('EXPORT_TOOLTIP')} placement="right" arrow>
      <IconButton onClick={onClick} color="primary">
        <CloudDownloadIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default ExportData;
