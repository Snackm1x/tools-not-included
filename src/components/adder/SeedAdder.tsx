import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Seed from '../../types/classes/Seed';

import { GameUpgrades } from '../../constants/GameUpgrades';
import { GameUpgrade } from '../../types/enums/GameUpgrade';
import IGameUpgradeDetails from "../../types/interfaces/IGameUpgradeDetails";
import { GeyserProperties } from "../../constants/GeyserProperties";
import { Link } from "react-router-dom";

export interface Props extends WithStyles<typeof styles> {

}

interface State {
    seedNumber: number,
    gameUpgrade: GameUpgrade,
    gameVersion: number
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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
        width: 200,
        minWidth: 200,
    },
    paperGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    inputsGrid: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    expPanelGrid: {
        width: '100%',
        height: '100%',
        margin: theme.spacing.unit,
    },
    expPanel: {
        width: '100%',
        height: '100%',
    },
    expPanelDetails: {
        display: 'flex',
        flexDirection: 'column'
    },
    singleButton: {
        margin: theme.spacing.unit,
    },
});

class SeedAdder extends React.Component<Props, State & any> {
    constructor(props: Props) {
        super(props);

        this.state = { gameUpgrade: GameUpgrades.values().next().value.upgrade };
    }

    handleChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {

        return (
            <Grid container item className={this.props.classes.root}>
                <form style={{ width: '100%' }} onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    //  this.handleSubmit();
                }}>

                    <Grid className={this.props.classes.expPanelGrid} container>
                        <ExpansionPanel className={this.props.classes.expPanel} defaultExpanded>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subheading" align='center' style={{ width: '100%' }}>Instructions</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={this.props.classes.expPanelDetails} >
                                <Typography align='center'>To start with, please provide the seed number and select in which game version the game was <b>created (important!)</b>.</Typography>
                                <Typography align='center'>The seed number can be found at the bottom of the pause menu when you press Esc in game and the game version number is visible at the bottom of the screen in the main menu. </Typography>
                                <br />
                                <Typography align='center'>Next, add geysers that are on the map. Take your time to add all of them! You may not save a seed without at least 8 geysers added. Do not add partially explored maps - you should uncover the map completely first.</Typography>
                                <Typography align='center'>Geyser details such as emission rates and active times do not need to be added, but entries that include all information will have an icon specifying that.</Typography>
                                <br />
                                <Typography align='center'>Wait! I'm too lazy to add this manually!</Typography>
                                <Typography align='center'>I gotchu! I have written a mod that you can install that will export your maps that you uncover in debug mode to a file that you can upload here with all details.</Typography>
                                <br />
                                <Grid className={this.props.classes.inputsGrid}>
                                    <Button variant="raised" color="primary" className={this.props.classes.singleButton} component={({ innerRef, ...props }) => <Link to="/seeds/newjson" {...props} />}>I'm cool and I want to import a JSON from the mod, take me there!</Button>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>


                    <Paper className={this.props.classes.paper}>

                        <Grid className={this.props.classes.paperGrid}>
                            <Typography variant='subheading'>Basic game info</Typography>
                            <Grid item container className={this.props.classes.inputsGrid}>
                                <TextField
                                    id="seed"
                                    name="seedNumber"
                                    label="Seed"
                                    type="number"
                                    value={this.state.seedNumber}
                                    onChange={this.handleChange}
                                    className={this.props.classes.textField}
                                    margin="normal" />

                                <FormControl className={this.props.classes.textField}>
                                    <InputLabel htmlFor="game-upgrade">Game Upgrade</InputLabel>
                                    <Select
                                        value={this.state.gameUpgrade}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'gameUpgrade',
                                            id: 'game-upgrade',
                                        }}>
                                        {Array.from(GameUpgrades).map((element) => (
                                            <MenuItem key={element[1].upgrade} value={element[1].upgrade}>{element[1].displayName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    id="gameVersion"
                                    name="gameVersion"
                                    label="Game version number"
                                    type="number"
                                    value={this.state.gameVersion}
                                    onChange={this.handleChange}
                                    className={this.props.classes.textField}
                                    margin="normal" />
                                <Grid className={this.props.classes.inputsGrid}>
                                    <Button variant="raised" color="primary" className={this.props.classes.singleButton}></Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Paper>

                    <Paper className={this.props.classes.paper}>

                        <Grid className={this.props.classes.paperGrid}>
                            <Typography variant='subheading'>Geyser info</Typography>
                            <Grid item container className={this.props.classes.inputsGrid}>
                                <TextField
                                    id="seed"
                                    name="seedNumber"
                                    label="Seed"
                                    type="number"
                                    value={this.state.seedNumber}
                                    onChange={this.handleChange}
                                    className={this.props.classes.textField}
                                    margin="normal" />

                                <FormControl className={this.props.classes.textField}>
                                    <InputLabel htmlFor="game-upgrade">Game Upgrade</InputLabel>
                                    <Select
                                        value={this.state.gameUpgrade}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'gameUpgrade',
                                            id: 'game-upgrade',
                                        }}>
                                        {Array.from(GameUpgrades).map((element) => (
                                            <MenuItem key={element[1].upgrade} value={element[1].upgrade}>{element[1].displayName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    id="gameVersion"
                                    name="gameVersion"
                                    label="Game version number"
                                    type="number"
                                    value={this.state.gameVersion}
                                    onChange={this.handleChange}
                                    className={this.props.classes.textField}
                                    margin="normal" />
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </Grid>);
    }
};

export default withStyles(styles)(SeedAdder);