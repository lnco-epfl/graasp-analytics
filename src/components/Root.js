import React from 'react';
import PropTypes from 'prop-types';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import App from './App';

const styles = {
  root: {
    flexGrow: 1,
    height: '100%',
  },
};

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5050d2',
    },
    secondary: pink,
    default: grey,
    background: {
      paper: '#fff',
    },
  },
  status: {
    danger: {
      background: orange,
      color: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: ['SuisseIntl', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    fontSize: 12,
  },
});

theme = responsiveFontSizes(theme);

const Root = ({ classes }) => (
  <div className={classes.root}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </div>
);

Root.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

const StyledComponent = withStyles(styles)(Root);

export default StyledComponent;
