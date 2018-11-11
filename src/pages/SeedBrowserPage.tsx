import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router'
import SeedBrowser from '../components/browser/SeedBrowser';

import { AxiosError } from 'axios';
import handleError from '../api/errorHandler';
import ErrorSnackbar from '../components/ui/ErrorSnackbar';

const styles = () => createStyles({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },
});

export interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> { }

export interface State {
    errorOccured: boolean;
}

class SeedBrowserPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { errorOccured: false}
    }

    componentDidMount() {
        var url = "seeds/all";

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
                    <SeedBrowser onErrorOccured={this.errorOccured}/>
                </Grid>
                <ErrorSnackbar open={this.state.errorOccured} message="An error has occured, the website isn't able to connect to the database right now." />
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(SeedBrowserPage));