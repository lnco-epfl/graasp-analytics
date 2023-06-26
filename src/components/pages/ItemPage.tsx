import { useTranslation } from 'react-i18next';

import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ContextsWrapper from '../context/ContextsWrapper';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Navigator from '../layout/Navigator';
import Sidebar from '../sidebar/Sidebar';
import ChartsLayout from '../space/ChartsLayout';

const ItemPage = ({ isEmbeded }: { isEmbeded: boolean }): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();
  if (isEmbeded) {
    return (
      <main style={{ paddingTop: theme.spacing(2) }}>
        <ContextsWrapper>
          <ChartsLayout />
        </ContextsWrapper>
      </main>
    );
  }
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Navigator />
        <Grid container spacing={2}>
          <Grid item xs={1.5}>
            <Sidebar />
          </Grid>
          <Grid item xs={10.5}>
            <ContextsWrapper>
              <ChartsLayout />
            </ContextsWrapper>
            <div id="general">{t('General')}</div>
            <div id="contents">{t('Contents')}</div>
            <div id="actions">{t('Actions')}</div>
            <div id="chats">{t('Chats')}</div>
            <div id="apps">{t('Apps')}</div>
          </Grid>
        </Grid>
      </main>
      <Footer />
    </>
  );
};

export default ItemPage;
