import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Logo } from '../../resources/logo.svg';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: '48px',
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Logo className={classes.logo} />
          <Typography variant="h6" color="inherit">
            {t('Analytics')}
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
