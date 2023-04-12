import React from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

import { GraaspLogo } from '@graasp/ui';

const Header = () => (
  <header>
    <AppBar position="static">
      <Toolbar>
        <GraaspLogo height={40} sx={{ fill: 'white' }} />
        <Typography variant="h6" color="inherit" mx={1}>
          Graasp
        </Typography>
      </Toolbar>
    </AppBar>
  </header>
);

export default Header;
