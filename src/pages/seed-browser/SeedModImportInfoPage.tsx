import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export interface Props extends WithStyles<typeof styles> {

}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        width: '100%',
        padding: theme.spacing.unit,
        margin: theme.spacing.unit,
    },
    paperGrid: {
        width: '100%',
        padding: theme.spacing.unit,
        margin: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
    }
});

class SeedModImportInfoPage extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Grid container item className={this.props.classes.root}>
                <Grid container >
                    <Paper className={this.props.classes.paper}>
                        <Grid className={this.props.classes.paperGrid}>
                            <Typography style={{ width: '100%', textAlign: 'center' }} variant="headline">Add seeds from game with the mod</Typography>
                            <br />
                            <Typography variant="subheading">To easily add seeds from the game, you need to do a few things:</Typography>
                            <br />
                            <Typography variant="subheading"><b>1. Enable debug mode in game</b></Typography>
                            <Typography variant="subheading">To do this add <b>debug_enable.txt</b> file to your game data directory (...\Steam\steamapps\common\OxygenNotIncluded\OxygenNotIncluded_Data\debug_enable.txt) <br /> To check that it works correctly press Backspace in a loaded game - a menu on the right side should open.</Typography>
                            <br />
                            <Typography variant="subheading"><b>2. Install the ModLoader </b></Typography>
                            <Typography variant="subheading">While this step is a bit more complicated, don't get discouraged! In the end it's just copying a few files.</Typography>
                            <Typography variant="subheading">Download the newest release of ModLoader (downloadable <a style={{ color: '#FFFFFF' }} href="https://github.com/javisar/ONI-Modloader/blob/master/Managed/ModLoader.dll">here</a> and place it in your ...\Steam\steamapps\common\OxygenNotIncluded\OxygenNotIncluded_Data\Managed game folder, or visit the <a style={{ color: '#FFFFFF' }} href="https://forums.kleientertainment.com/topic/88186-mod01-oni-modloader/">forum thread</a> for help and more details.</Typography>
                            <br />
                            <Typography variant="subheading"><b>3. Download the Seed Sharing Mod </b></Typography>
                            <Typography variant="subheading">Last step: download the Mod available <a style={{ color: '#FFFFFF' }} href="https://www.dropbox.com/s/3f1bwvp8hp20n6g/ASeedSharingMod-v4.0.dll?dl=1">here</a> and put it in the ...\Steam\steamapps\common\OxygenNotIncluded\Mods folder in your game directory (you need to create the Mods folder!).</Typography>
                            <br />

                            <Typography variant="subheading"><b>WIN: Add seeds!</b></Typography>
                            <Typography variant="subheading">Once you've set things up, all you need to do is to reveal the map with debug (press backspace, the entire map should uncover), press Esc and choose the <b>Upload Seed</b> option at the bottom of the menu.</Typography>
                            <Typography variant="subheading">Please upload only legit seeds - from original, vanilla world generation, created in the current game version. This place is by people for people, so we all need to make sure that uploaded data is correct and useful.</Typography>

                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <Typography variant="caption">Current mod version: 3.0. Last update: 22/11/2018</Typography>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>);
    }
};

export default withStyles(styles)(SeedModImportInfoPage);