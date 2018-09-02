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
            padding: theme.spacing.unit
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
        }
    });

class Error404 extends React.Component<WithStyles<typeof styles>> {

    render() {
        return (
            <Grid item container className={this.props.classes.root}>
                <Grid item container className={this.props.classes.section} xs={12} sm={6} md={6} lg={6} xl={6}>
                    <img src='/images/outhouse.png' className={this.props.classes.image} />
                </Grid>
                <Grid item container className={this.props.classes.section} xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Typography  align="center" variant="display1">Crap, nothing to see here!</Typography>
                    <br />
                    <Typography align="center">Go back to the main page.</Typography>
                    <Typography align="center">If you truly believe you're seeing this incorrectly, please contact the developer.</Typography>
                    <br />
                    <br />
                    <Button variant="raised" color="primary" component={({ innerRef, ...props }) => <Link to="/" {...props} />}>Return to the Main Page</Button>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Error404);