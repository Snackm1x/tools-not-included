import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Grid from '@material-ui/core/Grid';

import FilterPanel, { FilteringState } from './FilterPanel';
import SeedList from "./SeedList";
import Seed from '../../types/classes/Seed';

export interface Props extends WithStyles<typeof styles> {
    seeds : Seed[];
}

interface State  {
    filteringState? : FilteringState
}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    worldCards: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

class SeedBrowser extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    filteringSubmitted = (filteringState : FilteringState) => {
        this.setState({filteringState : filteringState})
    }

    render() {

        return (
            <Grid container item className={this.props.classes.root}>
                <FilterPanel onSubmit={this.filteringSubmitted}/>
                <SeedList seeds={this.props.seeds} filteringProps={this.state.filteringState}/>
            </Grid>);
    }
};

export default withStyles(styles)(SeedBrowser);