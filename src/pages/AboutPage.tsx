import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            padding: theme.spacing.unit
        }
    });

class AboutPage extends React.Component<WithStyles<typeof styles>> {

    render() {
        return (
            <Grid item container className={this.props.classes.root}>
                <Typography variant="display1">Woot, this is an about page!</Typography>
            </Grid>
        );
    }
}

export default withStyles(styles)(AboutPage);