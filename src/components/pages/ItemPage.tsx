import { useTheme } from '@mui/material/styles';

import ContextsWrapper from '../context/ContextsWrapper';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Navigator from '../navigator/Navigator';
import ChartsLayout from '../space/ChartsLayout';

const ItemPage = ({ isEmbeded }: { isEmbeded: boolean }) => {
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
      <Navigator />
      <main style={{ flex: 1 }}>
        <ContextsWrapper>
          <ChartsLayout />
        </ContextsWrapper>
      </main>
      <Footer />
    </>
  );
};

export default ItemPage;
