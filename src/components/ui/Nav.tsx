import * as React from "react";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Info from '@material-ui/icons/Info';
import { Link } from 'react-router-dom'

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
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
            width: '100%'
         },
        toolbar: {
           maxWidth: 1150,
           width: '100%',
           padding: theme.spacing.unit
        },
        clickableDiv: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        ahref: {
            color: "#FFFFFF",
            textDecoration: 'none'
        },
        buttons: {
            marginLeft: 'auto'
        },
    });


export interface Props extends WithStyles<typeof styles> {
}

function Nav(props: Props) {
    return (
        <div className={props.classes.root}>
            <AppBar position="fixed" color="primary" className={props.classes.appbar}>
                <Toolbar className={props.classes.toolbar}>
                    <a href="/" className={props.classes.ahref}>
                        <div className={props.classes.clickableDiv}>
                            <img className={props.classes.logo} src='/images/oxygen_helmet.png' />
                            <Typography variant="title" color="inherit" >
                                Oxygen Not Included Seeds Browser
                             </Typography>
                        </div>
                    </a>
                    <div className={props.classes.buttons}>
                        <Tooltip title="About">
                            <IconButton color="inherit" component={({ innerRef, ...props }) => <Link to="/about" {...props} />} >
                                <Info />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Nav);