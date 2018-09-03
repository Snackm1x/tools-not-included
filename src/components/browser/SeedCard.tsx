import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Seed from '../../types/classes/Seed';
import GeyserChip from '../ui/GeyserChip';
import { GeyserProperties } from '../../constants/GeyserProperties';
import IGeyserProperties from "../../types/interfaces/IGeyserProperties";
import { GeyserType } from "../../types/enums/GeyserType";

export interface Props extends WithStyles<typeof styles> {
    world: Seed,
    displayGeyserTypes?: GeyserType[]
}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    card: {
        width: '100%',
        padding: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    texts: {
        minWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex:1
    },
    typography: {
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        flexBasis: '25%',
        textAlign: 'center',
    },
    chipContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        flex:9
    },
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
            <Grid item className={this.props.classes.root} >
                <Card className={this.props.classes.card}>
                    <Grid className={this.props.classes.texts}>
                        <Typography variant="subheading" className={this.props.classes.typography}>Seed: {this.props.world.seed}</Typography>
                        <Typography variant="subheading" className={this.props.classes.typography}>{this.props.world.gameVersion.displayNameLong}</Typography>
                    </Grid>
                    <Grid className={this.props.classes.chipContainer}>
                        {geyserTypes.map((item, idx) => {
                            if (this.props.displayGeyserTypes == null|| this.props.displayGeyserTypes.indexOf(item.geyserType) > -1)
                                return (
                                    <GeyserChip key={idx} geyserProperties={item} quantity={this.props.world.geyserQuantities.get(item.geyserType) as number} />
                                )
                            else return null;
                        })}
                    </Grid>

                </Card>
            </Grid>);
    }
};

export default withStyles(styles)(SeedCard);