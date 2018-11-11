import * as React from "react";

import { withStyles, WithStyles, createStyles, CircularProgress, createMuiTheme } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Link } from 'react-router-dom'

import { GeyserProperties } from '../../constants/GeyserProperties';
import IGeyserProperties from "../../types/interfaces/IGeyserProperties";
import { GeyserType } from '../../types/enums/GeyserType';
import Seed from '../../types/classes/Seed';
import SeedCard from "./SeedCard";
import { FilteringState } from "./FilterPanel";

import LocalStorageKeys from "../../constants/LocalStorageKeys";
import * as LocalStorage from "../../utils/LocalStorageAccess";
import Loader from "../ui/Loader";


interface PaginationProps extends WithStyles<typeof actionsStyles> {

    count: number,
    onChangePage: Function,
    page: number,
    rowsPerPage: number,
}

const actionsStyles = (theme: Theme) => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

class TablePaginationActions extends React.Component<PaginationProps, any> {
    handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page">
                    <FirstPageIcon />
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page">
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page">
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page">
                    <LastPageIcon />
                </IconButton>
            </div>
        );
    }
};

const TablePag = (withStyles(actionsStyles)(TablePaginationActions));


export interface Props extends WithStyles<typeof styles> {
    seeds: Seed[];
    loading: boolean;
}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
        minWidth: 100,
        width: 100,
        flexGrow: 1
    },
    headerCell: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        marginBottom: theme.spacing.unit
    },
    cellPadding: {
        padding: theme.spacing.unit,
        '&:last-child': {
            paddingRight: theme.spacing.unit
        }
    },
    pagbar: {
        flexFlow: 'row wrap',
        justifyContent: 'center',
    },
});

const defaultGeysers = [
    GeyserType.GEYSER_COOL_SLUSH,
    GeyserType.GEYSER_NATGAS,
    GeyserType.VENT_COOL_STEAM,
    GeyserType.VOLCANO_GOLD
];

class SeedList extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);

        var geysers = this.loadGeyserTypes();

        this.state = {
            geyserTypes: geysers,
            page: 0,
            rowsPerPage: 50,
            rows: this.props.seeds,
            seeds: this.props.seeds,
        };
    }

    loadGeyserTypes(): GeyserType[] {
        var lsGeysers = localStorage.getItem(LocalStorageKeys.SeedListShownGeyserTypes);

        if (lsGeysers === null || lsGeysers.length == 0)
            return defaultGeysers;

        var strings = lsGeysers.split(",");

        return strings.map<GeyserType>(s => GeyserType[s]);
    };

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ geyserTypes: event.target.value });
        localStorage.setItem(LocalStorageKeys.SeedListShownGeyserTypes, event.target.value)
    };

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, page: number) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ rowsPerPage: event.target.value });
    };

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props != prevProps)
            this.setState({seeds: this.props.seeds, rows: this.props.seeds})
        // if (this.props.seeds != prevState.seeds) {
        //     this.setState({ seeds: this.props.seeds });
        //     this.setState({ rows: this.props.seeds });
        //     this.applyFilter();
        // }
        // else if (this.props.filteringProps != prevProps.filteringProps) {
        //     this.applyFilter();
        // }
    }

    isFavorite = (seed: Seed, favorites : string[]): boolean => {
        var seedString = seed.seedNumber + "/" + seed.gameVersion.versionNumber;

        return favorites.indexOf(seedString) > -1;
    }

    // applyFilter() {
    //     if (!this.props.filteringProps)
    //         return;

    //     var filter = this.props.filteringProps;
    //     var filtered = this.state.seeds;

    //     var favorites = LocalStorage.getFavorites();
    //     if (filter.showFavoritesOnly && favorites != null && favorites.length > 0) {
    //         filtered = filtered.filter((s: Seed) => {
    //             return this.isFavorite(s, favorites);
    //         })
    //     }

    //     if (filter.showModAddedOnly) {
    //         filtered = filtered.filter((s: Seed) => {
    //             return s.addedByMod;
    //         })
    //     }

    //     this.setState({ rows: filtered });
    // }

    render() {
        const { rowsPerPage, page } = this.state;
        const rows = this.state.rows;

        const pagination = <TablePagination
            style={{ marginLeft: 'auto' }}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            ActionsComponent={TablePag}
            rowsPerPageOptions = {[25, 50, 100]}
            classes={{
                toolbar: this.props.classes.pagbar
            }} />

        return (
            <Grid container item className={this.props.classes.root}>
                <Grid container className={this.props.classes.headerCell}>
                    <FormControl className={this.props.classes.textField}>
                        <InputLabel htmlFor="select-multiple-checkbox">Show Geyser Types</InputLabel>
                        <Select
                            multiple
                            value={this.state.geyserTypes}
                            onChange={this.handleChange}
                            input={<Input id="select-multiple-checkbox" />}
                            renderValue={selected => ((selected as string[]).map(s => (GeyserProperties.get(GeyserType[s]) as IGeyserProperties).displayName).join(', '))}>
                            {
                                Array.from(GeyserProperties).map((element) => (
                                    <MenuItem key={element[1].geyserType} value={element[1].geyserType}>
                                        <Checkbox checked={this.state.geyserTypes.indexOf(element[1].geyserType) > -1} />
                                        <ListItemText primary={element[1].displayName} />
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    {pagination}
                </Grid>
                {this.props.loading && <CircularProgress size={35} color="primary" />}
                <Table>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Seed) => {
                            var url = "/seeds/" + row.seedNumber + "/" + row.gameVersion.versionNumber;
                            return (
                                <TableRow key={row.id} >
                                    <TableCell className={this.props.classes.cellPadding}>
                                        <Link to={url} style={{ textDecoration: 'none', width: '100%' }}>
                                            <SeedCard world={row} displayGeyserTypes={this.state.geyserTypes} />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {pagination}
            </Grid>);
    }
};

export default withStyles(styles)(SeedList);