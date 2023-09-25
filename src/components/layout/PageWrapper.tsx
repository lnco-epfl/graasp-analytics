import { Box } from '@mui/material';

import Footer from './Footer';
import Header from './Header';
import Navigator from './Navigator';

const PageWrapper = ({ children }: { children: JSX.Element }): JSX.Element => (
  <>
    <Header />
    <Box width="100%">
      <Navigator />
    </Box>
    {children}
    <Footer />
  </>
);
export default PageWrapper;
