import * as React from "react";

import { withStyles, WithStyles, createStyles, createMuiTheme } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';

import Seed from '../../types/classes/Seed';
import GeyserChip from '../ui/GeyserChip';
import { GeyserProperties } from '../../constants/GeyserProperties';
import IGeyserProperties from "../../types/interfaces/IGeyserProperties";
import { GeyserType } from "../../types/enums/GeyserType";

import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';

import * as LocalStorage from '../../utils/LocalStorageAccess'; 
import LocalStorageKeys from "../../constants/LocalStorageKeys";
import red from '@material-ui/core/colors/red';

const css = require('fg-loadcss/src/loadCSS');

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

    componentDidMount() {
        css.loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css', document.querySelector('#insertion-point-jss'),
        );
    }

    isFavorite = () : boolean => {
        var seedString = this.props.world.seedNumber + "/" + this.props.world.gameVersion.versionNumber;
        var favorites = LocalStorage.getFavorites();

        return favorites.indexOf(seedString) > -1;
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

                    <Divider style={{ marginTop: createMuiTheme().spacing.unit, marginBottom: createMuiTheme().spacing.unit}} />
                    <Grid container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        {this.props.world.addedByMod && <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  marginRight: createMuiTheme().spacing.unit/2 }}>
                            <Icon className={classNames(this.props.classes.icon, 'fas fa-terminal')} color="action" />
                            <Typography variant="caption">Added with the mod</Typography>
                        </Grid>}

                        {!this.props.world.addedByMod && <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: createMuiTheme().spacing.unit/2 }}>
                            <Icon className={classNames(this.props.classes.icon, 'fas fa-pencil-alt')} color="action" />
                            <Typography variant="caption">Added manually</Typography>
                        </Grid>}

                        <Typography variant="caption">on {this.props.world.creationDate.toDateString()} {this.props.world.creationDate.toLocaleTimeString()}</Typography>

                        {this.isFavorite() && <Favorite style={{ color: red["900"], marginLeft: 'auto' }}/> }
                    </Grid>
                </Grid>

            </Card>

        );
    }
};

export default withStyles(styles)(SeedCard);