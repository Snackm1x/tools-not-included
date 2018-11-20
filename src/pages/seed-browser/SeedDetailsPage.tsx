import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import SeedDetails from '../../components/seed-browser/seed-details/SeedDetails';
import Seed from '../../types/classes/Seed';
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router'

import { ApplicationState, ConnectedReduxProps } from 'src/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SeedDetailsRequestModel, fetchDetailsRequest } from 'src/store/seed-browser/actions';

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
        return (
            <Grid item container className={this.props.classes.root}>
                {!this.props.loading && this.props.seed && <SeedDetails seed={this.props.seed} />}
            </Grid>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(SeedDetailsPage)));