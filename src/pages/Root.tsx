import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import SeedDetailsPage from './SeedDetailsPage';
import SeedBrowserPage from './SeedBrowserPage';
import AboutPage from './AboutPage';
import Error404 from './Error404';
import Nav from '../components/ui/Nav';
import '../fonts/fonts.css';


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


class Root extends React.Component<WithStyles<typeof styles>, any> {
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = {
      errorFound: false
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={myTheme}>
        <CssBaseline />
        <div className={classes.root}>
          <BrowserRouter>
            <Grid className={classes.contentGridUpper}>
              <Nav />
              <Grid className={classes.contentGrid}>
                <Switch>
                  <Route exact path="/" component={SeedBrowserPage} />
                  <Route exact path="/seed/:seed/:version" component={SeedDetailsPage} />
                  <Route exact path="/about" component={AboutPage} />
                  <Route component={Error404} />
                </Switch>
              </Grid>
            </Grid>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Root);