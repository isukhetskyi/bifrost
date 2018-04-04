import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { StyleRulesCallback, Select } from 'material-ui';
import { RootState } from '../../reducers';
import { bindActionCreators } from 'redux';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { connect } from 'react-redux';
import * as RespondentActions from '../../model/model';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

export namespace RespondentsPage {
    export interface Props extends RouteComponentProps<void> {
        actions: any; // StatisticsActions;
    }

    export interface State {
        data: Array<RespondentActions.Respondent>;
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

function createData(
    iden: number,
    firstName: string,
    lastName: string,
    isEmployed: boolean,
    phone: string,
    email: string,
    skype: string,
    dateOfSubmition: string): any {
    counter += 1;
    return {
        id: counter,
        iden,
        firstName,
        lastName,
        isEmployed,
        phone,
        email,
        skype,
        dateOfSubmition
    };
}

class RespondentsPage extends React.Component<WithStyles & RespondentsPage.Props, RespondentsPage.State> {
    state = {
        data: [createData(1, 'John', 'Doe', false, '0333333333', 'jdoe@gmail.com', 'doujohn', '2017-03-18'),
        createData(1, 'Jane', 'Doe', true, '05555555555', 'janedoe@gmail.com', 'doujohnyo', '2017-03-18')
        ],
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
            <div>
                <Select
                    value={this.state.SelectedLanguage}
                    native={true}
                    className={this.props.classes.select}
                >
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </Select>
                <Select
                    value={this.state.SelectedLanguage}
                    native={true}
                    className={this.props.classes.select}
                >
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </Select>
                <Select
                    value={this.state.SelectedLanguage}
                    native={true}
                    className={this.props.classes.select}
                >
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </Select>
                <Paper className={this.props.classes.root} >
                    <div className={this.props.classes.tableWrapper}>
                        <Table className={this.props.classes.table}>
                            <TableBody>
                                {this.state.data.slice(
                                    this.state.page * this.state.rowsPerPage,
                                    this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((n: any) => {
                                        return (
                                            <TableRow key={n.id.toString()} onClick={(e) => { this.props.history.push('/respondents/1'); }}>
                                                <TableCell>{n.iden.toString()}</TableCell>
                                                <TableCell>{n.firstName}</TableCell>
                                                <TableCell>{n.lastName}</TableCell>
                                                <TableCell>{n.isEmployed}</TableCell>
                                                <TableCell>{n.phone}</TableCell>
                                                <TableCell>{n.skype}</TableCell>
                                                <TableCell>{n.dateOfSubmition}</TableCell>
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
            </div>
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
    select: {
        width: 'calc(30%)',
        padding: 5,
        margin: 5
    }
});

function mapStateToProps(state: RootState) {
    return {

    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(RespondentActions as any, dispatch)
    };
}

export default (withStyles(style)<{}>(connect(mapStateToProps, mapDispatchToProps)(RespondentsPage)));