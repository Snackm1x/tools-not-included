import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import WorldBrowser from '../components/browser/SeedBrowser';


const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
        },
    });

   

    
class WorldBrowserPage extends React.Component<WithStyles<typeof styles>> {
    render() {

        return (
            <Grid item container className={this.props.classes.root}>
                <Grid item container>
                  <WorldBrowser/>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(WorldBrowserPage);