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
import SeedAdder from '../components/adder/SeedAdder';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        },
    });


export interface Props extends WithStyles<typeof styles>, RouteComponentProps<any> {

}

export interface State {
}

class AddSeedPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            loading: true,
            errorOccured: false
        }
    }


    render() {
        return (
            <Grid item container className={this.props.classes.root}>
                <SeedAdder />
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(AddSeedPage));