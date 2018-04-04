import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
    GridList,
    withStyles,
    WithStyles,
    StyleRulesCallback,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Select
} from 'material-ui';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { RespondentModel } from '../../model/model';
import Textarea from 'material-ui/Input/Textarea';

export namespace SurveyPage {
    export interface Props extends RouteComponentProps<void> {

    }

    export interface State {
        respondent: RespondentModel;
    }
}

class SurveyPage extends React.Component<WithStyles & SurveyPage.Props, SurveyPage.State> {

    state = {
        respondent: new RespondentModel(),
    };

    handleChange = (event: any) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    render() {
        return (
            <div>
                <form>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Personal Info</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <GridList cols={4} cellHeight={100}>
                                    <FormControl
                                        style={{ width: '30%' }}
                                        className={this.props.classes.formControl}
                                        error={false}
                                        aria-describedby="name-error-text"
                                    >
                                        <InputLabel htmlFor="name-error">First Name</InputLabel>
                                        <Input
                                            id="name-error"
                                            value={this.state.respondent.firstName}
                                            datatype={'text'}
                                            onChange={this.handleChange}
                                        />
                                        <FormHelperText id="name-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        style={{ width: '30%' }}
                                        className={this.props.classes.formControl}
                                        error={false}
                                        aria-describedby="name-error-text"
                                    >
                                        <InputLabel htmlFor="name-error">Last Name</InputLabel>
                                        <Input
                                            id="name-error"
                                            value={this.state.respondent.firstName}
                                            datatype={'text'}
                                            onChange={this.handleChange}
                                        />
                                        <FormHelperText id="name-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        style={{ width: '30%' }}
                                        className={this.props.classes.formControl}
                                        error={false}
                                        aria-describedby="name-error-text"
                                    >
                                        <InputLabel htmlFor="name-error">Age</InputLabel>
                                        <Input
                                            id="name-error"
                                            value={this.state.respondent.firstName}
                                            datatype={'number'}
                                            onChange={this.handleChange}
                                        />
                                        <FormHelperText id="name-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        style={{ width: '100%' }}
                                        className={this.props.classes.formControl}
                                        error={false}
                                        aria-describedby="name-error-text"
                                    >
                                        <InputLabel htmlFor="name-error">Address</InputLabel>
                                        <Input
                                            id="name-error"
                                            value={this.state.respondent.firstName}
                                            datatype={'text'}
                                            onChange={this.handleChange}
                                        />
                                        <FormHelperText id="name-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                                </GridList>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Work Experience</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography style={{width: '100%'}}>
                                    <FormControl style={{width: '20%'}}>
                                    <Select
                                        native={true}
                                        className={this.props.classes.select}
                                    >
                                        <option value={'Yes'}>Yes</option>
                                        <option value={'No'}>No</option>
                                    </Select>
                                    </FormControl>
                                    <FormControl
                                        style={{ width: '75%' }}
                                        className={this.props.classes.formControl}
                                        error={false}
                                        aria-describedby="name-error-text"
                                    >
                                        <InputLabel htmlFor="name-error">Current position</InputLabel>
                                        <Input
                                            id="name-error"
                                            value={this.state.respondent.firstName}
                                            datatype={'text'}
                                            onChange={this.handleChange}
                                        />
                                        <FormHelperText id="name-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Contact info</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <Typography style={{style: '100%'}}>
                                <FormControl
                                    style={{ width: '30%' }}
                                    className={this.props.classes.formControl}
                                    error={false}
                                    aria-describedby="name-error-text"
                                >
                                    <InputLabel htmlFor="name-error">Phone</InputLabel>
                                    <Input
                                        id="name-error"
                                        value={this.state.respondent.firstName}
                                        datatype={'text'}
                                        onChange={this.handleChange}
                                    />
                                    <FormHelperText id="name-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                </FormControl>
                                <FormControl
                                    style={{ width: '30%' }}
                                    className={this.props.classes.formControl}
                                    error={false}
                                    aria-describedby="name-error-text"
                                >
                                    <InputLabel htmlFor="name-error">Email</InputLabel>
                                    <Input
                                        id="name-error"
                                        value={this.state.respondent.firstName}
                                        datatype={'text'}
                                        onChange={this.handleChange}
                                    />
                                    <FormHelperText id="name-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                </FormControl>
                                <FormControl
                                    style={{ width: '30%' }}
                                    className={this.props.classes.formControl}
                                    error={false}
                                    aria-describedby="name-error-text"
                                >
                                    <InputLabel htmlFor="name-error">Skype</InputLabel>
                                    <Input
                                        id="name-error"
                                        value={this.state.respondent.firstName}
                                        datatype={'number'}
                                        onChange={this.handleChange}
                                    />
                                    <FormHelperText id="name-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                </FormControl>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Education Info</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography style={{width: '100%'}}>
                                    <FormControl
                                        style={{ width: '45%' }}
                                        className={this.props.classes.formControl}
                                        error={false}
                                        aria-describedby="name-error-text"
                                    >
                                        <InputLabel htmlFor="name-error">Place of studying</InputLabel>
                                        <Input
                                            id="name-error"
                                            value={this.state.respondent.firstName}
                                            datatype={'text'}
                                            onChange={this.handleChange}
                                        />
                                        <FormHelperText id="name-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        style={{ width: '45%' }}
                                        className={this.props.classes.formControl}
                                        error={false}
                                        aria-describedby="name-error-text"
                                    >
                                        <InputLabel htmlFor="name-error">Speciality</InputLabel>
                                        <Input
                                            id="name-error"
                                            value={this.state.respondent.firstName}
                                            datatype={'text'}
                                            onChange={this.handleChange}
                                        />
                                        <FormHelperText id="name-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Other</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography style={{width: '100%'}}>
                                <FormControl
                                    style={{ width: '95%' }}
                                    className={this.props.classes.formControl}
                                    error={false}
                                    aria-describedby="name-error-text"
                                >
                                    <InputLabel htmlFor="name-error">Speciality</InputLabel>
                                    <Textarea
                                        id="name-error"
                                        value={this.state.respondent.firstName}
                                        datatype={'text'}
                                        onChange={this.handleChange}
                                    />
                                    <FormHelperText id="name-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                </FormControl>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </form>
            </div>
        );
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
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    none: {
        display: 'none'
    }
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