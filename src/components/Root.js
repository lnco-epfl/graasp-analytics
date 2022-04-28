import React from 'react';
import PropTypes from 'prop-types';
import ReactGa from 'react-ga';
import { I18nextProvider } from 'react-i18next';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18nConfig from '../config/i18n';
import App from './App';
import { NODE_ENV, REACT_APP_GOOGLE_ANALYTICS_ID } from '../config/env';
import {
  QueryClientProvider,
  queryClient,
  ReactQueryDevtools,
} from '../config/queryClient';

ReactGa.initialize(REACT_APP_GOOGLE_ANALYTICS_ID);

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
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
    fontWeightBold: 700,
  },
});

theme = responsiveFontSizes(theme);

const Root = ({ classes }) => (
  <div className={classes.root}>
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={theme}>
        <I18nextProvider i18n={i18nConfig}>
          <App />
          <ToastContainer />
        </I18nextProvider>
      </MuiThemeProvider>
      {NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  </div>
);

Root.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

const StyledComponent = withStyles(styles)(Root);

export default StyledComponent;
