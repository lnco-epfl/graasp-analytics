import React from 'react';
import { GraaspLogo, Navigation } from '@graasp/ui';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  logo: {
    fill: 'white',
  },
  button: {
    marginLeft: theme.spacing(2),
    border: 'white 1px solid',

    '&:hover': {
      border: 'grey 1px solid',
    },
  },
  title: {
    marginLeft: theme.spacing(1),
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <GraaspLogo height={40} className={classes.logo} />
          <Typography variant="h5" color="inherit" className={classes.title}>
            Graasp
          </Typography>
          <Navigation
            currentValue={Context.ANALYTICS}
            buttonClassname={classes.button}
          />
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
