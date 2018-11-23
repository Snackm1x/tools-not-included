import * as React from 'react';
import { RouteComponentProps } from 'react-router'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import Seed from '../../types/classes/Seed';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import { SeedDetailsRequestModel, fetchDetailsRequest } from '../../store/seed-browser/actions';
import SeedSummary from '../../components/seed-browser/seed-details/SeedSummary';
import SeedGeysers from '../../components/seed-browser/seed-details/SeedGeysers';
import ErrorSnackbar from 'src/components/ui/ErrorSnackbar';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        },
    });

interface UrlParams {
    seed: string,
    version: string
}

interface PropsFromState {
    loading: boolean,
    seed: Seed,
    errors: string | undefined
}

interface PropsFromDispatch {
    fetchSeedDetails: typeof fetchDetailsRequest
}

type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps
    & WithStyles<typeof styles> & RouteComponentProps<UrlParams>

class SeedDetailsPage extends React.Component<AllProps> {

    constructor(props: AllProps) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSeedDetails({ seedNumber: this.props.match.params.seed, gameVersion: this.props.match.params.version });
    }

    render() {
        if (this.props.seed != undefined) {
            return (
                <Grid item container className={this.props.classes.root}>
                     <SeedSummary seed={this.props.seed} />
                     <SeedGeysers geysers={this.props.seed.geysers} /> 
                 </Grid>
             );
        } else {
            return (
                <div>
                    <Grid item container className={this.props.classes.root} />
                    <ErrorSnackbar open={this.props.errors !== undefined} message="An error has occured. If problem keeps occuring please contact the admin." />
                </div>
            );
        }   
    }
}

const mapStateToProps = ({ seedBrowser }: ApplicationState) => ({
    loading: seedBrowser.details.loading,
    errors: seedBrowser.details.errors,
    seed: seedBrowser.details.seed
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchSeedDetails: (request: SeedDetailsRequestModel) => dispatch(fetchDetailsRequest(request))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SeedDetailsPage));