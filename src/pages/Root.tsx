import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import WorldDetailsPage from './WorldDetailsPage';
import WorldBrowserPage from './WorldBrowserPage';
import AboutPage from './AboutPage';
import Error404 from './Error404';
import Nav from '../components/ui/Nav';
import '../fonts/fonts.css';


const myTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: '"Economica", sans-serif',
     fontSize: 16,
  //   body1: {
  //     fontSize: 18,
  //   },
  //   title: {
  //     fontFamily: '"Graystroke", sans-serif',
  //     fontSize: '1.2rem'
  //   },
  //   headline: {
  //     fontFamily: '"Graystroke", sans-serif',
  //   },
  //   subheading: {
  //     fontFamily: '"Graystroke", sans-serif',
  //     fontSize: '1rem'
  //   },
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
      maxWidth: 1300,
    },
    contentGridUpper: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      height: 'calc(100% - 64px)',
      overflowY: 'scroll',
      overflowX: 'auto',
      
      marginTop: 64,
    },
  });


class Root extends React.Component<WithStyles<typeof styles>> {
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
                  <Route exact path="/" component={WorldBrowserPage} />
                  <Route exact path="/world" component={WorldDetailsPage} />
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