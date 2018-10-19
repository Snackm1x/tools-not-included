import * as React from "react";

import { withStyles, WithStyles, createStyles, createMuiTheme } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export interface Props extends WithStyles<typeof styles> {

}


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        width: '100%',
        padding: theme.spacing.unit,
        margin: theme.spacing.unit,
    },
    paperGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});


class SeedModImportInfo extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }


    render() {

        return (
            <Grid container item className={this.props.classes.root}>
                <Grid container >
                    <Paper className={this.props.classes.paper}>
                        <Typography>This is not ready yet!</Typography>
                    </Paper>
                </Grid>
            </Grid>);
    }
};

export default withStyles(styles)(SeedModImportInfo);