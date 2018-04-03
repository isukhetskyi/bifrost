import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { StyleRulesCallback } from 'material-ui';
import { RootState } from '../../reducers';
import { bindActionCreators } from 'redux';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { connect } from 'react-redux';
import * as RespondenceActions from '../../model/model';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
// import * as TablePaginationActionsWrapped from '../../components/TablePagination';

export namespace RespondentsPage {
    export interface Props extends RouteComponentProps<void> {
        actions: any; // StatisticsActions;
    }

    export interface State {
        data: Array<RespondenceActions.Respondent>;
        ProgrammingLanguages: Array<[string, string]>;
        Frameworks: Array<[string, string]>;
        Databases: Array<[string, string]>;
        SelectedLanguage: number;
        SelectedFramework: number;
        SelectedDatabase: number;
        redirect: boolean;
        page: number;
        rowsPerPage: number;
        counter: number;
    }
}

let counter: number;
counter = 0;

function createData (name: string, calories: number, fat: number): any {
    counter += 1;
    return { id: counter, name, calories, fat };
    }

class RespondentsPage extends React.Component<WithStyles & RespondentsPage.Props, RespondentsPage.State> {
    state = {
        data: [createData('Cupcake', 305, 3.7),
        createData('Donut', 452, 25.0),
        createData('Eclair', 262, 16.0),
        createData('Frozen yoghurt', 159, 6.0),
        createData('Gingerbread', 356, 16.0),
        createData('Honeycomb', 408, 3.2),
        createData('Ice cream sandwich', 237, 9.0),
        createData('Jelly Bean', 375,   0.0),
        createData('KitKat',   518,   26.0),
        createData('Lollipop',   392,   0.2),
        createData('Marshmallow',   318,   0),
        createData('Nougat',   360,   19.0),
        createData('Oreo',   437,   18.0)],
        ProgrammingLanguages: [],
        Frameworks: [],
        Databases: [],
        SelectedLanguage: -1,
        SelectedFramework: -1,
        SelectedDatabase: -1,
        redirect: false,
        page: 0,
        rowsPerPage: 10,
        counter: 0
    };

    handleChangePage = (event: any, page: number) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (event: any) => {
        this.setState({ rowsPerPage: event.target.value });
    };
    emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.data.length - this.state.page * this.state.rowsPerPage);
    render() {
        return (
            <Paper className={this.props.classes.root} >
                <div className={this.props.classes.tableWrapper}>
                    <Table className={this.props.classes.table}>
                        <TableBody>
                            {this.state.data.slice(
                                this.state.page * this.state.rowsPerPage,
                                this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((n: any) => {
                                    return (
                                        <TableRow key={n.id} onClick={(e) => {console.log(e.currentTarget); }}>
                                            <TableCell>{n.name}</TableCell>
                                            <TableCell numeric>{n.calories}</TableCell>
                                            <TableCell numeric>{n.fat}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {this.emptyRows > 0 && (
                                <TableRow style={{ height: 48 * this.emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={this.state.data.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
      </Paper >
        );
    }
}

const style: StyleRulesCallback = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
        overflowY: 'auto'
    },
});

function mapStateToProps(state: RootState) {
    return {

    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(RespondenceActions as any, dispatch)
    };
}

export default (withStyles(style)<{}>(connect(mapStateToProps, mapDispatchToProps)(RespondentsPage)));