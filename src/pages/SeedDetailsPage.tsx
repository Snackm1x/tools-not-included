import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import SeedDetails from '../components/seed/SeedDetails';
import Geyser from '../types/classes/Geyser';
import { GeyserType } from '../types/enums/GeyserType';
import { GameUpgrade } from '../types/enums/GameUpgrade';
import Seed from '../types/classes/Seed';
import GameVersion from '../types/classes/GameVersion';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        },
    });

function createData(type: GeyserType, eruptionRate?: number, activeDormancyPeriod?: number, dormancyPeriod?: number, eruptionPeriod?: number, activeEruptionPeriod?: number) {
    return new Geyser(type, eruptionRate, activeDormancyPeriod, dormancyPeriod, eruptionPeriod, activeEruptionPeriod)
}

const rows = [
    createData(GeyserType.GEYSER_COOL_SLUSH, 5400, 163, 233, 1422, 250),
    createData(GeyserType.GEYSER_COOL_SLUSH, 1200, 123, 643, 6442, 240),
    createData(GeyserType.GEYSER_WATER, 5400, 13, 243, 2432, 300),
    createData(GeyserType.GEYSER_NATGAS, 5400, 13, 243, 2432, 300),
    createData(GeyserType.VENT_CHLORINE, 5400, 13, 243, 2432, 300),
    createData(GeyserType.VENT_COOL_STEAM, 5400, 13, 243, 2432, 300),
    createData(GeyserType.VENT_HYDROGEN, 5400, 13, 243, 2432, 300),
    createData(GeyserType.GEYSER_NATGAS, 5400, 13, 243, 2432, 300),
    createData(GeyserType.VENT_POLLUTED_H2O, 5400, 13, 243, 2432, 300),
    createData(GeyserType.VENT_COOL_STEAM, 5400, 13, 243, 2432, 300),
    createData(GeyserType.VOLCANO, 5400, 13, 243, 2432, 300),
    createData(GeyserType.VOLCANO, 5400, 13, 243, 2432, 300),
];

class SeedDetailsPage extends React.Component<WithStyles<typeof styles>> {
    render() {

        var seed = new Seed("12312423", new GameVersion(GameUpgrade.ROCKETRY_UPGRADE, 123), rows, new Date());

        return (
            <Grid item container className={this.props.classes.root}>
                <Grid item container>
                    <SeedDetails seed={seed} />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(SeedDetailsPage);