import React from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

import { GraaspLogo, Navigation } from '@graasp/ui';

import { Context } from '../../config/constants';

const Header = () => (
  <header>
    <AppBar position="static">
      <Toolbar>
        <GraaspLogo height={40} sx={{ fill: 'white' }} />
        <Typography variant="h6" color="inherit" mx={1}>
          Graasp
        </Typography>
        <Navigation currentValue={Context.ANALYTICS} />
      </Toolbar>
    </AppBar>
  </header>
);

export default Header;
