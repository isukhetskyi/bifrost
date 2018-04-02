import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { RootState } from '../../reducers/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import { GridListTile, GridList, GridListTileBar } from 'material-ui';
import * as StatisticsActions from '../../actions/statistics';
import { PieChart } from 'react-easy-chart';

export namespace StatisticsPage {
    export interface Props extends RouteComponentProps<void> {
        actions: any; // StatisticsActions;
        data: {
            languages: [{key: string, value: number}],
            databases: [{key: string, value: number}],
            frameworks: [{key: string, value: number}]
        };
    }

    export interface State {

    }
}

class StatisticsPage extends React.Component<WithStyles & StatisticsPage.Props, StatisticsPage.State> {
    state = {};

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
                        // data={this.props.data.languages}
                        data={[{key: 'C#', value: 5}, {key: 'JavaScript', value: 3}]}
                    />
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
                        // data={this.props.data.frameworks}
                        data={[{key: 'EntityFramework', value: 4}, {key: 'Angular5', value: 2}]}
                    />
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
                        // data={this.props.data.databases}
                        data={[{key: 'SQL Server', value: 15}, {key: 'MongoDB', value: 8}]}
                    />
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
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: '100%',
        height: 500,
        alignContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
      title: {
          background: 'rgba(0, 0, 0, 0.1);',
          position: 'static',
          color: 'rgba(0, 0, 0, 0.87)',
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
