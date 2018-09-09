import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            padding: theme.spacing.unit,
            maxHeight: '100%',
        },
        section: {
            height: '50%',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
        },
        image: {
            maxHeight: '100%',
            maxWidth: '100%'
        },
        texts: {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center'
        },
        btn: {
            width: 180,
            alignSelf: 'center'
        }
    });

class Error404 extends React.Component<WithStyles<typeof styles>> {

    constructor(props: WithStyles<typeof styles>) {
        super(props);
    }

    render() {
        return (
            <Grid item container className={this.props.classes.root}>
                <Grid>
                    <img src='/images/outhouse.png' className={this.props.classes.image} />
                </Grid>
                <Grid style={{ display: 'flex', justifyContent: 'center' }} className={this.props.classes.texts}>
                    <Typography align="center" variant="display1">Crap, nothing to see here!</Typography>
                    <Typography align="center">Go back to the main page.</Typography>
                    <Typography align="center">If you truly believe you're seeing this incorrectly, please contact the developer.</Typography>
                    <br />
                    <Button variant="raised" color="primary" className={this.props.classes.btn} component={({ innerRef, ...props }) => <Link to="/" {...props} />}>Return to the Main Page</Button>
                </Grid>

            </Grid>
        );
    }
}

export default withStyles(styles)(Error404);