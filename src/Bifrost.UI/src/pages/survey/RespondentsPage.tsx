import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { StyleRulesCallback, Select } from 'material-ui';
import { RootState } from '../../reducers';
import { bindActionCreators } from 'redux';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { connect } from 'react-redux';
import * as RespondentActions from '../../actions/respondents';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Respondent } from '../../model/model';
import * as axios from 'axios';
import { AppConfigration } from '../../config/config';
import * as csv from 'json2csv';

export namespace RespondentsPage {
    export interface Props extends RouteComponentProps<void> {
        actions: typeof RespondentActions;
    }

    export interface State {
        data: Array<Respondent>;
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

class RespondentsPage extends React.Component<WithStyles & RespondentsPage.Props, RespondentsPage.State> {
    state = {
        data: new Array<Respondent>(),
        ProgrammingLanguages: new Array<[string, string]>(),
        Frameworks: new Array<[string, string]>(),
        Databases: new Array<[string, string]>(),
        SelectedLanguage: -1,
        SelectedFramework: -1,
        SelectedDatabase: -1,
        redirect: false,
        page: 0,
        rowsPerPage: 10,
        counter: 0
    };

    componentDidMount() {
        let thisContext = this;
        axios.default.get(AppConfigration.BASE_API_URL + '/api/respondents/all',
                          {
                            headers: {'Access-Control-Allow-Origin': '*'
                                    , 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
                                },
                            method: 'GET'
            })
            .then(function (response: any) {
                thisContext.setState({ data: response.data.respondents });
                console.log(response);
            }).catch(function (error: any) {
                // tslint:disable-next-line:no-console
                console.error(error);
                alert(error);
        });

        axios.default.get(AppConfigration.BASE_API_URL + '/api/survey/gettechnologies')
        .then(function (response: any) {
            thisContext.setState(
                {
                    ProgrammingLanguages: response.data.technologies.languages.map(
                        (item: any) =>
                            [item.id, item.technologyName])
                });
            thisContext.setState(
                {
                    Databases: response.data.technologies.databases.map(
                        (item: any) =>
                            [item.id, item.technologyName])
                });
            thisContext.setState(
                {
                    Frameworks: response.data.technologies.frameworks.map(
                        (item: any) =>
                            [item.id, item.technologyName])
                });
            thisContext.initializeData();
        })
        .catch(function (error: any) {
            console.log(error);
        });
    }

    handleDropdownChange(e: any, type: string) {
        if (e.target.value as number >= 0) {
            // tslint:disable-next-line:switch-default
            switch (type) {
                case 'language':
                    {
                        this.setState({ SelectedLanguage: e.target.value as number }, this.filter);
                    }
                    break;
                case 'framework':
                    {
                        this.setState({ SelectedFramework: e.target.value as number }, this.filter);
                    }
                    break;
                case 'database':
                    {
                        this.setState({ SelectedDatabase: e.target.value as number }, this.filter);
                    }
                    break;
            }
        }
    }

    filter() {
        let respondents: any;
        let thisContext = this;
        axios.default.get(AppConfigration.BASE_API_URL + '/api/respondents/filter',
                          {
                params: {
                    languageId: this.state.SelectedLanguage,
                    frameworkId: this.state.SelectedFramework,
                    databaseId: this.state.SelectedDatabase
                }
            })
            .then(function (response: any) {
                console.log(response);
                respondents = response.data.respondents;
                thisContext.setState({ data: respondents });
                thisContext.forceUpdate();
            }).catch(function (error: any) {
                // tslint:disable-next-line:no-console
                console.error(error);
            });
    }

    exportCsv() {
        axios.default.get(AppConfigration.BASE_API_URL + '/api/respondents/exporttocsv',
                          {
                params: {
                    languageId: this.state.SelectedLanguage,
                    frameworkId: this.state.SelectedFramework,
                    databaseId: this.state.SelectedDatabase
                }
            })
            .then(function (response: any) {
                let file = csv.parse(response.data.respondents);
                var blob = new Blob([file], { type: 'text/csv;charset=utf-8;' });
                if (navigator.msSaveBlob) { // IE 10+
                    navigator.msSaveBlob(blob, 'respondents.csv');
                } else {
                    let link = document.createElement('a');
                    if (link.download !== undefined) { // feature detection
                        // Browsers that support HTML5 download attribute
                        var url = URL.createObjectURL(blob);
                        link.setAttribute('href', url);
                        link.setAttribute('download', 'respondents.csv');
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }

                console.log(file);
            }).catch(function (error: any) {
                // tslint:disable-next-line:no-console
                console.error(error);
            });
    }

    initializeData() {
        let currentArrayValue = this.state.ProgrammingLanguages;
        currentArrayValue.unshift(['0', 'Choose']);
        this.setState({ ProgrammingLanguages: currentArrayValue });

        currentArrayValue = this.state.Databases;
        currentArrayValue.unshift(['0', 'Choose']);
        this.setState({ Databases: currentArrayValue });

        currentArrayValue = this.state.Frameworks;
        currentArrayValue.unshift(['0', 'Choose']);
        this.setState({ Frameworks: currentArrayValue });
    }

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
                    onChange={(e: any) => this.handleDropdownChange(e, 'language')}
                >
                    {this.state.ProgrammingLanguages.map((item: [string, string], index: number) => {
                        return <option key={index} value={item[0]}>{item[1]}</option>;
                    } )}
                </Select>
                <Select
                    value={this.state.SelectedFramework}
                    native={true}
                    className={this.props.classes.select}
                    onChange={(e: any) => this.handleDropdownChange(e, 'framework')}
                >
                    {this.state.Frameworks.map((item: [string, string], index: number) => {
                        return <option key={index} value={item[0]}>{item[1]}</option>;
                    } )}
                </Select>
                <Select
                    value={this.state.SelectedDatabase}
                    native={true}
                    className={this.props.classes.select}
                    onChange={(e: any) => this.handleDropdownChange(e, 'database')}
                >
                    {this.state.Databases.map((item: [string, string], index: number) => {
                        return <option key={index} value={item[0]}>{item[1]}</option>;
                    } )}
                </Select>
                <Paper className={this.props.classes.root} >
                    <div className={this.props.classes.tableWrapper}>
                        <Table className={this.props.classes.table}>
                            <TableBody>
                                {this.state.data.slice(
                                    this.state.page * this.state.rowsPerPage,
                                    this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((n: any) => {
                                        return (
                                            // tslint:disable-next-line:max-line-length
                                            <TableRow key={n.id.toString()} onClick={(e) => { this.props.history.push('/respondents/' + n.id.toString()); }}>
                                                <TableCell>{n.id.toString()}</TableCell>
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
        // tslint:disable-next-line:semicolon
        )
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