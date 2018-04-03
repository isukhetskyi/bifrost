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
    }
}

class RespondentsPage extends React.Component<WithStyles & RespondentsPage.Props, RespondentsPage.State> {
    state = {
        data: [],
        ProgrammingLanguages: [],
        Frameworks: [],
        Databases: [],
        SelectedLanguage: -1,
        SelectedFramework: -1,
        SelectedDatabase: -1,
        redirect: false,
        page: 0,
        rowsPerPage: 5,
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
                            // tslint:disable-next-line:max-line-length
                            {this.state.data.slice(
                                this.state.page * this.state.rowsPerPage,
                                this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((n: any) => {
                                    return (
                                        <TableRow key={n.id}>
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
                                    // Actions={TablePaginationActionsWrapped}
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