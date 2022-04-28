import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

const Footer = () => {
  return (
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
};

export default Footer;
