import * as React from "react";

import { withStyles, WithStyles, createStyles, Typography } from '@material-ui/core';
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
import _ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpOutlined';
import _ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbDownOutlined from '@material-ui/icons/ThumbDownOutlined';

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
    voteDiv: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flexGrow: 1
    }
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
        var isFavorite = true;
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

                        <Typography variant="caption">Upload date: {this.props.seed.creationDate.toDateString()} {this.props.seed.creationDate.toLocaleTimeString()}</Typography>

                        <Grid className={this.props.classes.voteDiv}>
                            <IconButton>
                                <ThumbDownOutlined style={{ marginTop: 5 }} />
                            </IconButton>

                            <Typography variant="caption" style={{ marginLeft: 5, marginRight: 5 }}> 53664</Typography>

                            <IconButton>
                                <ThumbUpOutlined style={{ marginBottom: 5 }} />
                            </IconButton>
                        </Grid>

                        <Typography variant="caption">Report invalid</Typography>

                        <Grid className={this.props.classes.favoriteDiv}>
                            <Typography variant="caption" style={{ marginLeft: 20 }}> {isFavorite ? "Remove" : "Add"} favorite</Typography>

                            <IconButton style={{ color: red["900"] }}>
                                {isFavorite ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>);
    }
};

export default withStyles(styles)(SeedSummary);