import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { PieChart, Legend } from 'react-easy-chart';
import * as fetch from 'node-fetch';

interface StatisticsState {
    data: any;
}

export class Statistics extends React.Component<RouteComponentProps<{}>, StatisticsState> {
    constructor(props: any) {
        super(props);

        this.state = {
            data: {}
        }

        this.componentWillMount = this.componentWillMount.bind(this);
    }
    componentWillMount(){
        let statistics: any;
        let thisContext = this;
        const request = fetch.default("http://localhost:5000/Statistics/All")
            .then(function(res){return res.json()})
            .then(function(json){
                console.log(json.data);
                statistics = json.data;
                thisContext.setState({data: statistics});
            });
    }

    public render() {
        return <div className="container">
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
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
        </div>
    }



    // constructor() {
    //     super();
    //     this.state = { currentCount: 0 };
    // }

    // public render() {
    //     return <div>
    //         <h1>Statistics</h1>

    //         <p>This is a simple example of a React component.</p>

    //         <p>Current count: <strong>{ this.state.currentCount }</strong></p>

    //         <button onClick={ () => { this.incrementStatistics() } }>Increment</button>
    //     </div>;
    // }

    // incrementStatistics() {
    //     this.setState({
    //         currentCount: this.state.currentCount + 1
    //     });
    // }
}
