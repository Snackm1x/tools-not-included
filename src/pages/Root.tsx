import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import Grid from '@material-ui/core/Grid';

import Nav from '../components/ui/Nav';
import '../fonts/fonts.css';
import Routes from './Routes';
import { ApplicationState } from '../store';

const myTheme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    fontFamily: '"Economica", sans-serif',
    fontSize: 16
  }
});

const styles = () =>
  createStyles({
    root: {
      height: '100vh',
      maxHeight: '100vh',
    },
    contentGrid: {
      height: '100%',
      width: '100%',
      maxWidth: 1150,
    },
    contentGridUpper: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      height: 'calc(100% - 96px)',
      overflowY: 'scroll',
      overflowX: 'auto',
      marginTop: 96,
    },
  });

export interface RootProps extends WithStyles<typeof styles> {
  store: Store<ApplicationState>
  history: History
}

class Root extends React.Component<RootProps> {
  constructor(props: RootProps) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={myTheme}>
        <CssBaseline />
        <div className={classes.root}>
          <Provider store={this.props.store}>
            <ConnectedRouter history={this.props.history}>
              <Grid className={classes.contentGridUpper}>
                <Nav />
                <Grid className={classes.contentGrid}>
                  <Routes />
                </Grid>
              </Grid>
            </ConnectedRouter>
          </Provider>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Root);