import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import SeedBrowser from '../components/browser/SeedBrowser';


import { connect } from 'react-redux';
import { ApplicationState, ConnectedReduxProps } from '../store';
import SeedListDTO from 'src/api/dto/SeedListDTO';
import { fetchRequest } from 'src/store/browser/actions';
import { Dispatch } from 'redux';
import Seed from 'src/types/classes/Seed';
import SeedListFilterDTO from 'src/api/dto/SeedListFilterDTO';

const styles = () => createStyles({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },
});

export interface Props extends WithStyles<typeof styles> { }

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    loading: boolean,
    seeds: Seed[],
    errors: string | undefined
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
    fetchRequest: typeof fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps & WithStyles<typeof styles>

class SeedBrowserPage extends React.Component<AllProps> {
    constructor(props: AllProps) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchRequest({ page: 1, rowsPerPage: 100 });
    }

    render() {
        return (
            <Grid item container className={this.props.classes.root}>
                <Grid item container>
                    <SeedBrowser seeds={this.props.seeds} loading={this.props.loading}/>
                </Grid>
            </Grid>
        );
    }
}

//export default withStyles(styles)(SeedBrowserPage);

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ browser }: ApplicationState) => ({
    loading: browser.loading,
    errors: browser.errors,
    seeds: browser.seedList
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchRequest: (filter : SeedListFilterDTO) => dispatch(fetchRequest(filter)) //todo
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SeedBrowserPage));