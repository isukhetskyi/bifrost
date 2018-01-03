import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ReactTable from "react-table";
import "react-table/react-table.css";

interface RespondentsState {
    data: any
}

export class Respondents extends React.Component<RouteComponentProps<{}>, RespondentsState> {
    constructor() {
        super();
        this.state = {
            data: {}
        }
    }
    public render() {
        const { data } = this.state.data;
        return <div>
            <ReactTable
                data={data}
                filterable
                defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value}
                columns={[
                    {
                        Header: "ID",
                        accessor: "respondentId"
                    },
                    {
                        Header: "First Name",
                        accessor: "firstName",
                        filterMethod: (filter: any, row: any) =>
                            row[filter.id].startsWith(filter.value)
                    },
                    {
                        Header: "Last Name",
                        accessor: "lastName",
                        filterMethod: (filter: any, row: any) =>
                            row[filter.id].startsWith(filter.value)
                    },
                    {
                        Header: "Age",
                        accessor: "age"
                    },
                    {
                        Header: "Is employed?",
                        accessor: "isEmployed",
                        id: "isEmployed",
                        Cell: ({ value }) => (value == true ? "Yes" : "No"),
                        filterMethod: (filter: any, row: any) => {
                            if (filter.value === "all") {
                                return true;
                            }
                            if (filter.value === "true") {
                                return row[filter.id] == true;
                            }
                            return row[filter.id] == false;
                        }
                    },
                    {
                        Header: "Phone",
                        accessor: "phone",
                        filterMethod: (filter: any, row: any) =>
                            row[filter.id].startsWith(filter.value)
                    },
                    {
                        Header: "Email",
                        accessor: "email",
                        filterMethod: (filter: any, row: any) =>
                            row[filter.id].startsWith(filter.value)
                    },
                    {
                        Header: "Skype",
                        accessor: "skype",
                        filterMethod: (filter: any, row: any) =>
                            row[filter.id].startsWith(filter.value)
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
        </div>
    }
}
