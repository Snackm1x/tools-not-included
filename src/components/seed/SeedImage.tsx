import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import Grid from '@material-ui/core/Grid';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ImageDialog from '../ui/ImageDialog';

export interface Props extends WithStyles<typeof styles> {

}

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        padding: theme.spacing.unit,
        width: '100%'
    },
    expPanel: {
        width: '100%',
        height: '100%',
    },
    expPanelDetails: {
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: 4,
        cursor: 'pointer'

    },
});

class SeedImage extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.state = { open: false }
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    render() {
        var imageSrc = '/images/kTfFHpd.jpg';


        return (
            <Grid item className={this.props.classes.root}>
                <ExpansionPanel className={this.props.classes.expPanel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subheading">Screenshot</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={this.props.classes.expPanelDetails} >
                        <div >
                            <img src={imageSrc} className={this.props.classes.image} onClick={this.handleClickOpen} />
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ImageDialog open={this.state.open} onClose={this.handleClose} />
            </Grid>);
    }
};

export default withStyles(styles)(SeedImage);