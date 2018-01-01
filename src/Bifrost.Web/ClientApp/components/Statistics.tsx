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
                        <div>
                            <PieChart
                                labels
                                size={400}
                                data={[
                                    { key: 'JavaScript', value: 100 },
                                    { key: 'CSharp', value: 200 },
                                    { key: 'TypeScript', value: 50 }
                                ]}
                                styles={{
                                    '.chart_text': {
                                        fontSize: '1em',
                                        fill: '#fff'
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">Programming languages</div>
                <div className="panel-body">
                    <div className="row">
                        <div>
                            <PieChart
                                labels
                                size={400}
                                data={[
                                    { key: 'SQL Server', value: 100 },
                                    { key: 'MySQL', value: 200 },
                                    { key: 'PostgreSQL', value: 50 }
                                ]}
                                styles={{
                                    '.chart_text': {
                                        fontSize: '1em',
                                        fill: '#fff'
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">Programming languages</div>
                <div className="panel-body">
                    <div className="row">
                        <div>
                            <PieChart
                                labels
                                size={400}
                                data={[
                                    { key: 'ASP.Net Core', value: 100 },
                                    { key: 'Entity Framework Core', value: 200 },
                                    { key: 'React', value: 50 }
                                ]}
                                styles={{
                                    '.chart_text': {
                                        fontSize: '1em',
                                        fill: '#fff'
                                    }
                                }}
                            />
                        </div>
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
