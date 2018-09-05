import * as React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
    error: {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.getContrastText(theme.palette.error.dark),
        margin: theme.spacing.unit,
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

export interface Props extends WithStyles<typeof styles> {
    message: string,
    open: boolean
}

export interface State {
    closed: boolean
}

class CustomizedSnackbars extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            closed: false
        }
    }

    handleClose = (event: object, reason: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ closed: true });
      };

      clickClose = (event: React.MouseEvent<HTMLDivElement>) => {   
        this.setState({ closed: true });
      };

    render() {
        const { classes } = this.props;

        const action = (
            <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}>
                <CloseIcon className={classes.icon} />
            </IconButton>
        );

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.props.open && !this.state.closed}
                autoHideDuration={6000}
                onClose={this.handleClose}>

                <SnackbarContent
                    className={this.props.classes.error}
                    aria-describedby="client-snackbar"
                    action={action}
                    onClick={this.clickClose}
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <ErrorIcon className={classes.icon} />
                            {this.props.message}
                        </span>
                    } />
            </Snackbar>
        );
    }
}

export default withStyles(styles)(CustomizedSnackbars);