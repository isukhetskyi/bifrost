import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui';
import { Login } from '../../model/model';
import { connect } from 'react-redux';

export namespace SurveyPage {
    export interface Props extends RouteComponentProps<void> {

    }

    export interface State {

    }
}

class SurveyPage extends React.Component<WithStyles & SurveyPage.Props, SurveyPage.State> {
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

function mapStateToProps(state: Login) {
    return {
        //
    };
}

function mapDispatchToProps(dispatch: any) {
    return {

    };
}

export default (withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(SurveyPage)));