import * as React from 'react';
import { withStyles, WithStyles, StyleRulesCallback, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from 'material-ui';
import { RootState } from '../../reducers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RespondentModel } from '../../model/model';
import { getRespondent } from '../../actions/respondent';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import * as axios from 'axios';
import { AppConfigration } from '../../config/config';

export namespace RespondentPage {
    export interface Props {
        actions: any;
    }

    export interface State {
        respondent: RespondentModel;
    }
}

class RespondentPage extends React.Component<WithStyles & RespondentPage.Props, RespondentPage.State> {
    state = {
        respondent: new RespondentModel(),
    };

    componentDidMount() {
        var propsobj = this.props as any;
        let respondentId = propsobj.location.pathname.substring(
            propsobj.location.pathname.lastIndexOf('/') + 1, propsobj.location.pathname.length);
        let context = this;

        axios.default.get(AppConfigration.BASE_API_URL + '/api/respondents/respondent'
            ,             {
                params: {
                        respondentId: respondentId
                    }
                ,
                headers: {
                  'Access-Control-Allow-Origin': '*'
                , 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }})
            .then(function (response: any) {
                context.setState({ respondent: response.data.respondent as RespondentModel });
            })
            .catch(function (error: any) {
                // tslint:disable-next-line:no-console
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={this.props.classes.heading}>Personal Info</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <span className={this.props.classes.h3}>Name: {this.state.respondent.firstName + ' ' + this.state.respondent.lastName}</span>
                            <br/>
                            <span className={this.props.classes.h3}>Age: {this.state.respondent.age}</span>
                            <br/>
                            <span className={this.props.classes.h3}>Address: {this.state.respondent.address}</span>
                         </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={this.props.classes.heading}>Work Experience</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <span className={this.props.classes.h3}>Is employed: {this.state.respondent.isEmployed}</span>
                            <br/>
                            <span className={this.props.classes.h3}>Current possition: {this.state.respondent.currentPossition}</span>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={this.props.classes.heading}>Contact info</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <span className={this.props.classes.h3}>Email: {this.state.respondent.email}</span>
                            <br/>
                            <span className={this.props.classes.h3}>Phone: {this.state.respondent.phone}</span>
                            <br/>
                            <span className={this.props.classes.h3}>Skype: {this.state.respondent.skype}</span>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={this.props.classes.heading}>Education Info</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <span className={this.props.classes.h3}>Place of studying: {this.state.respondent.placeOfStudying}</span>
                            <br/>
                            <span className={this.props.classes.h3}>speciality: {this.state.respondent.speciality}</span>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={this.props.classes.heading}>Other</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <span className={this.props.classes.h3}>Other: {this.state.respondent.otherInfo}</span>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>);
    }
}

const styles: StyleRulesCallback = theme => ({
    root: {
        flexGrow: 1,
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
      h3: {
        display: 'block',
        'font-size': '1.17em',
        'margin-top': '1em',
        'margin-bottom': '1em',
        'margin-left': 0,
        'margin-right': 0,
        'font-weight': 'bold',
      }
});

function mapStateToProps(state: RootState) {
    return {

    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(getRespondent as any, dispatch)
    };
}

export default (withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(RespondentPage)));