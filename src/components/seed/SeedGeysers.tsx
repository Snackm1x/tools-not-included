import * as React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import GeyserCard from './GeyserCard';
import Geyser from '../../types/classes/Geyser';


export interface Props extends WithStyles<typeof styles> {
    geysers: Array<Geyser>
}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        display: 'flex',
    },
});

class SeedGeysers extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Grid container className={this.props.classes.root}>
            {
                this.props.geysers.map((item, idx) => {
                    return (
                     <GeyserCard key={idx} geyser={item}/>
                    );
                })
            }
            </Grid>
        );
    }
};


export default withStyles(styles)(SeedGeysers);