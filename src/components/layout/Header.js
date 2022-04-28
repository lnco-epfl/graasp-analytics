import React from 'react';
import { GraaspLogo } from '@graasp/ui';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  logo: {
    fill: 'white',
  },
  title: {
    marginLeft: theme.spacing(1),
  },
}));

const Header = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <GraaspLogo height={40} className={classes.logo} />
          <Typography variant="h6" color="inherit" className={classes.title}>
            {t('Analytics')}
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
