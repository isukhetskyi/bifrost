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
    Select,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormLabel,
    Button
} from 'material-ui';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Textarea from 'material-ui/Input/Textarea';
import * as axios from 'axios';
import { AppConfigration } from '../../config/config';

export namespace SurveyPage {
    export interface Props extends RouteComponentProps<void> {

    }

    export interface State {
        FirstName: string;
        LastName: string;
        Age?: number;
        Address: string;
        IsEmployed: boolean;
        CurrentPosition: string;
        Phone?: string;
        Email?: string;
        Skype?: string;
        PlaceOfStudying?: string;
        Speciality?: string;
        Other?: string;
        // work experience
        ProgrammingLanguagesCheckboxes: Array<object>;
        FrameworksCheckboxes: Array<object>;
        DatabasesCheckboxes: Array<object>;
        Technologies?: Array<number>;
        isDone: boolean;
    }
}

class SurveyPage extends React.Component<WithStyles & SurveyPage.Props, SurveyPage.State> {

    state = {
        FirstName: '',
        LastName: '',
        Age: -1,
        Address: '',
        IsEmployed: false,
        CurrentPosition: '',
        Phone: '',
        Email: '',
        Skype: '',
        PlaceOfStudying: '',
        Speciality: '',
        Other: '',
        ProgrammingLanguagesCheckboxes: [],
        FrameworksCheckboxes: [],
        DatabasesCheckboxes: [],
        Technologies: new Array<number>(),
        isDone: false,
    };

    componentDidMount() {
        let thisContext = this;

        axios.default.get(AppConfigration.BASE_API_URL + '/api/survey/gettechnologies')
        .then(function(response: any) {
                thisContext.setState({ ProgrammingLanguagesCheckboxes: response.data.technologies.languages });
                thisContext.setState({ FrameworksCheckboxes: response.data.technologies.frameworks });
                thisContext.setState({ DatabasesCheckboxes: response.data.technologies.databases });
                console.log(thisContext.state);
        })
        .catch(function(error: any) {
            console.log(error);
        });
    }

    handleChange = (event: any) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleChackboxChange(e: any) {
        if (e.target.checked) {
        let newArray = this.state.Technologies;
        if (!newArray) {
            newArray = new Array<number>();
        }

        newArray.push(e.target.value);
        this.setState({ Technologies: newArray });
        } else {
            if (!!this.state.Technologies) {
                let newArray = this.state.Technologies;
                let index = this.state.Technologies.indexOf(e.target.value, 0);
                if (index > -1) {
                    newArray.splice(index, 1);
                }
                this.setState({ Technologies: newArray });
            }
        }
        console.log(this.state.Technologies);
    }

    renderCheckboxes(type: string) {
        let elements: any;

        let collection: any;
        let datatype = 'checkbox-';
        if (type === 'ProgrammingLanguagesCheckboxes') {
            collection = this.state.ProgrammingLanguagesCheckboxes;
            datatype += 'programminglanguage';
        }
        if (type === 'FrameworksCheckboxes') {
            collection = this.state.FrameworksCheckboxes;
            datatype += 'framework';
        }
        if (type === 'DatabasesCheckboxes') {
            collection = this.state.DatabasesCheckboxes;
            datatype += 'database';
        }

        if (!collection) {
            collection = {};
        }

        elements = collection.map((item: any, index: number) => {
            // tslint:disable-next-line:jsx-wrap-multiline
            return <FormControlLabel
                key={index}
                control={
                    <Checkbox
                        value={item.id.toString()}
                        datatype={datatype}
                        onChange={e => this.handleChackboxChange(e)}
                    />
                }
                label={item.technologyName}
            />;
        });

        return elements;
    }

