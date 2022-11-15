import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { LOADER_TEXT_DELAY } from '../../config/constants';

const Loader = () => {
  const { t } = useTranslation();
  const [showAdditionalText, setShowAdditionalText] = useState(false);

  // after LOADER_TEXT_DELAY milliseconds, display 'still loading' text by changing state of showAdditionalText
  useEffect(() => {
    setTimeout(() => {
      setShowAdditionalText(true);
    }, LOADER_TEXT_DELAY);
  }, []);

  return (
    <Grid container>
      <Grid
        item
        sx={{
          textAlign: 'center',
          flex: 1,
          margin: 4,
        }}
      >
        <CircularProgress />
        {showAdditionalText && (
          <Typography variant="subtitle1">{t('Still loading...')}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Loader;
