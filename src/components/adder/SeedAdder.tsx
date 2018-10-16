import * as React from "react";

import { withStyles, WithStyles, createStyles, createMuiTheme } from '@material-ui/core';
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
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import SeedGeysers from "../seed/SeedGeysers";
import Geyser from "../../types/classes/Geyser";
import { GeyserType } from "../../types/enums/GeyserType";
import ComponentURL from "src/constants/ComponentURL";
import API from "src/api/api";
import SeedDTO from "src/api/dto/SeedDTO";
import { AxiosError } from "axios";
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import ErrorSnackbar from "../ui/ErrorSnackbar";

export interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {

}

interface State {
    seedNumber: number,
    gameUpgrade: GameUpgrade,
    gameVersion: number,

    geyserType: GeyserType,
    eruptionRate: number,
    activeEruptionPeriod: number,
    eruptionPeriod: number,
    activeDormancyPeriod: number,
    dormancyPeriod: number

    geyserList: Geyser[],

    basicInfoCheckPassed: BasicInfoStatus,
    basicInfoLoading: boolean,
    uploadLoading: boolean,
    errorOccured: boolean
}

enum BasicInfoStatus {
    FRESH = 'FRESH',
    PASSED = 'PASSED',
    DUPLICATE_FOUND = 'DUPLICATE_FOUND'
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
    textFieldGeyser: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
        width: 150,
        minWidth: 150,
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

