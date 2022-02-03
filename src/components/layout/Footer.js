import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

const Footer = () => {
  return (
    <footer>
      <AppBar position="static">
        <Toolbar>
          <Typography>© 2020 Graasp Association</Typography>
        </Toolbar>
      </AppBar>
    </footer>
  );
};

export default Footer;
