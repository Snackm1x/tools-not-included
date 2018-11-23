import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ApplicationState, ConnectedReduxProps } from '../../store';
import { fetchFilteredRequest } from 'src/store/seed-browser/actions';
import Seed from 'src/types/classes/Seed';
import SeedListFilterDTO from '../../services/api/dto/SeedListFilterDTO';
import SeedList from 'src/components/seed-browser/SeedList';
import FilterPanel, { FilteringState } from 'src/components/seed-browser/FilterPanel';
import ErrorSnackbar from 'src/components/ui/ErrorSnackbar';

const styles = () => createStyles({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },
});

export interface Pagination {
    page: number;
    rowsPerPage: number;
}

interface PropsFromState {
    loading: boolean,
    seeds: Seed[],
    totalEntries: number,
    errors: string | undefined
}

interface PropsFromDispatch {
    fetchFilteredRequest: typeof fetchFilteredRequest
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps & WithStyles<typeof styles> 

class SeedBrowserPage extends React.Component<AllProps, Pagination & { filter?:FilteringState}> {
    constructor(props: AllProps) {
        super(props);

        this.state = {page: 0, rowsPerPage: 20}
    }
    
    filteringSubmitted = (filteringState: FilteringState, pagination?:Pagination) => {
        this.setState({filter: filteringState});

        var filterDTO: SeedListFilterDTO = {
            page: pagination != undefined ? pagination.page + 1 : this.state.page + 1, 
            rowsPerPage: pagination != undefined ? pagination.rowsPerPage : this.state.rowsPerPage,
            geysers: [],
            gameUpgrades: []
        };

        //this part is the part where i cry
        //desperately needs rewriting
        if (filteringState.selectedSeed != null) { filterDTO.seed = filteringState.selectedSeed; }
        if (filteringState.selectedEarliestGameVersion != null) { filterDTO.earliestVersionNumber = filteringState.selectedEarliestGameVersion; }
        if (filteringState.selectedLatestGameVersion != null) { filterDTO.latestVersionNumber = filteringState.selectedLatestGameVersion; }

        if (filteringState.selectedGameUpgrades) {
            (filteringState.selectedGameUpgrades as string[]).forEach((element : string) => { filterDTO.gameUpgrades!.push(element) });
        }

        filterDTO.geysers!.push({ type: "GEYSER_CO2", min: filteringState.min_GEYSER_CO2 });
        filterDTO.geysers!.push({ type: "GEYSER_COOL_SLUSH", min: filteringState.min_GEYSER_COOL_SLUSH });
        filterDTO.geysers!.push({ type: "GEYSER_NATGAS", min: filteringState.min_GEYSER_NATGAS });
        filterDTO.geysers!.push({ type: "GEYSER_OIL", min: filteringState.min_GEYSER_OIL });
        filterDTO.geysers!.push({ type: "GEYSER_WATER", min: filteringState.min_GEYSER_WATER });
        filterDTO.geysers!.push({ type: "VOLCANO", min: filteringState.min_VOLCANO });
        filterDTO.geysers!.push({ type: "VOLCANO_MINOR", min: filteringState.min_VOLCANO_MINOR });
        filterDTO.geysers!.push({ type: "VOLCANO_COPPER", min: filteringState.min_VOLCANO_COPPER });
        filterDTO.geysers!.push({ type: "VOLCANO_GOLD", min: filteringState.min_VOLCANO_GOLD });
        filterDTO.geysers!.push({ type: "VOLCANO_IRON", min: filteringState.min_VOLCANO_IRON });

        filterDTO.geysers!.push({ type: "OIL_RESERVOIR", min: filteringState.min_OIL_RESERVOIR });

        filterDTO.geysers!.push({ type: "VENT_CHLORINE", min: filteringState.min_VENT_CHLORINE });
        filterDTO.geysers!.push({ type: "VENT_CO2", min: filteringState.min_VENT_CO2 });
        filterDTO.geysers!.push({ type: "VENT_COOL_STEAM", min: filteringState.min_VENT_COOL_STEAM });
        filterDTO.geysers!.push({ type: "VENT_GERMY_PO2", min: filteringState.min_VENT_GERMY_PO2 });
        filterDTO.geysers!.push({ type: "VENT_HOT_STEAM", min: filteringState.min_VENT_HOT_STEAM });
        filterDTO.geysers!.push({ type: "VENT_HYDROGEN", min: filteringState.min_VENT_HYDROGEN });
        filterDTO.geysers!.push({ type: "VENT_POLLUTED_H2O", min: filteringState.min_VENT_POLLUTED_H2O });
        filterDTO.geysers!.push({ type: "VENT_POLLUTED_PO2", min: filteringState.min_VENT_POLLUTED_PO2 });

        this.props.fetchFilteredRequest(filterDTO);
    }

    changePagination = (pagination: Pagination) => {

        if (pagination.page === this.state.page && pagination.rowsPerPage === this.state.rowsPerPage) {
            return;
        }

        let newPagination: Pagination = { page: this.state.page, rowsPerPage: this.state.rowsPerPage };

        if (this.state.rowsPerPage != pagination.rowsPerPage) {
            newPagination.page = 1;
            newPagination.rowsPerPage = pagination.rowsPerPage;
        } else {
            newPagination.page = pagination.page;
            newPagination.rowsPerPage = pagination.rowsPerPage;
        }

        this.setState({page: newPagination.page, rowsPerPage: newPagination.rowsPerPage})

        if (this.state.filter != undefined) {
            this.filteringSubmitted(this.state.filter, newPagination);
        }      
    }

    render() {
        return (
            <Grid item container className={this.props.classes.root}>
                <FilterPanel onSubmit={this.filteringSubmitted} />
                <SeedList seeds={this.props.seeds} totalEntries={this.props.totalEntries} loading={this.props.loading} page={this.state.page} rowsPerPage={this.state.rowsPerPage} changePagination={this.changePagination} />
                <ErrorSnackbar open={this.props.errors !== undefined} message="An error has occured. If problem keeps occuring please contact the admin." />
            </Grid>
        );
    }
}

const mapStateToProps = ({ seedBrowser }: ApplicationState) => ({
    loading: seedBrowser.list.loading,
    errors: seedBrowser.list.errors,
    seeds: seedBrowser.list.seedList,
    totalEntries: seedBrowser.list.totalEntries
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchFilteredRequest: (filter : SeedListFilterDTO) => dispatch(fetchFilteredRequest(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SeedBrowserPage));