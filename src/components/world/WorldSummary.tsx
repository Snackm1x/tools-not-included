import * as React from "react";

import { withStyles, WithStyles, createStyles, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import GeyserChip from '../ui/GeyserChip';
import { GeyserProperties } from '../../constants/GeyserProperties';
import IGeyserProperties from "../../types/interfaces/IGeyserProperties";
import World from '../../types/classes/World';

export interface Props extends WithStyles<typeof styles> {
    world: World
}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        padding: theme.spacing.unit
    },
    card: {
        width: '100%',
        padding: theme.spacing.unit * 2
    },
    gridsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textContainer: {
        width: '40%',
        padding: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column'
    },
    chipContainer: {
        width: '100%',
        padding: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
});

var geyserTypes: IGeyserProperties[] = [];
GeyserProperties.forEach((item, idx) => {
    geyserTypes.push(item)
})

class WorldSummary extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Grid item className={this.props.classes.root}>
                <Card className={this.props.classes.card}>
                    <Typography align="center" variant="subheading">SEED {this.props.world.seed} </Typography>
                    <Typography align="center" variant="subheading">{this.props.world.gameVersion.displayNameLong}</Typography>
                    <Grid container className={this.props.classes.gridsContainer}>
                        <Grid container item className={this.props.classes.textContainer}>
                            <Typography>Upload date: {this.props.world.uploadDate.toDateString()} {this.props.world.uploadDate.toLocaleTimeString()}</Typography>
                        </Grid>
                        <Grid container item className={this.props.classes.chipContainer}>
                            {
                                geyserTypes.map((item, idx) => {
                                    return (
                                        <GeyserChip key={idx} geyserProperties={item} quantity={this.props.world.geyserQuantities.get(item.geyserType) as number} />
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Card>
            </Grid>);
    }
};

export default withStyles(styles)(WorldSummary);