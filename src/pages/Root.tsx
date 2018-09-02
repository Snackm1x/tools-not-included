import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
                <Paper style={{width: 'calc(100% - 16px)', margin: 8, padding: 16, backgroundColor: '#d50000'}}>
                  <Typography align="center" variant="title">This website is in early development, online temporarily for testing purposes and not really working for now. You should not be here (yet :) ) Come back when it's ready!</Typography>
                </Paper>
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