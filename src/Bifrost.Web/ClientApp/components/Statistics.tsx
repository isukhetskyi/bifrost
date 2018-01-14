import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { PieChart } from 'react-easy-chart';

interface StatisticsState {
    //currentCount: number;
}

export class Statistics extends React.Component<RouteComponentProps<{}>, StatisticsState> {

    public render() {
        return <div>
            <div className="panel panel-default">
                <div className="panel-heading">Programming languages</div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-4">
                            <PieChart
                                labels
                                size={400}
                                data={[
                                    { key: 'JavaScript', value: 10 },
                                    { key: 'CSharp', value: 3 },
                                    { key: 'TypeScript', value: 2 }
                                ]}
                                styles={{
                                    '.chart_text': {
                                        fontSize: '1em',
                                        fill: '#fff'
                                    }
                                }}
                            />
                        </div>
                        <div className="col-md-4">
                            sumple text
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
                                data={[
                                    { key: 'SQL Server', value: 3 },
                                    { key: 'MySQL', value: 5 },
                                    { key: 'PostgreSQL', value: 2 },
                                    { key: 'MongoDB', value: 4}
                                ]}
                                styles={{
                                    '.chart_text': {
                                        fontSize: '1em',
                                        fill: '#fff'
                                    }
                                }}
                            />
                        </div>
                        <div className="col-md-4">
                            sumple text
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">Programming languages</div>
                <div className="panel-body">
                    <div className="row">
                    <div className="col-md-3"></div>
                        <div className="col-md-4">
                            <PieChart
                                labels
                                size={400}
                                data={[
                                    { key: 'ASP.Net Core', value: 3 },
                                    { key: 'Entity Framework Core', value: 3 },
                                    { key: 'React', value: 4 }
                                ]}
                                styles={{
                                    '.chart_text': {
                                        fontSize: '1em',
                                        fill: '#fff'
                                    }
                                }}
                            />
                        </div>
                        <div className="col-md-4">
                            sumple text
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
