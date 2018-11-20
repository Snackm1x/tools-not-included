import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import SeedBrowser from '../../components/seed-browser/SeedBrowser';


import { connect } from 'react-redux';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import { fetchFilteredRequest } from 'src/store/seed-browser/actions';
import { Dispatch } from 'redux';
import Seed from 'src/types/classes/Seed';
import SeedListFilterDTO from '../../services/api/dto/SeedListFilterDTO';

const styles = () => createStyles({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },
});

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

class SeedBrowserPage extends React.Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchFilteredRequest({ page: 1, rowsPerPage: 100 });
    }

    render() {
        return (
            <Grid item container className={this.props.classes.root}>
                <Grid item container>
                    <SeedBrowser seeds={this.props.seeds} totalEntries={this.props.totalEntries} loading={this.props.loading}/>
                </Grid>
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