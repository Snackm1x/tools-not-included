import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import { GameUpgrades } from '../../constants/GameUpgrades';
import { GameUpgrade } from '../../types/enums/GameUpgrade';
import IGameUpgradeDetails from "../../types/interfaces/IGameUpgradeDetails";
import { GeyserProperties } from "../../constants/GeyserProperties";
import LocalStorageKeys from "../../constants/LocalStorageKeys";


//TODO: this component desperately needs rewriting
export interface Props extends WithStyles<typeof styles> {
    onSubmit: Function
}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        padding: theme.spacing.unit,
        margin: theme.spacing.unit,
        paddingBottom: 0
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
        width: 200,
        minWidth: 200,
    },
    geyserInputNumber: {
        margin: theme.spacing.unit,
        width: 25,
        minWidth: 25,
    },
    paperGrid: {
        display: 'flex',
        flexDirection: 'column'
    },
    inputsGrid: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonRight: {
        marginLeft: 'auto',
        alignSelf: 'center'
    },
    singleButton: {
        margin: theme.spacing.unit
    },
    box: {
        padding: theme.spacing.unit
    }
});

const MenuProps = {
    PaperProps: {
        style: {
            width: 250
        },
    },
};

export interface FilteringState {
    selectedGameUpgrades: string[] | string;
    selectedSeed: number | null;
    selectedEarliestGameVersion: number | null;
    selectedLatestGameVersion: number | null;
    min_GEYSER_CO2: number;
    min_GEYSER_COOL_SLUSH: number;
    min_GEYSER_NATGAS: number;
    min_GEYSER_OIL: number;
    min_GEYSER_WATER: number;
    min_VENT_CHLORINE: number;
    min_VENT_CO2: number;
    min_VENT_COOL_STEAM: number;
    min_VENT_GERMY_PO2: number;
    min_VENT_HOT_STEAM: number;
    min_VENT_HYDROGEN: number;
    min_VENT_POLLUTED_H2O: number;
    min_VENT_POLLUTED_PO2: number;
    min_VOLCANO: number;
    min_VOLCANO_COPPER: number;
    min_VOLCANO_GOLD: number;
    min_VOLCANO_IRON: number;
    min_VOLCANO_MINOR: number;
    min_OIL_RESERVOIR: number;
}

class FilterPanel extends React.Component<Props, FilteringState & any> {
    constructor(props: Props) {
        super(props);

        this.state= this.loadFilteringState()

        this.props.onSubmit(this.state);
    }

    getDefaultFilteringState = () : FilteringState => {
        return {
            selectedGameUpgrades: [],
            selectedSeed: null,
            selectedEarliestGameVersion: null,
            selectedLatestGameVersion: null,
            min_GEYSER_CO2: 0,
            min_GEYSER_COOL_SLUSH: 0,
            min_GEYSER_NATGAS: 0,
            min_GEYSER_OIL: 0,
            min_GEYSER_WATER: 0,
            min_VENT_CHLORINE: 0,
            min_VENT_CO2: 0,
            min_VENT_COOL_STEAM: 0,
            min_VENT_GERMY_PO2: 0,
            min_VENT_HOT_STEAM: 0,
            min_VENT_HYDROGEN: 0,
            min_VENT_POLLUTED_H2O: 0,
            min_VENT_POLLUTED_PO2: 0,
            min_VOLCANO: 0,
            min_VOLCANO_COPPER: 0,
            min_VOLCANO_GOLD: 0,
            min_VOLCANO_IRON: 0,
            min_VOLCANO_MINOR: 0,
            min_OIL_RESERVOIR: 0
        }
    }

    loadFilteringState = () : FilteringState => {
        var lsState = localStorage.getItem(LocalStorageKeys.SeedBrowserFilteringState);

        if (lsState === null || lsState.length < 1) {
            return this.getDefaultFilteringState();
        }

        return JSON.parse(lsState);
    };

    handleChange = (key: string) => (event: any) => {
        this.setState({ [key]: event.target.value });
    };

