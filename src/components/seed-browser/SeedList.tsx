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

import LocalStorageKeys from "../../constants/LocalStorageKeys";
import { Pagination } from "src/pages/seed-browser/SeedBrowserPage";


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
    totalEntries: number;
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

class SeedList extends React.Component<Props & Pagination & {changePagination: Function}, any> {
    constructor(props: Props & Pagination & {changePagination: Function}) {
        super(props);

        var geysers = this.loadGeyserTypes();

        this.state = {
            geyserTypes: geysers
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
        this.props.changePagination({page: page, rowsPerPage: this.props.rowsPerPage});
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.changePagination({page: this.props.page, rowsPerPage: event.target.value});
    };
  
    render() {

        const pagination = <TablePagination
            style={{ marginLeft: 'auto' }}
            component="div"
            count={this.props.totalEntries}
            rowsPerPage={this.props.rowsPerPage}
            page={this.props.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            ActionsComponent={TablePag}
            rowsPerPageOptions = {[10, 20, 30]}
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
                {!this.props.loading &&  this.props.seeds && <Table>
                    <TableBody>
                        {this.props.seeds.map((row: Seed) => {
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
                </Table>}
                {pagination}
            </Grid>);
    }
};

export default withStyles(styles)(SeedList);