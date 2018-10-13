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
import { Link } from "react-router-dom";
import SeedGeysers from "../seed/SeedGeysers";
import Geyser from "../../types/classes/Geyser";
import { GeyserType } from "../../types/enums/GeyserType";

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});


class SeedModImportInfo extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }


    render() {

        return (
            <Grid container item className={this.props.classes.root}>
                <Grid container >
                    
                </Grid>
            </Grid>);
    }
};

export default withStyles(styles)(SeedModImportInfo);