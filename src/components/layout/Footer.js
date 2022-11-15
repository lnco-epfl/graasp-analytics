import React from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => (
  <footer>
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
