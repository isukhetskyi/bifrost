import * as React from 'react';
import { withStyles, WithStyles, StyleRulesCallback, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from 'material-ui';
import { RootState } from '../../reducers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RespondentModel } from '../../model/model';
import { getRespondent } from '../../actions/respondent';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

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
    render() {
        return (
            <div>
                <ExpansionPanel defaultExpanded>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={this.props.classes.heading}>Personal Info</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <h3>Name: {this.state.respondent.firstName + ' ' + this.state.respondent.lastName}</h3>
                            <br/>
                            <h3>Age: {this.state.respondent.age}</h3>
                            <br/>
                            <h3>Address: {this.state.respondent.address}</h3>
                         </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={this.props.classes.heading}>Work Experience</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <h3>Is employed: {this.state.respondent.isEmployed}</h3>
                            <br/>
                            <h3>Current possition: {this.state.respondent.currentPossition}</h3>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={this.props.classes.heading}>Contact info</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <h3>Email: {this.state.respondent.email}</h3>
                            <br/>
                            <h3>Phone: {this.state.respondent.phone}</h3>
                            <br/>
                            <h3>Skype: {this.state.respondent.skype}</h3>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={this.props.classes.heading}>Education Info</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <h3>Place of studying: {this.state.respondent.placeOfStudying}</h3>
                            <br/>
                            <h3>speciality: {this.state.respondent.speciality}</h3>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={this.props.classes.heading}>Other</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <h3>Other: {this.state.respondent.otherInfo}</h3>
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