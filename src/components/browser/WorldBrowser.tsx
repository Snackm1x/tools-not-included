import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';

//import { GeyserProperties, IGeyserProperties } from '../../types/geyser-type';
import FilterPanel from '../../components/browser/FilterPanel';
import WorldList from "./WorldList";


export interface Props extends WithStyles<typeof styles> {

}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    worldCards: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

class WorldBrowser extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {

        return (
            <Grid container item className={this.props.classes.root}>
                <FilterPanel />
                <WorldList />
            </Grid>);
    }
};

export default withStyles(styles)(WorldBrowser);