import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactTable from "react-table";
import "react-table/react-table.css";
import * as axios from 'axios';
import { CustomSelect } from "../shared/CustomSelect";
import  { Redirect } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom';
import { Respondent } from "../respondents/Respondent";

class RespondentModel {
    Id?: number;
    FirstName?: string;
    LastName?: string;
    Age?: number;
    IsEmployed?: boolean;
    Phone?: string;
    Skype?: string;
    Email?: string;
    Technologies?: string;
    CreatedShortDate?: string;
}

interface RespondentsState {
    data: Array<RespondentModel>;
    ProgrammingLanguages: Array<[string, string]>;
    Frameworks: Array<[string, string]>;
    Databases: Array<[string, string]>;
    SelectedLanguage: number;
    SelectedFramework: number;
    SelectedDatabase: number;
    redirect: boolean;
}

export class Respondents extends React.Component<RouteComponentProps<{}>, RespondentsState> {
    constructor() {
        super();

        this.state = {
            data: [],
            ProgrammingLanguages: [],
            Frameworks: [],
            Databases: [],
            SelectedLanguage: 0,
            SelectedDatabase: 0,
            SelectedFramework: 0,
            redirect: false
        }

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.initializeData = this.initializeData.bind(this);
        this.filter = this.filter.bind(this);
    }

    componentDidMount() {
        let respondents: any;
        let thisContext = this;

        axios.default.get("/respondents/all")
            .then(function (response) {
                console.log(response);
                respondents = response.data.respondents;
                thisContext.setState({ data: respondents });
            }).catch(function (error) {
                console.error(error);
            });

        axios.default.get("/survey/gettechnologies")
            .then(function (response) {
                thisContext.setState(
                    {
                        ProgrammingLanguages: response.data.technologies.languages.map(
                            (item: any) =>
                                [item.id, item.technologyName])
                    })
                thisContext.setState(
                    {
                        Databases: response.data.technologies.databases.map(
                            (item: any) =>
                                [item.id, item.technologyName])
                    })
                thisContext.setState(
                    {
                        Frameworks: response.data.technologies.frameworks.map(
                            (item: any) =>
                                [item.id, item.technologyName])
                    })
                thisContext.initializeData();
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            })
    }

    handleDropdownChange(e: any, type: string) {
        if (e.target.value as number >= 0) {
            switch (type) {
                case "language":
                    {
                        this.setState({ SelectedLanguage: e.target.value as number }, this.filter)
                    }
                    break;
                case "framework":
                    {
                        this.setState({ SelectedFramework: e.target.value as number }, this.filter)
                    }
                    break;
                case "database":
                    {
                        this.setState({ SelectedDatabase: e.target.value as number }, this.filter)
                    }
                    break;
            }
        }
    }

    filter() {
        let respondents: any;
        let thisContext = this;
        axios.default.get("/respondents/filter",
            {
                params: {
                    languageId: this.state.SelectedLanguage,
                    frameworkId: this.state.SelectedFramework,
                    databaseId: this.state.SelectedDatabase
                }
            })
            .then(function (response) {
                console.log(response);
                respondents = response.data.respondents;
                thisContext.setState({ data: respondents });
                thisContext.forceUpdate();
            }).catch(function (error) {
                console.error(error);
            });
    }

    initializeData() {
        let context = this;
        let currentArrayValue = this.state.ProgrammingLanguages;
        currentArrayValue.unshift(["0", "Choose"])
        this.setState({ ProgrammingLanguages: currentArrayValue })

        currentArrayValue = this.state.Databases;
        currentArrayValue.unshift(["0", "Choose"])
        this.setState({ Databases: currentArrayValue });

        currentArrayValue = this.state.Frameworks;
        currentArrayValue.unshift(["0", "Choose"])
        this.setState({ Frameworks: currentArrayValue });
    }

    public render() {
        const data = this.state.data;

        return <div style={{ width: "100%" }}>
            <h2 className="text-center">Respondents</h2>
            <div className="row" style={{ marginBottom: 30 }}>
                <CustomSelect classes="col-md-4"
                    id="LanguagesSelect"
                    handleDropdownChange={(e: any) => this.handleDropdownChange(e, "language")}
                    options={this.state.ProgrammingLanguages}
                    selectId="LanguageSelect"
                    selectTitle="Programming language filter"
                >
                </CustomSelect>
                <CustomSelect classes="col-md-4"
                    id="FrameworkSelect"
                    handleDropdownChange={(e: any) => this.handleDropdownChange(e, "framework")}
                    options={this.state.Frameworks}
                    selectId="FrameworkSelect"
                    selectTitle="Framework filter"
                >
                </CustomSelect>
                <CustomSelect classes="col-md-4"
                    id="DatabasesSelect"
                    handleDropdownChange={(e: any) => this.handleDropdownChange(e, "database")}
                    options={this.state.Databases}
                    selectId="DatabaseSelect"
                    selectTitle="Database filter"
                >
                </CustomSelect>
            </div>


            <ReactTable
                data={data as any}
                filterable
                defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                getTrProps={(state: any, rowInfo: any, column: any) => {
                    return {
                        onClick: (e: any) => {
                            this.props.history.push("/respondent/"+rowInfo.row.id)
                        }
                    }
                }}
                columns={[
                    {
                        Header: "ID",
                        accessor: "id",
                        filterable: false,
                        sortable: true,
                        maxWidth: 50,
                        style: { "textAlign": "center" }
                    },
                    {
                        Header: "First Name",
                        accessor: "firstName",
                        style: { "textAlign": "center" },
                        filterMethod: (filter: any, row: any) =>
                            row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                    },
                    {
                        Header: "Last Name",
                        accessor: "lastName",
                        style: { "textAlign": "center" },
                        filterMethod: (filter: any, row: any) =>
                            row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                    },
                    {
                        Header: "Is employed?",
                        accessor: "isEmployed",
                        id: "isEmployed",
                        maxWidth: 100,
                        filterable: false,
                        style: { "textAlign": "center" },
                        Cell: ({ value }) => (value == true ? "Yes" : "No"),

                    },
                    {
                        Header: "Phone",
                        accessor: "phone",
                        style: { "textAlign": "center" },
                        maxWidth: 120,
                        filterMethod: (filter: any, row: any) =>
                            row[filter.id].startsWith(filter.value),
                        sortable: false
                    },
                    {
                        Header: "Email",
                        accessor: "email",
                        style: { "textAlign": "center" },
                        filterMethod: (filter: any, row: any) =>
                            row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                    },
                    {
                        Header: "Skype",
                        accessor: "skype",
                        style: { "textAlign": "center" },
                        filterMethod: (filter: any, row: any) =>
                            row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                    },
                    {
                        Header: "Date of submition",
                        accessor: "createdShortDate",
                        style: { "textAlign": "center" },
                        filterMethod: (filter: any, row: any) =>
                            row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                    },
                    {
                        Header: "Actions",
                        accessor: "id",
                        style: {"textAlign": "center"},
                        Cell: ({value})=>{return <NavLink to={"/respondents/respondent/" + value}>View</NavLink>}
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
        </div>
    }
}
