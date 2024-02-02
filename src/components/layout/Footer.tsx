import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = (): JSX.Element => (
  <footer
    style={{
      width: '100%',
      position: 'fixed',
      bottom: 0,
      left: 0,
      zIndex: 1100,
    }}
  >
    <AppBar position="sticky">
      <Toolbar>
        <Typography>
          {`© ${new Date().getFullYear()} Graasp Association`}
        </Typography>
      </Toolbar>
    </AppBar>
  </footer>
);

export default Footer;
