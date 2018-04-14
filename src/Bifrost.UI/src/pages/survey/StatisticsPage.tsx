import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { RootState } from '../../reducers/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import { GridListTile, GridList, GridListTileBar } from 'material-ui';
import * as StatisticsActions from '../../actions/statistics';
import { PieChart } from 'react-easy-chart';
import * as axios from 'axios';
import { AppConfigration } from '../../config/config';

export namespace StatisticsPage {
    export interface Props extends RouteComponentProps<void> {
        actions: any; // StatisticsActions;

    }

    export interface State {
        data: {
            languages: Array<{ key: string; value: number; }>,
            frameworks: Array<{ key: string; value: number; }>,
            databases: Array<{ key: string; value: number; }>
        };
    }
}

class StatisticsPage extends React.Component<WithStyles & StatisticsPage.Props, StatisticsPage.State> {
    state = {
        data: {
            languages: new Array<{ key: string; value: number; }>() ,
            frameworks: new Array<{ key: string; value: number; }>() ,
            databases: new Array<{ key: string; value: number; }>()
    }
    };

    componentDidMount() {
        let thisContext = this;

        axios.default.get(AppConfigration.BASE_API_URL + '/api/statistics/all')
        .then(function(response: any) {
            thisContext.setState({data: response.data.statistics});
        }).catch(function(error: any) {
            console.log(error);
            alert(error);
        });
    }

    renderTextualStatistics(category: string) {
        let elements: any;
        let collection: Array<object> | undefined;

        if (category === 'languages') {
            collection = this.state.data.languages;
        }
        if (category === 'databases') {
            collection = this.state.data.databases;
        }
        if (category === 'frameworks') {
            collection = this.state.data.frameworks;
        }

        if (!collection) {
            collection = new Array<[number, string]>();
        }

        elements = collection.map((item: any, index: number) =>
            <div key={index}> {item.key} - {item.value} respondent(s) or {item.percentage}% of total number of respondents</div>
        );

        return elements;
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <GridList cellHeight={500}  spacing={1} cols={1} className={this.props.classes.gridList}>
                    <GridListTile>
                    <GridListTileBar
                        title={'Programming languages'}
                        titlePosition={'top'}
                        className={this.props.classes.title}
                    />
                    <PieChart
                        labels
                        size={400}
                        innerHoleSize={1}
                        data={this.state.data.languages as [{ key: string; value: number; }]}
                        // data={[{key: 'C#', value: 5}, {key: 'JavaScript', value: 3}]}
                    />
                        {this.renderTextualStatistics('languages')}
                    </GridListTile>
                </GridList>
                <GridList cellHeight={500}  spacing={1} cols={1} className={this.props.classes.gridList}>
                    <GridListTile cols={1} rows={1}>
                    <GridListTileBar
                        title={'Frameworks and libraries'}
                        titlePosition={'top'}
                        className={this.props.classes.title}
                    />
                    <PieChart
                        labels
                        size={400}
                        innerHoleSize={2}
                        data={this.state.data.frameworks as [{ key: string; value: number; }]}
                        // data={[{key: 'EntityFramework', value: 4}, {key: 'Angular5', value: 2}]}
                    />
                    {this.renderTextualStatistics('frameworks')}
                    </GridListTile>
                </GridList>
                <GridList cellHeight={500}  spacing={1} cols={1} className={this.props.classes.gridList}>
                    <GridListTile cols={1} rows={1}>
                    <GridListTileBar
                        title={'Databases'}
                        titlePosition={'top'}
                        className={this.props.classes.title}
                    />
                    <PieChart
                        labels
                        size={400}
                        innerHoleSize={3}
                        data={this.state.data.databases as [{ key: string; value: number; }]}
                        // data={[{key: 'SQL Server', value: 15}, {key: 'MongoDB', value: 8}]}
                    />
                    {this.renderTextualStatistics('databases')}
                    </GridListTile>
                </GridList>
            </div>
        );
    }
}

const style: StyleRulesCallback = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        maxHeight: '100%',
        overflow: 'auto',
        color: 'black',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: '100%',
        minHeight: 600,
        alignContent: 'center',
        textAlign: 'center',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        overflow: 'unset',
      },
      title: {
          background: 'rgba(0, 0, 0, 0.1);',
          position: 'static',
          color: 'rgba(0, 0, 0, 0.87)'
      }
});

function mapStateToProps(state: RootState) {
    return {

    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(StatisticsActions as any, dispatch)
    };
}

export default (withStyles(style)<{}>(connect(mapStateToProps, mapDispatchToProps)(StatisticsPage)));
