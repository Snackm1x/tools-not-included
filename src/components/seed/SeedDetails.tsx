import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Grid from '@material-ui/core/Grid';

import Seed from '../../types/classes/Seed';
import SeedSummary from './SeedSummary';
import SeedGeysers from './SeedGeysers';
import SeedImage from './SeedImage';

export interface Props extends WithStyles<typeof styles> {
    seed: Seed
}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%'
    },
});

class SeedDetails extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
      
        return (
            <Grid container item className={this.props.classes.root}>
                <SeedSummary seed={this.props.seed}/>
                <SeedImage></SeedImage>
                <SeedGeysers geysers={this.props.seed.geysers}/>
            </Grid>);
    }
};

export default withStyles(styles)(SeedDetails);