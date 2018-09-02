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
            height: '100%',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
        },
        image: {
            maxHeight: '100%'
        }
    });

class AboutPage extends React.Component<WithStyles<typeof styles>> {

    render() {
        return (
            <Grid item container className={this.props.classes.root}>
             <Grid item container className={this.props.classes.section} xs={12} sm={6} md={6} lg={3} xl={3}>
             <img src='/images/outhouse.png' className={this.props.classes.image}/>
             </Grid>
                <Grid item container className={this.props.classes.section} xs={12} sm={6} md={6} lg={3} xl={3}>
                    <Typography variant="display1">Woot, this is an about page!</Typography>
                    <br/>
                    <br/>
                    <br/>
                    <Button variant="raised" color="primary" component={({innerRef, ...props}) => <Link  to="/" {...props}/> }>Return to the Main Page</Button>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(AboutPage);