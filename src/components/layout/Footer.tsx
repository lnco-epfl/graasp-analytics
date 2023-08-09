import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = (): JSX.Element => (
  <footer style={{ width: '100%' }}>
    <AppBar position="static">
      <Toolbar>
        <Typography>
          {`© ${new Date().getFullYear()} Graasp Association`}
        </Typography>
      </Toolbar>
    </AppBar>
  </footer>
);

export default Footer;
