import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';

import IWorld from '../../types/classes/World';
//import { GeyserProperties, IGeyserProperties } from '../../types/geyser-type';

import WorldSummary from './WorldSummary';
import WorldGeysers from './WorldGeysers';
import WorldImage from './WorldImage';

export interface Props extends WithStyles<typeof styles> {
    world: IWorld
}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%'
    },
});

class WorldDetails extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
      
        return (
            <Grid container item className={this.props.classes.root}>
                <WorldSummary world={this.props.world}/>
                <WorldImage></WorldImage>
                <WorldGeysers geysers={this.props.world.geysers}/>
            </Grid>);
    }
};

export default withStyles(styles)(WorldDetails);