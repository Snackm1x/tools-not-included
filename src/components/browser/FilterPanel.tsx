import * as React from "react";

import { withStyles, WithStyles, createStyles, createMuiTheme } from '@material-ui/core';
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

//import IGeyserProperties from "../../types/interfaces/IGeyserProperties";

export interface Props extends WithStyles<typeof styles> {

}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        padding: theme.spacing.unit
    },
    paper: {
        width: '100%',
        padding: theme.spacing.unit
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
        marginTop: theme.spacing.unit
    },
    singleButton: {
        margin: theme.spacing.unit
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
    selectedSeed: string;
    selectedEarliestGameVersion: number;
    selectedLatestGameVersion: number;
}

class FilterPanel extends React.Component<Props, FilteringState> {
    constructor(props: Props) {
        super(props);

        this.state = this.loadFilteringState();
    }

    loadFilteringState = (): FilteringState => {
        return {
            selectedGameUpgrades: [],
            selectedSeed: "1234",
            selectedEarliestGameVersion: 1,
            selectedLatestGameVersion: 5
        }
    };

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ selectedGameUpgrades: event.target.value });
    };

    setStateValue = (key: string, value: any) => {
        this.setState(this.state[key], value);
    }

    handleSubmit = () => {
        localStorage.setItem("filteringStateEarliestGameVersion", this.state.selectedEarliestGameVersion.toString());
        localStorage.setItem("filteringStateLatestGameVersion", this.state.selectedLatestGameVersion.toString());
        localStorage.setItem("filteringStateSeed", this.state.selectedSeed.toString());
        localStorage.setItem("filteringStateGameUpgrades", this.state.selectedGameUpgrades.toString());
    }

    handleReset = () => {

    }

    render() {
        return (
            <Grid container item className={this.props.classes.root}>
                <Paper className={this.props.classes.paper}>
                    <form onSubmit={this.handleSubmit}>
                        <Grid className={this.props.classes.paperGrid}>
                            <Grid item container className={this.props.classes.inputsGrid}>
                                <TextField
                                    id="seed"
                                    label="Seed"
                                    type="number"
                                    className={this.props.classes.textField}
                                    margin="normal" />

                                <FormControl className={this.props.classes.textField}>
                                    <InputLabel htmlFor="select-multiple-checkbox" >Game Upgrade</InputLabel>
                                    <Select
                                        multiple
                                        value={this.state.selectedGameUpgrades}
                                        onChange={this.handleChange}
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
                                    className={this.props.classes.textField}
                                    margin="normal" />

                                <TextField
                                    id="gameVersionEnd"
                                    label="Latest game version number"
                                    type="number"
                                    className={this.props.classes.textField}
                                    margin="normal" />
                            </Grid>

                            <Grid style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', marginTop: createMuiTheme().spacing.unit * 3 }}>
                                <Typography>Minimum number of geysers</Typography>
                                <Grid style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', maxWidth: 1000 }}>
                                    {
                                        Array.from(GeyserProperties).map((element) => {
                                            return (
                                                <Grid key={"numberGrid_" + element[0]} style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', width: 180, justifyContent: 'space-between' }}>
                                                    <Typography>{element[1].displayName}:</Typography>
                                                    <TextField
                                                        id={"min_" + element[0]}
                                                        type="number"
                                                        className={this.props.classes.geyserInputNumber}
                                                        margin="normal"
                                                        defaultValue={0}
                                                        inputProps={{ min: "0", max: "5", step: "1" }}
                                                        InputProps={{ disableUnderline: true }} />
                                                </Grid>
                                            );
                                        })
                                    }
                                </Grid>
                            </Grid>
                            <Grid className={this.props.classes.buttonRight}>
                                <Button variant="text" color="default" className={this.props.classes.singleButton} onClick={this.handleReset}>Reset Filters</Button>
                                <Button variant="raised" color="primary" type="submit" className={this.props.classes.singleButton}>Search</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>);
    }
};

export default withStyles(styles)(FilterPanel);