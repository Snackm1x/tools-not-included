import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router'
import SeedBrowser from '../components/browser/SeedBrowser';

import Seed from '../types/classes/Seed';
import API from '../api/api';
import SeedDTO from '../api/dto/SeedDTO';
import { AxiosError } from 'axios';
import handleError from '../api/errorHandler';
import ErrorSnackbar from '../components/ui/ErrorSnackbar';
import Loader from '../components/ui/Loader';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
        },
    });

export interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> { }

export interface State {
    seeds: Array<Seed>;
    errorOccured: boolean;
    loading: boolean;
}

class SeedBrowserPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { seeds: [], errorOccured: false, loading: true }
    }

    componentDidMount() {
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
                handleError(error, this.props.history);
                this.setState({ errorOccured: true, loading: false });
            })
    }

    render() {
        return (
            <Grid item container className={this.props.classes.root}>
                <Grid item container>
                    {this.state.seeds && <SeedBrowser seeds={this.state.seeds} />}
                </Grid>
                <ErrorSnackbar open={this.state.errorOccured} message="An error has occured, the website isn't able to connect to the database right now." />
                <Loader loading={this.state.loading}/>
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(SeedBrowserPage));