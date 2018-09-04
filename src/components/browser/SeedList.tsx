import * as React from "react";

import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import { createMuiTheme } from "@material-ui/core/styles";
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
import TableFooter from '@material-ui/core/TableFooter';
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
        const theme = createMuiTheme({});

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page">
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page">
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page">
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }
};

const TablePag = (withStyles(actionsStyles)(TablePaginationActions));


export interface Props extends WithStyles<typeof styles> {
    seeds: Seed[];
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
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap'
    },
    cellNoPadding: {
        padding: '0 !important',
    }
});

class SeedList extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);

        this.state = {
            geyserTypes: [
                GeyserType.GEYSER_COOL_SLUSH,
                GeyserType.GEYSER_WATER,
                GeyserType.VENT_GERMY_PO2,
                GeyserType.VENT_POLLUTED_H2O,
                GeyserType.VENT_COOL_STEAM,
            ],
            page: 0,
            rowsPerPage: 5,
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ geyserTypes: event.target.value });
    };

    handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, page: number) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {

        const { rowsPerPage, page } = this.state;
        const rows = this.props.seeds;

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
                            {Array.from(GeyserProperties).map((element) => (
                                <MenuItem key={element[1].geyserType} value={element[1].geyserType}>
                                    <Checkbox checked={this.state.geyserTypes.indexOf(element[1].geyserType) > -1} />
                                    <ListItemText primary={element[1].displayName} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TablePagination
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePag} />
                </Grid>

                <Table>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Seed) => {
                            var url = "/seed/" + row.seedNumber + "/" + row.gameVersion.versionNumber;
                            return (
                                <TableRow key={row.id} >
                                    <TableCell className={this.props.classes.cellNoPadding}>
                                        <Link to={url} style={{ textDecoration: 'none', width: '100%' }}>
                                            <SeedCard world={row} displayGeyserTypes={this.state.geyserTypes} />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePag} />
                        </TableRow>
                    </TableFooter>
                </Table>


            </Grid>);
    }
};

export default withStyles(styles)(SeedList);