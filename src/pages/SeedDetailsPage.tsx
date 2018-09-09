import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import SeedDetails from '../components/seed/SeedDetails';
import Seed from '../types/classes/Seed';
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router'

import API from '../api/api';
import SeedDTO from '../api/dto/SeedDTO';
import Loader from '../components/ui/Loader';
import handleError from '../api/errorHandler';
import { AxiosError } from 'axios';
import ErrorSnackbar from '../components/ui/ErrorSnackbar';

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
    version: number
}

export interface Props extends WithStyles<typeof styles>, RouteComponentProps<UrlParams> {

}

export interface State {
    seed?: Seed;
    loading: boolean;
    errorOccured: boolean;
}

class SeedDetailsPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            loading: true,
            errorOccured: false
        }
    }

    componentDidMount() {
        var seed = this.props.match.params.seed;
        var version = this.props.match.params.version;

        var url = "seeds/" + seed + "/" + version;

        API.get<SeedDTO>(url)
            .then(res => {
                var seed = Seed.FromDTO(res.data);
                this.setState({ seed: seed,  loading: false });
            })
            .catch((error: AxiosError) => {
                handleError(error, this.props.history);
                this.setState({ errorOccured: true, loading: false });
            });
    }

    render() {
        return (
            <Grid item container className={this.props.classes.root}>
                {!this.state.loading && this.state.seed && <SeedDetails seed={this.state.seed} />}
                <Loader loading={this.state.loading} />
                <ErrorSnackbar open={this.state.errorOccured} message="An error has occured, the website isn't able to connect to the database right now." />
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(SeedDetailsPage));