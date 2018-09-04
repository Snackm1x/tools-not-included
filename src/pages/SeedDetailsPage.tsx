import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import SeedDetails from '../components/seed/SeedDetails';
import Seed from '../types/classes/Seed';
//import Geyser from '../types/classes/Geyser';
//import { GeyserType } from '../types/enums/GeyserType';
//import { GameUpgrade } from '../types/enums/GameUpgrade';
//import GameVersion from '../types/classes/GameVersion';
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router'

import API from '../api/api';
import SeedDTO from '../api/dto/SeedDTO';

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
    seed?: Seed
}

class SeedDetailsPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        var seed = this.props.match.params.seed;
        var version = this.props.match.params.version;

        var url = "seeds/" + seed + "/" + version;

        API.get<SeedDTO>(url)
            .then(res => {
                var seed = Seed.FromDTO(res.data);
                this.setState({ seed: seed });
            })
            .catch(error => {
                if (error.response.status == 404 || error.response.status == 400) {
                    this.props.history.replace("/404");
                }
            });
    }

    render() {
        return (
            <Grid item container className={this.props.classes.root}>
                <Grid item container>
                    {this.state && this.state.seed && <SeedDetails seed={this.state.seed} />}
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(SeedDetailsPage));