import * as React from "react";

import { withStyles, WithStyles, createStyles, createMuiTheme } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Seed from '../../types/classes/Seed';
import GeyserChip from './GeyserChip';
import { GeyserProperties } from '../../constants/GeyserProperties';
import IGeyserProperties from "../../types/interfaces/IGeyserProperties";
import { GeyserType } from "../../types/enums/GeyserType";

export interface Props extends WithStyles<typeof styles> {
    world: Seed,
    displayGeyserTypes?: GeyserType[]
}

const styles = (theme: Theme) => createStyles({
    card: {
        width: '100%',
        padding: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '&:hover': {
            background: theme.palette.type === 'light' ? theme.palette.grey[200] : "#494949"
        }
    },
    texts: {
        minWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },
    typography: {
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        textAlign: 'center',
    },
    chipContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        flex: 9
    },
    icon: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        fontSize: '1.2rem',
        width: 'auto'
    }
});

var geyserTypes: IGeyserProperties[] = [];
GeyserProperties.forEach((item, idx) => {
    geyserTypes.push(item)
})

class SeedCard extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (

            <Card className={this.props.classes.card}>
                <Grid style={{ display: 'flex', flexDirection: 'column' }} container>
                    <Grid container>
                        <Grid className={this.props.classes.texts}>
                            <Typography variant="subheading" className={this.props.classes.typography}>Seed: {this.props.world.seedNumber}</Typography>
                            <Typography variant="subheading" className={this.props.classes.typography}>{this.props.world.gameVersion.gameUpgradeDisplayName}</Typography>
                            <Typography variant="subheading" className={this.props.classes.typography}>{this.props.world.gameVersion.displayNameShort}</Typography>
                        </Grid>
                        <Grid className={this.props.classes.chipContainer}>
                            {geyserTypes.map((item, idx) => {
                                if (this.props.displayGeyserTypes == null || this.props.displayGeyserTypes.indexOf(item.geyserType) > -1)
                                    return (
                                        <GeyserChip key={idx} geyserProperties={item} quantity={this.props.world.geyserQuantities.get(item.geyserType) as number} />
                                    )
                                else return null;
                            })}
                        </Grid>
                    </Grid>

                    <Divider style={{ marginTop: createMuiTheme().spacing.unit, marginBottom: createMuiTheme().spacing.unit }} />
                    <Grid container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: createMuiTheme().spacing.unit / 2 }}>
                            <Typography variant="caption">Added on {this.props.world.creationDate.toDateString()} {this.props.world.creationDate.toLocaleTimeString()}</Typography>
                        </Grid>

                        {this.props.world.modVersion! < 2 && <Typography style={{ marginLeft: 'auto', paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, fontSize: "0.96rem", backgroundColor: createMuiTheme().palette.grey[700], borderRadius: 16 }}>This seed was added before Oil Reservoirs and Planets were uploaded by the mod.  You can add this info by re-uploading this seed.</Typography>}
                        {this.props.world.modVersion! < 4 && this.props.world.modVersion! >= 2 && <Typography style={{ marginLeft: 'auto', paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, marginTop: 2, fontSize: "0.96rem", backgroundColor: createMuiTheme().palette.grey[700], borderRadius: 16 }}>This seed was added before Planets were uploaded by the mod. You can add this info by re-uploading this seed.</Typography>}
                    </Grid>
                </Grid>
            </Card>
        );
    }
};

export default withStyles(styles)(SeedCard);