    handleSubmit() {
        let thisContext = this;

        axios.default.post(AppConfigration.BASE_API_URL + '/api/survey/survey',
        this.state,
        {
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'text/html,application/xhtml+xml,application/xml,text/csv;q=0.9,image/webp,image/apng,*/*;q=0.8'}
        })
        .then(function(response: any) {
            console.log(response);
            thisContext.setState({isDone: true});
        })
        .catch(function(error: any) {
            // tslint:disable-next-line:no-console
            console.error(error);
        });
    }

    handleKeyPress(e: any) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit()} onKeyPress={e => this.handleKeyPress(e)}>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Personal Info</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <GridList cols={4} cellHeight={100}>
                                <FormControl
                                    style={{ width: '30%' }}
                                    className={this.props.classes.formControl}
                                    error={false}
                                    aria-describedby="FirstName-error-text"
                                >
                                    <InputLabel htmlFor="FirstName">First Name</InputLabel>
                                    <Input
                                        id="FirstName"
                                        datatype={'text'}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <FormHelperText id="FirstName-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                </FormControl>
                                <FormControl
                                    style={{ width: '30%' }}
                                    className={this.props.classes.formControl}
                                    error={false}
                                    aria-describedby="LastName-error-text"
                                >
                                    <InputLabel htmlFor="LastName">Last Name</InputLabel>
                                    <Input
                                        id="LastName"
                                        datatype={'text'}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <FormHelperText id="LastName-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                </FormControl>
                                <FormControl
                                    style={{ width: '30%' }}
                                    className={this.props.classes.formControl}
                                    error={false}
                                    aria-describedby="Age-error-text"
                                >
                                    <InputLabel htmlFor="Age">Age</InputLabel>
                                    <Input
                                        id="Age"
                                        datatype={'number'}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <FormHelperText id="Age-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                </FormControl>
                                <FormControl
                                    style={{ width: '100%' }}
                                    className={this.props.classes.formControl}
                                    error={false}
                                    aria-describedby="Address-error-text"
                                >
                                    <InputLabel htmlFor="Address">Address</InputLabel>
                                    <Input
                                        id="Address"
                                        datatype={'text'}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <FormHelperText id="Address-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                </FormControl>
                                <FormControl style={{ width: '20%' }}>
                                    <Select
                                        native={true}
                                        className={this.props.classes.select}
                                        defaultValue={'No'}
                                        onChange={() => { this.setState({IsEmployed: !this.state.IsEmployed}); }}
                                    >
                                        <option value={'Yes'}>Yes</option>
                                        <option value={'No'}>No</option>
                                    </Select>
                                </FormControl>
                                <FormControl
                                    style={{ width: '75%' }}
                                    className={this.props.classes.formControl}
                                    error={false}
                                    aria-describedby="CurrentPosition-error-text"
                                >
                                    <InputLabel htmlFor="CurrentPosition">Current position</InputLabel>
                                    <Input
                                        id="CurrentPosition"
                                        datatype={'text'}
                                        disabled={!this.state.IsEmployed}
                                        onChange={e => this.handleChange(e)}
                                    />
                                    <FormHelperText id="CurrentPosition-error-text" className={this.props.classes.none}>Error</FormHelperText>
                                </FormControl>
                            </GridList>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Work Experience</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FormGroup style={{width: '30%'}}>
                                <FormLabel>
                                    Languages
                                </FormLabel>
                                {this.renderCheckboxes('ProgrammingLanguagesCheckboxes')}
                            </FormGroup>
                            <FormGroup style={{width: '30%'}}>
                                <FormLabel>
                                    Frameworks
                                </FormLabel>
                                {this.renderCheckboxes('FrameworksCheckboxes')}
                            </FormGroup>
                            <FormGroup style={{width: '30%'}}>
                                <FormLabel>
                                    Databases
                                </FormLabel>
                                {this.renderCheckboxes('DatabasesCheckboxes')}
                            </FormGroup>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Contact info</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{ style: '100%' }}>
                            <FormControl
                                style={{ width: '30%' }}
                                className={this.props.classes.formControl}
                                error={false}
                                aria-describedby="Phone-error-text"
                            >
                                <InputLabel htmlFor="Phone">Phone</InputLabel>
                                <Input
                                    id="Phone"
                                    datatype={'text'}
                                    onChange={e => this.handleChange(e)}
                                />
                                <FormHelperText id="Phone-error-text" className={this.props.classes.none}>Error</FormHelperText>
                            </FormControl>
                            <FormControl
                                style={{ width: '30%' }}
                                className={this.props.classes.formControl}
                                error={false}
                                aria-describedby="Email-error-text"
                            >
                                <InputLabel htmlFor="Email">Email</InputLabel>
                                <Input
                                    id="Email"
                                    datatype={'text'}
                                    onChange={e => this.handleChange(e)}
                                />
                                <FormHelperText id="Email-error-text" className={this.props.classes.none}>Error</FormHelperText>
                            </FormControl>
                            <FormControl
                                style={{ width: '30%' }}
                                className={this.props.classes.formControl}
                                error={false}
                                aria-describedby="Skype-error-text"
                            >
                                <InputLabel htmlFor="Skype">Skype</InputLabel>
                                <Input
                                    id="Skype"
                                    datatype={'number'}
                                    onChange={e => this.handleChange(e)}
                                />
                                <FormHelperText id="Skype-error-text" className={this.props.classes.none}>Error</FormHelperText>
                            </FormControl>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Education Info</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FormControl
                                style={{ width: '45%' }}
                                className={this.props.classes.formControl}
                                error={false}
                                aria-describedby="PlaceOfStudying-error-text"
                            >
                                <InputLabel htmlFor="PlaceOfStudying">Place of studying</InputLabel>
                                <Input
                                    id="PlaceOfStudying"
                                    datatype={'text'}
                                    onChange={e => this.handleChange(e)}
                                />
                                <FormHelperText id="PlaceOfStudying-error-text" className={this.props.classes.none}>Error</FormHelperText>
                            </FormControl>
                            <FormControl
                                style={{ width: '45%' }}
                                className={this.props.classes.formControl}
                                error={false}
                                aria-describedby="Speciality-error-text"
                            >
                                <InputLabel htmlFor="Speciality">Speciality</InputLabel>
                                <Input
                                    id="Speciality"
                                    datatype={'text'}
                                    onChange={this.handleChange}
                                />
                                <FormHelperText id="Speciality-error-text" className={this.props.classes.none}>Error</FormHelperText>
                            </FormControl>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Other</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FormControl
                                style={{ width: '95%' }}
                                className={this.props.classes.formControl}
                                error={false}
                                aria-describedby="Other-error-text"
                            >
                                <InputLabel htmlFor="Other">Other</InputLabel>
                                <Textarea
                                    id="Other"
                                    datatype={'text'}
                                    onChange={e => this.handleChange(e)}
                                />
                                <FormHelperText id="Other-error-text" className={this.props.classes.none}>Error</FormHelperText>
                            </FormControl>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <Button
                        fullWidth
                        onClick={e => this.handleSubmit()}
                    >
                        Submit
                    </Button>
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
    },
    select: {
        'margin-top': '24px',
    }
});

function mapStateToProps(state: RootState) {
    return {

    };
}

function mapDispatchToProps(dispatch: any) {
    return {

    };
}

export default (withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(SurveyPage)));