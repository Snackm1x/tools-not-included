import * as React from "react";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Info from '@material-ui/icons/Info';
import { Link } from 'react-router-dom'

const styles = (theme: Theme) => {

    var mainBarHeight = 64;
    var subBarHeight = 32;

    return createStyles({
        root: {
            flexGrow: 1
        },
        logo: {
            width: 50,
            height: 50,
            marginRight: theme.spacing.unit * 2
        },
        appbar: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            height: mainBarHeight
        },
        appbar2: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            marginTop: mainBarHeight,
            height: subBarHeight
        },
        toolbar: {
            maxWidth: 1150,
            width: '100%',
            padding: theme.spacing.unit
        },
        toolbar2: {
            maxWidth: 1150,
            width: '100%',
            padding: theme.spacing.unit,
            height: subBarHeight,
            minHeight: subBarHeight
        },
        clickableDiv: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            textDecoration: 'none',
        },
        ahref: {
            color: "#FFFFFF",
            textDecoration: 'none'
        },
        buttons: {
            marginLeft: 'auto'
        },
        textLink: {
            textDecoration: 'none',
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
        }
    });
}

export interface Props extends WithStyles<typeof styles> {
}

function Nav(props: Props) {
    return (
        <div className={props.classes.root}>
            <AppBar position="fixed" color="primary" className={props.classes.appbar}>
                <Toolbar className={props.classes.toolbar}>
                    <Grid className={props.classes.clickableDiv} component={({ innerRef, ...props }) => <Link to="/" {...props} />}>
                        <img className={props.classes.logo} src='/images/oxygen_helmet.png' />
                        <Typography variant="title" color="inherit" >
                            Oxygen Not Included Seeds Browser
                        </Typography>
                    </Grid>

                    <div className={props.classes.buttons}>
                        <Tooltip title="About">
                            <IconButton color="inherit" component={({ innerRef, ...props }) => <Link to="/about" {...props} />} >
                                <Info />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
            <AppBar position="absolute" color="default" className={props.classes.appbar2}>
                <Toolbar className={props.classes.toolbar2}>
                    <Typography variant="button" color="inherit" className={props.classes.textLink} component={({ innerRef, ...props }) => <Link to="/" {...props} />}>Browser</Typography>
                    <Typography variant="button" color="inherit" className={props.classes.textLink} component={({ innerRef, ...props }) => <Link to="/newseed" {...props} />}>Add new seed</Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Nav);