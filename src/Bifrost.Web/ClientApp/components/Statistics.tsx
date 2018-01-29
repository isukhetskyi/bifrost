import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { PieChart, Legend } from 'react-easy-chart';
import * as axios from "axios";

interface StatisticsState {
    data: any;
}

export class Statistics extends React.Component<RouteComponentProps<{}>, StatisticsState> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: {databases: [], frameworks: [], languages: []}
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.renderTextualStatistics = this.renderTextualStatistics.bind(this);
    }

    componentDidMount() {
        let statistics: any;
        let thisContext = this;

        axios.default.get("/statistics/all")
        .then(function(response){
            console.log(response.data.statistics);
            thisContext.setState({data: response.data.statistics})
        }).catch(function(error){
            console.log(error);
            alert(error);
        })
    }

    renderTextualStatistics(category: string) {
        let elements: any;
        let collection: Array<object> | undefined;

        if (category === "languages") {
            collection = this.state.data.languages;
        }
        if (category === "databases") {
            collection = this.state.data.databases;
        }
        if (category === "frameworks") {
            collection = this.state.data.frameworks;
        }

        if (!collection) {
            collection = new Array<[number, string]>();
        }

        elements = collection.map((item: any, index: number) =>
            <li key={index}> {item.key} - {item.value} respondent(s) or {item.percentage}% of total number of respondents</li>
        );
        console.log(elements);

        return elements;
    }

    public render() {
        return <div style={{width:"100%"}}>
        <h2 className="text-center">Statistics</h2>
            <div className="panel panel-default">
                <div className="panel-heading">Programming languages</div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-4">
                            <PieChart
                                labels
                                size={400}
                                innerHoleSize={1}
                                data={this.state.data.languages}
                                styles={{
                                    '.chart_text': {
                                        fontSize: '1em',
                                        fill: '#fff'
                                    }
                                }
                            }
                            ></PieChart>
                        </div>
                        <div className="col-md-4">
                            <ul className="center-container">
                                {this.renderTextualStatistics("languages")}
                            </ul>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">Databases</div>
                <div className="panel-body">
                    <div className="row">
                    <div className="col-md-3"></div>
                        <div className="col-md-4">
                            <PieChart
                                labels
                                size={400}
                                innerHoleSize={2}
                                data={this.state.data.databases}
                                styles={{
                                    '.chart_text': {
                                        fontSize: '1em',
                                        fill: '#fff'
                                    }
                                }}
                            />
                        </div>
                        <div className="col-md-4">
                            <ul>
                                {this.renderTextualStatistics("databases")}
                            </ul>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">Frameworks</div>
                <div className="panel-body">
                    <div className="row">
                    <div className="col-md-3"></div>
                        <div className="col-md-4">
                            <PieChart
                                labels
                                size={400}
                                innerHoleSize={3}
                                data={this.state.data.frameworks}
                                styles={{
                                    '.chart_text': {
                                        fontSize: '1em',
                                        fill: '#fff'
                                    }
                                }}
                            />
                        </div>
                        <div className="col-md-4">
                            <ul>
                                {this.renderTextualStatistics("frameworks")}
                            </ul>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
        </div>
    }
}
