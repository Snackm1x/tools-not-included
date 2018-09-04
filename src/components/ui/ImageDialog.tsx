import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';

export interface Props extends WithStyles<typeof styles> {
    onClose: Function,
    open: boolean
}

const styles = (theme: Theme) => createStyles({
    root: {
    },

    image: {
        borderRadius: 4,
        height: '100%',
        width: 'auto'
    },
});

class ImageDialog extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        var imageSrc = '/images/screenshot.jpg';

        return (
            <Dialog open={this.props.open} onClose={this.handleClose} className={this.props.classes.root} maxWidth={false}>
                <Grid>
                    <img src={imageSrc} className={this.props.classes.image} />
                </Grid>
            </Dialog>);
    }
};

export default withStyles(styles)(ImageDialog);