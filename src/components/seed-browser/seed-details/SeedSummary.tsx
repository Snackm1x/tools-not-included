import * as React from "react";

import { withStyles, WithStyles, createStyles, Typography, createMuiTheme, Chip } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import GeyserChip from '../../seed-browser/GeyserChip';
import { GeyserProperties } from '../../../constants/GeyserProperties';
import IGeyserProperties from "../../../types/interfaces/IGeyserProperties";
import Seed from '../../../types/classes/Seed';

export interface Props extends WithStyles<typeof styles> {
    seed: Seed
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
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -theme.spacing.unit
    },
    chipContainer: {
        width: '100%',
        padding: theme.spacing.unit,
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    favoriteDiv: {
        width: 140,
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        fontSize: '1.2rem',
        width: 'auto'
    },
});

var geyserTypes: IGeyserProperties[] = [];
GeyserProperties.forEach((item, idx) => {
    geyserTypes.push(item)
})

class SeedSummary extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Grid item className={this.props.classes.root}>
                <Card className={this.props.classes.card}>
                    <Typography align="center" variant="title">Seed {this.props.seed.seedNumber}</Typography>
                    <Typography align="center" variant="subheading">created in {this.props.seed.gameVersion.displayNameLong}</Typography>

                    <Grid container item className={this.props.classes.chipContainer}>
                        {
                            geyserTypes.map((item, idx) => {
                                return (
                                    <GeyserChip key={idx} geyserProperties={item} quantity={this.props.seed.geyserQuantities.get(item.geyserType) as number} />
                                )
                            })
                        }
                    </Grid>

                    <Grid container item className={this.props.classes.textContainer}>
                        <Grid container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Typography variant="caption">Added on {this.props.seed.creationDate.toDateString()} {this.props.seed.creationDate.toLocaleTimeString()}</Typography>
                            {this.props.seed.modVersion! < 2 && <Typography style={{ marginLeft: 'auto', paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, fontSize: "1rem", display: 'inline-flex', backgroundColor: createMuiTheme().palette.grey[700], borderRadius: 16 }}>This seed was added before Oil Reservoirs and Planets were uploaded by the mod.  You can add this info by re-uploading this seed.</Typography>}
                            {this.props.seed.modVersion! < 4 && this.props.seed.modVersion! >= 2 && <Typography style={{ marginLeft: 'auto', paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, fontSize: "1rem", display: 'inline-flex', backgroundColor: createMuiTheme().palette.grey[700], borderRadius: 16 }}>This seed was added before Planets were uploaded by the mod. You can add this info by re-uploading this seed.</Typography>}
                        </Grid>
                    </Grid>
                </Card>
            </Grid>);
    }
};

export default withStyles(styles)(SeedSummary);