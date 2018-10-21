import * as React from "react";

import { withStyles, WithStyles, createStyles, Typography, createMuiTheme, Chip  } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';

import GeyserChip from '../ui/GeyserChip';
import { GeyserProperties } from '../../constants/GeyserProperties';
import IGeyserProperties from "../../types/interfaces/IGeyserProperties";
import Seed from '../../types/classes/Seed';

import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import * as LocalStorage from '../../utils/LocalStorageAccess';
import LocalStorageKeys from "../../constants/LocalStorageKeys";

import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';

const css = require('fg-loadcss/src/loadCSS');

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

export interface State {
    favorite: boolean
}

class SeedSummary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            favorite: this.isFavorite()
        }
    }
    
    componentDidMount() {
        css.loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css', document.querySelector('#insertion-point-jss'),
        );
    }

    isFavorite = (): boolean => {
        var seedString = this.props.seed.seedNumber + "/" + this.props.seed.gameVersion.versionNumber;
        var favorites = LocalStorage.getFavorites();

        return favorites.indexOf(seedString) > -1;
    }

    toggleFavorite = () => {
        var seedString = this.props.seed.seedNumber + "/" + this.props.seed.gameVersion.versionNumber;

        var favorites = LocalStorage.getFavorites();

        if (this.state.favorite) {
            var index: number = favorites.indexOf(seedString);
            favorites.splice(index, 1);
            this.setState({ favorite: false })
        } else {
            favorites.push(seedString);
            this.setState({ favorite: true })
        }

        localStorage.setItem(LocalStorageKeys.FavoriteSeeds, favorites.join());
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
                        <Grid item xs={12} sm={6}>
                            <Grid container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                {this.props.seed.addedByMod && <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: createMuiTheme().spacing.unit / 2 }}>
                                    <Icon className={classNames(this.props.classes.icon, 'fas fa-terminal')} color="action" />
                                    <Typography variant="caption">Added with the mod</Typography>
                                </Grid>}

                                {!this.props.seed.addedByMod && <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: createMuiTheme().spacing.unit / 2 }}>
                                    <Icon className={classNames(this.props.classes.icon, 'fas fa-pencil-alt')} color="action" />
                                    <Typography variant="caption">Added manually</Typography>
                                </Grid>}

                                <Typography variant="caption">on {this.props.seed.creationDate.toDateString()} {this.props.seed.creationDate.toLocaleTimeString()}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{ display: 'inline-flex', flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'flex-end' }}>

                            <Grid className={this.props.classes.favoriteDiv}>
                                <Typography variant="caption" style={{ marginLeft: 20 }}> {this.state.favorite ? "Remove" : "Add"} favorite</Typography>

                                <IconButton style={{ color: red["900"] }} onClick={this.toggleFavorite}>
                                    {this.state.favorite ? <Favorite /> : <FavoriteBorder />}
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>

                     {/*this.props.seed.modVersion! < 2 && <Chip color="default" label="This seed was added before Oil Reservoirs could be uploaded to the website. You can update it by uploading it again with the mod." />*/}
                     {this.props.seed.modVersion! < 2 && <Chip color="default" label="This seed was added before Oil Reservoirs could be uploaded to the website. Soon you will be able to add that info to it." />}
                </Card>
            </Grid>);
    }
};

export default withStyles(styles)(SeedSummary);