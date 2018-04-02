import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';

export namespace SurveyPage {
    export interface Props extends RouteComponentProps<void> {

    }

    export interface State {

    }
}

class SurveyPage extends React.Component<WithStyles & SurveyPage.Props, SurveyPage.State> {

    state = {};

    render() {
        return(
            <div>
                Survey
            </div>
        );
    }
}

const styles: StyleRulesCallback = theme => ({
    root: {
        width: '100%'
    },
});

function mapStateToProps(state: RootState) {
    return {
        //
    };
}

function mapDispatchToProps(dispatch: any) {
    return {

    };
}

export default (withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(SurveyPage)));