        this.state = {
            basicInfoLoading: false, uploadLoading: false, gameUpgrade: GameUpgrades.values().next().value.upgrade, seedNumber: "", gameVersion: "",
            geyserType: GeyserProperties.values().next().value.geyserType, basicInfoCheckPassed: BasicInfoStatus.FRESH, geyserList: []
        };
    }

    handleChange = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    verifySeed = () => {
        if (!this.state.seedNumber || !this.state.gameVersion || !this.state.gameUpgrade) return;

        this.setState({ basicInfoLoading: true });
        var url = "seeds/exists/" + this.state.seedNumber + "/" + this.state.gameVersion;
        API.get<boolean>(url)
            .then(res => {

                if (res.data == true) {
                    this.setState({ basicInfoCheckPassed: BasicInfoStatus.DUPLICATE_FOUND })
                } else if (res.data == false) {
                    this.setState({ basicInfoCheckPassed: BasicInfoStatus.PASSED })
                }
                this.setState({ basicInfoLoading: false });
            }).catch((error: AxiosError) => {
                this.setState({ errorOccured: true, basicInfoLoading: false });
            });
    }

    getProperGeyserStatValue = (value: any) => {
        if (!value) return null;

        if (value > 0) return value;

        return null;
    }

    addGeyserToTheList = () => {
        var g = new Geyser(this.state.geyserType, this.getProperGeyserStatValue(this.state.eruptionRate), this.getProperGeyserStatValue(this.state.activeDormancyPeriod),
            this.getProperGeyserStatValue(this.state.dormancyPeriod), this.getProperGeyserStatValue(this.state.eruptionPeriod), this.getProperGeyserStatValue(this.state.activeEruptionPeriod));

        var gList = this.state.geyserList;
        gList.push(g);
        this.setState({ geyserList: gList, eruptionRate: "", activeDormancyPeriod: "", dormancyPeriod: "", eruptionPeriod: "", activeEruptionPeriod: "" });
    }
    render() {

        return (
            <Grid container item className={this.props.classes.root}>
                <Grid container >
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
                                <Typography align='center'>Geyser details such as eruption rates and active times do not need to be added, but entries that include all information will have an icon specifying that.</Typography>
                                <br />
                                <Typography align='center'>Wait! I'm too lazy to add this manually!</Typography>
                                <Typography align='center'>I gotchu! I have written a mod that you can install that will export your maps that you uncover in debug mode to a file that you can upload here with all details.</Typography>
                                <br />
                                <Grid className={this.props.classes.inputsGrid}>
                                    <Button variant="raised" color="primary" className={this.props.classes.singleButton} component={({ innerRef, ...props }) => <Link to={ComponentURL.SeedModImportInfo} {...props} />}>I'm cool and I want to import a world directly from the game, take me there!</Button>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>


                    <Paper className={this.props.classes.paper}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.verifySeed();
                        }}>
                            <Grid className={this.props.classes.paperGrid} container>
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
                                        margin="normal"
                                        InputProps={{
                                            inputProps: { min: 0, max: 2147483647 }
                                        }}
                                        required
                                        disabled={this.state.basicInfoCheckPassed == BasicInfoStatus.PASSED} />

                                    <FormControl className={this.props.classes.textField} required>
                                        <InputLabel htmlFor="game-upgrade" >Game Upgrade</InputLabel>
                                        <Select
                                            value={this.state.gameUpgrade}
                                            onChange={this.handleChange}
                                            disabled={this.state.basicInfoCheckPassed == BasicInfoStatus.PASSED}
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
                                        required
                                        disabled={this.state.basicInfoCheckPassed == BasicInfoStatus.PASSED}
                                        value={this.state.gameVersion}
                                        onChange={this.handleChange}
                                        className={this.props.classes.textField}
                                        margin="normal"
                                        InputProps={{
                                            inputProps: { min: 0, max: 2147483647 }
                                        }} />
                                </Grid>

                                <Grid container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '40px', marginTop: createMuiTheme().spacing.unit, marginBottom: createMuiTheme().spacing.unit }}>
                                    {this.state.basicInfoCheckPassed != BasicInfoStatus.PASSED && !this.state.basicInfoLoading && <Button variant="raised" color="primary" type='submit'>Continue</Button>}
                                    {this.state.basicInfoLoading && <CircularProgress color="primary" size="40px" />}
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>

                    {this.state.basicInfoCheckPassed == BasicInfoStatus.DUPLICATE_FOUND && <Grid container>
                        <Paper className={this.props.classes.paper}>
                            <Grid className={this.props.classes.paperGrid} style={{ paddingTop: createMuiTheme().spacing.unit }} container>
                                <Typography variant="subheading">It looks like someone else has added this seed/version combo!</Typography>
                                <Typography>Editing existing seeds is currenly not supported, but if you think the existing entry is not correct or detailed enough, add your seed with version number lowered by 1.</Typography>
                                <Button variant="raised" color="primary" type='submit' component={({ innerRef, ...props }) => <Link to={"/seeds/" + this.state.seedNumber + "/" + this.state.gameVersion} {...props} />} className={this.props.classes.singleButton}>Go to the existing entry</Button>
                            </Grid>
                        </Paper>
                    </Grid>}

                    {this.state.basicInfoCheckPassed == BasicInfoStatus.PASSED && <Grid container>
                        <Paper className={this.props.classes.paper}>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.addGeyserToTheList();
                            }}>
                                <Grid className={this.props.classes.paperGrid} container>
                                    <Typography variant='subheading'>Add new geyser</Typography>
                                    <Grid item container className={this.props.classes.inputsGrid}>
                                        <FormControl className={this.props.classes.textField} required>

                                            <InputLabel htmlFor="geyser-type">Geyser Type</InputLabel>
                                            <Select
                                                value={this.state.geyserType}
                                                onChange={this.handleChange}

                                                inputProps={{
                                                    name: 'geyserType',
                                                    id: 'geyser-type',
                                                }}>
                                                {Array.from(GeyserProperties).map((element) => (
                                                    <MenuItem key={element[1].geyserType} value={element[1].geyserType}>{element[1].displayName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <TextField
                                            id="eruptionRate"
                                            name="eruptionRate"
                                            label="Eruption rate (g/s)"
                                            type="number"
                                            value={this.state.eruptionRate}
                                            onChange={this.handleChange}
                                            className={this.props.classes.textFieldGeyser}
                                            margin="normal"
                                            InputProps={{
                                                inputProps: { min: 0, max: 200000 }
                                            }} />

                                        <TextField
                                            id="activeEruptionPeriod"
                                            name="activeEruptionPeriod"
                                            label="Erupts for ... s"
                                            type="number"
                                            value={this.state.activeEruptionPeriod}
                                            onChange={this.handleChange}
                                            className={this.props.classes.textFieldGeyser}
                                            margin="normal"
                                            InputProps={{
                                                inputProps: { min: 0, max: 200000 }
                                            }} />

                                        <TextField
                                            id="eruptionPeriod"
                                            name="eruptionPeriod"
                                            label="Every ... s"
                                            type="number"
                                            value={this.state.eruptionPeriod}
                                            onChange={this.handleChange}
                                            className={this.props.classes.textFieldGeyser}
                                            margin="normal"
                                            InputProps={{
                                                inputProps: { min: 0, max: 200000 }
                                            }} />

                                        <TextField
                                            id="activeDormancyPeriod"
                                            name="activeDormancyPeriod"
                                            label="Active for ... cycles"
                                            type="number"
                                            value={this.state.activeDormancyPeriod}
                                            onChange={this.handleChange}
                                            className={this.props.classes.textFieldGeyser}
                                            margin="normal"
                                            InputProps={{
                                                inputProps: { min: 0, max: 200000 }
                                            }} />

                                        <TextField
                                            id="dormancyPeriod"
                                            name="dormancyPeriod"
                                            label="Every ... cycles"
                                            type="number"
                                            value={this.state.dormancyPeriod}
                                            onChange={this.handleChange}
                                            className={this.props.classes.textFieldGeyser}
                                            margin="normal"
                                            InputProps={{
                                                inputProps: { min: 0, max: 200000 }
                                            }} />

                                    </Grid>
                                    <Button variant="raised" color="primary" type='submit' className={this.props.classes.singleButton}>Add</Button>
                                </Grid>
                            </form>
                        </Paper>
                        <SeedGeysers geysers={this.state.geyserList} />
                    </Grid>}


                    {this.state.basicInfoCheckPassed == BasicInfoStatus.PASSED && <Grid container>
                        <Paper className={this.props.classes.paper}>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.uploadSeed();
                            }}>
                                <Grid className={this.props.classes.paperGrid} container style={{ paddingTop: createMuiTheme().spacing.unit }}>
                                    {this.state.geyserList.length >= 10 ? <Typography>All done? Ready to save!</Typography> : <Typography>You need to add at least 10 geysers before you can save.</Typography>}


                                    <Grid container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '40px', marginTop: createMuiTheme().spacing.unit, marginBottom: createMuiTheme().spacing.unit }}>
                                        {!this.state.uploadLoading && <Button variant="raised" color="primary" type='submit' disabled={this.state.geyserList.length < 10}>Upload</Button>}
                                        {this.state.uploadLoading && <CircularProgress color="primary" size="40px" />}
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>}
                </Grid>

                <ErrorSnackbar open={this.state.errorOccured} message="An error has occured." />

            </Grid>);
    }

    uploadSeed = () => {
        this.setState({ uploadLoading: true });

        //todo: refactor to a method
        var geysers: any[] = [];
        this.state.geyserList.forEach((element: Geyser) => {
            geysers.push({
                geyserType: element.type,
                activeDormancyPeriod: element.activeDormancyPeriod,
                dormancyPeriod: element.dormancyPeriod,
                activeEruptionPeriod: element.activeEruptionPeriod,
                eruptionPeriod: element.eruptionPeriod,
                eruptionRate: element.eruptionRate
            })
        });

        var seed: SeedDTO = {
            addedByMod: false,
            seed: this.state.seedNumber,
            gameVersion: {
                gameUpgrade: this.state.gameUpgrade,
                versionNumber: this.state.gameVersion
            },
            geysers: geysers
        }

        var url = "seeds";
        API({ url: url, method: 'post', data: seed, headers: { "Content-Type": "application/json" } })
            .then(res => {
                this.setState({ uploadLoading: false });
                this.props.history.replace(`/seeds/${seed.seed}/${seed.gameVersion.versionNumber}`);
            })
            .catch((error: AxiosError) => {
                this.setState({ errorOccured: true, uploadLoading: false });
            })
    }
};

export default withRouter(withStyles(styles)(SeedAdder));