import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactTable from "react-table";
import "react-table/react-table.css";
import * as axios from 'axios';
import { CustomSelect } from "./shared/CustomSelect";

class Respondent {
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
    data: Array<Respondent>;
    ProgrammingLanguages: Array<[string, string]>;
    Frameworks: Array<[string, string]>;
    Databases: Array<[string, string]>;
}

export class Respondents extends React.Component<RouteComponentProps<{}>, RespondentsState> {
    constructor() {
        super();

        this.state = {
            data: [],
            ProgrammingLanguages:[],
            Frameworks:[],
            Databases:[]
        }

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.initializeData = this.initializeData.bind(this);
    }

    componentDidMount(){
        let respondents: any;
        let thisContext = this;

        axios.default.get("/respondents/all")
            .then(function(response){
                console.log(response);
                respondents = response.data.respondents;
                thisContext.setState({data: respondents});
            }).catch(function(error){
                console.error(error);
            });

        axios.default.get("/survey/gettechnologies")
            .then(function(response){
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
            .catch(function(error){
                console.log(error);
                alert(error);
            })
    }

    handleDropdownChange(e: any){
        if(e.target.value as number >= 0){
            console.log(e.target.options[e.target.selectedIndex].text);
        }
    }

    initializeData(){
        let context = this;
        let currentArrayValue = this.state.ProgrammingLanguages;
        currentArrayValue.unshift(["0", "Choose"])
        this.setState({ProgrammingLanguages: currentArrayValue})

        currentArrayValue = this.state.Databases;
        currentArrayValue.unshift(["0", "Choose"])
        this.setState({Databases: currentArrayValue});

        currentArrayValue = this.state.Frameworks;
        currentArrayValue.unshift(["0", "Choose"])
        this.setState({Frameworks: currentArrayValue});
    }


    public render() {
        const data = this.state.data;

        return <div style={{width:"100%"}}>
            <h2 className="text-center">Respondents</h2>
                <div className="row" style={{marginBottom: 30}}>
                    <CustomSelect classes="col-md-4"
                    id="LanguagesSelect"
                    handleDropdownChange={this.handleDropdownChange}
                    options={this.state.ProgrammingLanguages}
                    selectId="LanguageSelect"
                    selectTitle="Programming language filter"
                    >
                </CustomSelect>
                <CustomSelect classes="col-md-4"
                    id="FrameworkSelect"
                    handleDropdownChange={this.handleDropdownChange}
                    options={this.state.Frameworks}
                    selectId="FrameworkSelect"
                    selectTitle="Framework filter"
                    >
                </CustomSelect>
                <CustomSelect classes="col-md-4"
                    id="DatabasesSelect"
                    handleDropdownChange={this.handleDropdownChange}
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
                        Header: "Technologies",
                        accessor: "technologies",
                        style: { "textAlign": "center" },
                        /// <reference path="TechnologiesFilter" />

                        filterMethod: (filter: any, row: any) =>
                            (row[filter.id].toLowerCase() as string).indexOf(filter.value.toLowerCase() as string) >= 0
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
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
        </div>
    }
}
