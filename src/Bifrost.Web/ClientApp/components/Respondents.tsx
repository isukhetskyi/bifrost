import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactTable from "react-table";
import * as fetch from 'node-fetch';
import "react-table/react-table.css";

class Respondent {
    Id?: number;
    FirstName?: string;
    LastName?: string;
    Age?: number;
    IsEmployed?: boolean;
    Phone?: string;
    Skype?: string;
    Email?: string;
    CreatedShortDate?: string;
}

interface RespondentsState {
    data: Array<Respondent>
}

export class Respondents extends React.Component<RouteComponentProps<{}>, RespondentsState> {
    constructor() {
        super();

        this.state = {
            data: []
        }
    }

    componentDidMount(){
        let respondents: any;
        let thisContext = this;
        const request = fetch.default("http://localhost:5000/Respondents/All")
            .then(function(res){return res.json()})
            .then(function(json){
                console.log(json.data);
                respondents = json.data;
                thisContext.setState({data: respondents});
            });
    }

    public render() {
        const data = this.state.data;
        return <div className="container" style={{width:"100%"}}>
            <h2 className="text-center">Respondents</h2>
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
                        Header: "Age",
                        accessor: "age",
                        maxWidth: 50,
                        style: { "textAlign": "center" },
                        filterMethod: (filter: any, row: any) =>
                            row[filter.id] == filter.value
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
