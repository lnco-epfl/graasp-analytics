import { useState } from 'react';
import { useParams } from 'react-router-dom';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DoneIcon from '@mui/icons-material/Done';
import LoadingButton from '@mui/lab/LoadingButton';
import { Tooltip } from '@mui/material';

import { useAnalyticsTranslation } from '@/config/i18n';

import { mutations } from '../../../config/queryClient';

const ExportData = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const [clicked, setClicked] = useState(false);
  const { mutate: exportActions, isLoading } = mutations.useExportActions();
  const { itemId } = useParams();

  const onClick = () => {
    if (itemId) {
      setClicked(true);
      exportActions(itemId);
    }
  };

  return (
    <Tooltip
      title={clicked ? t('EXPORT_SUCCESS_MESSAGE') : t('EXPORT_TOOLTIP')}
      placement="right"
      arrow
    >
      <LoadingButton
        onClick={onClick}
        variant="contained"
        endIcon={clicked ? <DoneIcon /> : <CloudDownloadIcon />}
        disabled={clicked}
        loading={isLoading}
        size="large"
      >
        {t('EXPORT_ITEM_DATASET')}
      </LoadingButton>
    </Tooltip>
  );
};

export default ExportData;