    handleChangeCheckbox = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [name]: event.target.checked });
    };

    handleSubmit = () => {
        localStorage.setItem(LocalStorageKeys.SeedBrowserFilteringState, JSON.stringify(this.state));
        this.setState({page: 1});
        this.props.onSubmit(this.state);
    }

    setDefaultFilteringState = () => {
        var newState = this.getDefaultFilteringState();
        this.setState(newState);
        localStorage.setItem(LocalStorageKeys.SeedBrowserFilteringState, JSON.stringify(newState));
        this.props.onSubmit(newState);
    }

    handleReset = () => {
        this.setDefaultFilteringState();
    }

    render() {
        return (
            <Grid container item className={this.props.classes.root}>
                <Paper className={this.props.classes.paper}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.handleSubmit();
                    }}>
                        <Grid className={this.props.classes.paperGrid}>
                            <Grid item container className={this.props.classes.inputsGrid}>
                                <TextField
                                    id="seed"
                                    label="Seed"
                                    type="number"
                                    value={this.state.selectedSeed ? this.state.selectedSeed : ''}
                                    onChange={this.handleChange("selectedSeed")}
                                    className={this.props.classes.textField}
                                    margin="normal" />

                                <FormControl className={this.props.classes.textField}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Game Upgrade</InputLabel>
                                    <Select
                                        multiple
                                        value={this.state.selectedGameUpgrades}
                                        onChange={this.handleChange("selectedGameUpgrades")}
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => ((selected as string[]).map(s => (GameUpgrades.get(GameUpgrade[s]) as IGameUpgradeDetails).displayName)).join(', ')}
                                        MenuProps={MenuProps}>
                                        {Array.from(GameUpgrades).map((element) => (
                                            <MenuItem key={element[1].upgrade} value={element[1].upgrade}>
                                                <Checkbox checked={this.state.selectedGameUpgrades.indexOf(element[1].upgrade) > -1} />
                                                <ListItemText primary={element[1].displayName} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    id="gameVersionStart"
                                    label="Earliest game version number"
                                    type="number"
                                    value={this.state.selectedEarliestGameVersion ? this.state.selectedEarliestGameVersion : ''}
                                    onChange={this.handleChange("selectedEarliestGameVersion")}
                                    className={this.props.classes.textField}
                                    margin="normal" />

                                <TextField
                                    id="gameVersionEnd"
                                    label="Latest game version number"
                                    type="number"
                                    value={this.state.selectedLatestGameVersion ? this.state.selectedLatestGameVersion : ''}
                                    onChange={this.handleChange("selectedLatestGameVersion")}
                                    className={this.props.classes.textField}
                                    margin="normal" />
                            </Grid>

                            <Grid style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', marginTop: 25 }}>
                                <Typography>Minimum number of geysers</Typography>
                                <Grid style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', maxWidth: 1000 }}>
                                    {
                                        Array.from(GeyserProperties).map((element) => {
                                            return (
                                                <Grid key={"numberGrid_" + element[0]} style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', width: 180, justifyContent: 'space-between' }}>
                                                    <Typography>{element[1].displayName}:</Typography>
                                                    <TextField
                                                        id={"min_" + element[0]}
                                                        value={this.state["min_" + element[0]]}
                                                        onChange={this.handleChange("min_" + element[0])}
                                                        type="number"
                                                        className={this.props.classes.geyserInputNumber}
                                                        margin="normal"
                                                        inputProps={{ min: "0", step: "1" }}
                                                        InputProps={{ disableUnderline: true }} />
                                                </Grid>
                                            );
                                        })
                                    }
                                </Grid>
                            </Grid>

                            <Grid style={{ display: 'flex', flexFlow: 'row wrap', alignContent: 'center' }}>
                                <Grid className={this.props.classes.buttonRight}>
                                    <Button variant="text" color="default" className={this.props.classes.singleButton} onClick={this.handleReset}>Reset Filters</Button>
                                    <Button variant="raised" color="primary" type="submit" className={this.props.classes.singleButton}>Search</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>);
    }
};

export default withStyles(styles)(FilterPanel);