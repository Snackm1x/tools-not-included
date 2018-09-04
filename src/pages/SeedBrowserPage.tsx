import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import SeedBrowser from '../components/browser/SeedBrowser';

import Seed from '../types/classes/Seed';
import API from '../api/api';
import SeedDTO from '../api/dto/SeedDTO';


const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row'
        },
    });


export interface Props extends WithStyles<typeof styles> {

}

export interface State {
    seeds: Array<Seed>
}

class SeedBrowserPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { seeds: [] }
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
                this.setState({ seeds: seeds });
            })
    }

    render() {

        return (
            <Grid item container className={this.props.classes.root}>
                <Grid item container>
                    {this.state.seeds && <SeedBrowser seeds={this.state.seeds} />}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(SeedBrowserPage);