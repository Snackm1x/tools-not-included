import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Grid from '@material-ui/core/Grid';

import FilterPanel, { FilteringState } from './FilterPanel';
import SeedList from "./SeedList";
import Seed from '../../types/classes/Seed';
import API from "src/api/api";
import SeedDTO from "src/api/dto/SeedDTO";
import { AxiosError } from "axios";
import handleError from "src/api/errorHandler";

export interface Props extends WithStyles<typeof styles> {
    onErrorOccured: Function;
}

interface State {
    filteringState?: FilteringState;
    seeds: Seed[];
    errorOccured: boolean;
    loading: boolean;
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

        this.state = { seeds: [], errorOccured: false, loading: true };
    }

    filteringSubmitted = (filteringState: FilteringState) => {
        this.downloadSeeds();
        this.setState({ filteringState: filteringState })
    }

    downloadSeeds = () => {
        this.setState({loading: true});
        var url = "seeds";

        API.get<Array<SeedDTO>>(url)
            .then(res => {
                var seeds: Seed[] = [];
                res.data.forEach(element => {
                    var seed = Seed.FromDTO(element);
                    seeds.push(seed);
                });
                this.setState({ seeds: seeds, loading: false });
            })
            .catch((error: AxiosError) => {
                this.props.onErrorOccured(error);
                this.setState({ errorOccured: true, loading: false });
            })
    }

    componentDidMount() {
        this.downloadSeeds();
    }

    render() {
        return (
            <Grid container item className={this.props.classes.root}>
                <FilterPanel onSubmit={this.filteringSubmitted} />
                <SeedList seeds={this.state.seeds} loading={this.state.loading} />
            </Grid>);
    }
};

export default withStyles(styles)(SeedBrowser);