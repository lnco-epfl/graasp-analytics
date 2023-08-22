import QueryStatsIcon from '@mui/icons-material/QueryStats';

import { useAnalyticsTranslation } from '@/config/i18n';

import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Navigator from '../layout/Navigator';

const ShareItemPage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  return (
    <>
      <Header />
      <Navigator />
      <main
        style={{
          flex: 1,
          textAlign: 'center',
          padding: '100px',
        }}
      >
        <QueryStatsIcon fontSize="large" />
        <h1>{t('HOME_MESSAGE')}</h1>
      </main>
      <Footer />
    </>
  );
};

export default ShareItemPage;
