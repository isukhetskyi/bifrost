import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
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
    Button,
    Grid
} from 'material-ui';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import * as axios from 'axios';
import { AppConfigration } from '../../config/config';

export namespace SurveyPage {
    export interface Props extends RouteComponentProps<void> {

    }

    export interface State {
        FirstName: string;
        FirstNameError: boolean;
        LastName: string;
        LastNameError: boolean;
        Age?: string;
        AgeError: boolean;
        Address: string;
        AddressError: boolean;
        IsEmployed: boolean;
        CurrentPosition: string;
        CurrentPositionError: boolean;
        Phone?: string;
        PhoneError: boolean;
        Email?: string;
        EmailError: boolean;
        Skype?: string;
        SkypeError: boolean;
        PlaceOfStudying?: string;
        PlaceOfStudyingError: boolean;
        Speciality?: string;
        SpecialityError: boolean;
        Other?: string;
        OtherError: boolean;
        // work experience
        ProgrammingLanguagesCheckboxes: Array<object>;
        FrameworksCheckboxes: Array<object>;
        DatabasesCheckboxes: Array<object>;
        Technologies?: Array<number>;
        isValid: boolean;
        isDone: boolean;
        isNotEmpty: boolean;
    }
}

class SurveyPage extends React.Component<WithStyles & SurveyPage.Props, SurveyPage.State> {

    state = {
        FirstName: '',
        FirstNameError: false,
        LastName: '',
        LastNameError: false,
        Age: '-1',
        AgeError: false,
        Address: '',
        AddressError: false,
        IsEmployed: false,
        CurrentPosition: '',
        CurrentPositionError: false,
        Phone: '',
        PhoneError: false,
        Email: '',
        EmailError: false,
        Skype: '',
        SkypeError: false,
        PlaceOfStudying: '',
        PlaceOfStudyingError: false,
        Speciality: '',
        SpecialityError: false,
        Other: '',
        OtherError: false,
        ProgrammingLanguagesCheckboxes: Array(),
        FrameworksCheckboxes: Array(),
        DatabasesCheckboxes: Array(),
        Technologies: new Array<number>(),
        isValid: false,
        isDone: false,
        isNotEmpty: false,
    };

    validation = {
        FirstName: '^[a-zA-Z ]{2,100}$',
        LastName: '^[a-zA-Z ]{2,100}$',
        Age: '^(?:\\b|-)([1-9]{1,2}[0]?|99)\\b$',
        Address: '^[a-zA-Z- ,.0-9]{2,200}$',
        CurrentPosition: '^([a-zA-Z0-9\\.,\\-_ ]){2,100}$',
        Phone: '^[0-9]{10,12}$',
        Email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
        Skype: '^[a-zA-Z0-9\\.,\\-_]{6,100}$',
        PlaceOfStudying: '^[a-zA-Z ,.\'-]{2,100}$',
        Speciality: '^[a-zA-Z ,.\'-]{2,100}$',
        Other: '^[\\S\\s+]{2,1000}$'
    };

    componentDidMount() {
        let thisContext = this;

        axios.default.get(AppConfigration.BASE_API_URL + '/api/survey/gettechnologies', {
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'text/html,application/xhtml+xml,application/xml,text/csv;q=0.9,image/webp,image/apng,*/*;q=0.8'
        }})
            .then(function (response: any) {
                thisContext.setState({ ProgrammingLanguagesCheckboxes: response.data.technologies.languages });
                thisContext.setState({ FrameworksCheckboxes: response.data.technologies.frameworks });
                thisContext.setState({ DatabasesCheckboxes: response.data.technologies.databases });
            })
            .catch(function (error: any) {
                console.log(error);
                alert(error);
            });
    }

    validate(event: any): boolean {
        let regex = new RegExp(this.validation[event.target.id]);
        if (regex.test(event.target.value)) {
            this.setState({ [(event.target.id + 'Error') as any]: false });
            this.validateForm();
            return true;
        } else {
            this.setState({ [(event.target.id + 'Error') as any]: true });
            this.validateForm();
            return false;
        }
    }

    checkIfNotEmpty() {
        let result = false;
        result = this.state.FirstName.trim().length > 0
              && this.state.LastName.trim().length > 0
              && this.state.Address.trim().length > 0
              && (this.state.Phone.trim().length > 0
                  || this.state.Email.trim().length > 0
                  || this.state.Skype.trim().length > 0);
        this.setState({isNotEmpty: result});
    }

    validateForm(): boolean {
        this.checkIfNotEmpty();
        let isFormValid = (!this.state.AddressError
            && !this.state.AgeError
            && !this.state.CurrentPositionError
            && !this.state.EmailError
            && !this.state.FirstNameError
            && !this.state.LastNameError
            && !this.state.OtherError
            && !this.state.PhoneError
            && !this.state.PlaceOfStudyingError
            && !this.state.SkypeError
            && !this.state.SpecialityError);

        this.setState({ isValid: isFormValid });

        return isFormValid;
    }

    handleChange = (event: any) => {
        if (this.validate(event)) {
            this.setState({ [event.target.id]: event.target.value });
            this.checkIfNotEmpty();
        }
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
                    'Accept': 'text/html,application/xhtml+xml,application/xml,text/csv;q=0.9,image/webp,image/apng,*/*;q=0.8'
                }
            })
            .then(function (response: any) {
                thisContext.setState({ isDone: true });
            })
            .catch(function (error: any) {
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
        if (!this.state.isDone) {
            // tslint:disable-next-line:jsx-wrap-multiline
            return <Grid  container spacing={0}>
                <form style={{width: '100%'}} onSubmit={e => this.handleSubmit()} onKeyPress={e => this.handleKeyPress(e)}>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Personal Info</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                                <Grid container>
                                    <Grid item xs={12} md={4}>
                                        <FormControl
                                            fullWidth
                                            required
                                            className={this.props.classes.formControl}
                                            error={this.state.FirstNameError}
                                            aria-describedby="FirstName-error-text"
                                        >
                                            <InputLabel htmlFor="FirstName">First Name</InputLabel>
                                            <Input
                                                id="FirstName"
                                                datatype={'text'}
                                                onChange={e => this.handleChange(e)}
                                                onBlur={e => this.validate(e)}
                                            />
                                            <FormHelperText id="FirstName-error-text" className={this.state.FirstNameError ? '' : this.props.classes.none}>Error</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl
                                            fullWidth
                                            required
                                            className={this.props.classes.formControl}
                                            error={this.state.LastNameError}
                                            aria-describedby="LastName-error-text"
                                        >
                                            <InputLabel htmlFor="LastName">Last Name</InputLabel>
                                            <Input
                                                id="LastName"
                                                datatype={'text'}
                                                onChange={e => this.handleChange(e)}
                                                onBlur={e => this.validate(e)}
                                            />
                                            <FormHelperText id="LastName-error-text" className={this.state.LastNameError ? '' : this.props.classes.none}>Error</FormHelperText>
                                        </FormControl>
                                    </Grid >
                                    <Grid item xs={12} md={4}>
                                        <FormControl
                                            fullWidth
                                            className={this.props.classes.formControl}
                                            error={this.state.AgeError}
                                            aria-describedby="Age-error-text"
                                        >
                                            <InputLabel htmlFor="Age">Age</InputLabel>
                                            <Input
                                                id="Age"
                                                datatype={'number'}
                                                onChange={e => this.handleChange(e)}
                                                onBlur={e => this.validate(e)}
                                            />
                                            <FormHelperText id="Age-error-text" className={this.state.AgeError ? '' : this.props.classes.none}>Error</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl
                                            fullWidth
                                            required
                                            className={this.props.classes.formControl}
                                            error={this.state.AddressError}
                                            aria-describedby="Address-error-text"
                                        >
                                            <InputLabel htmlFor="Address">Address</InputLabel>
                                            <Input
                                                id="Address"
                                                datatype={'text'}
                                                onChange={e => this.handleChange(e)}
                                                onBlur={e => this.validate(e)}
                                            />
                                            <FormHelperText id="Address-error-text" className={this.state.AddressError ? '' : this.props.classes.none}>Error</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4} md={2}>
                                        <FormControl fullWidth>
                                            <Select
                                                native={true}
                                                className={this.props.classes.select}
                                                defaultValue={'No'}
                                                onChange={() => { this.setState({ IsEmployed: !this.state.IsEmployed }); }}
                                            >
                                                <option value={'Yes'}>Yes</option>
                                                <option value={'No'}>No</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={8} md={10}>
                                        <FormControl
                                            fullWidth
                                            required={this.state.IsEmployed}
                                            className={this.props.classes.formControl}
                                            error={this.state.CurrentPositionError}
                                            aria-describedby="CurrentPosition-error-text"
                                        >
                                            <InputLabel htmlFor="CurrentPosition">Current position</InputLabel>
                                            <Input
                                                id="CurrentPosition"
                                                datatype={'text'}
                                                disabled={!this.state.IsEmployed}
                                                onChange={e => this.handleChange(e)}
                                                onBlur={e => this.validate(e)}
                                            />
                                            <FormHelperText id="CurrentPosition-error-text" className={this.state.CurrentPositionError ? '' : this.props.classes.none}>Error</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Work Experience</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container>
                                <Grid item xs={12} sm={6}  md={4}>
                                    <FormGroup>
                                        <FormLabel>
                                            Languages
                                            </FormLabel>
                                        {this.renderCheckboxes('ProgrammingLanguagesCheckboxes')}
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormGroup>
                                        <FormLabel>
                                            Frameworks
                                            </FormLabel>
                                        {this.renderCheckboxes('FrameworksCheckboxes')}
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormGroup>
                                        <FormLabel>
                                            Databases
                                            </FormLabel>
                                        {this.renderCheckboxes('DatabasesCheckboxes')}
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Contact info *</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container>
                                <Grid item xs={12} md={4}>
                                    <FormControl
                                        fullWidth
                                        className={this.props.classes.formControl}
                                        error={this.state.PhoneError}
                                        aria-describedby="Phone-error-text"
                                    >
                                        <InputLabel htmlFor="Phone">Phone</InputLabel>
                                        <Input
                                            id="Phone"
                                            datatype={'text'}
                                            onChange={e => this.handleChange(e)}
                                            onBlur={e => this.validate(e)}
                                        />
                                        <FormHelperText id="Phone-error-text" className={this.state.LastNameError ? '' : this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl
                                        fullWidth
                                        className={this.props.classes.formControl}
                                        error={this.state.EmailError}
                                        aria-describedby="Email-error-text"
                                    >
                                        <InputLabel htmlFor="Email">Email</InputLabel>
                                        <Input
                                            id="Email"
                                            datatype={'text'}
                                            onChange={e => this.handleChange(e)}
                                            onBlur={e => this.validate(e)}
                                        />
                                        <FormHelperText id="Email-error-text" className={this.state.EmailError ? '' : this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl
                                        fullWidth
                                        className={this.props.classes.formControl}
                                        error={this.state.SkypeError}
                                        aria-describedby="Skype-error-text"
                                    >
                                        <InputLabel htmlFor="Skype">Skype</InputLabel>
                                        <Input
                                            id="Skype"
                                            datatype={'number'}
                                            onChange={e => this.handleChange(e)}
                                            onBlur={e => this.validate(e)}
                                        />
                                        <FormHelperText id="Skype-error-text" className={this.state.SkypeError ? '' : this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Education Info</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <FormControl
                                        fullWidth
                                        className={this.props.classes.formControl}
                                        error={this.state.PlaceOfStudyingError}
                                        aria-describedby="PlaceOfStudying-error-text"
                                    >
                                        <InputLabel htmlFor="PlaceOfStudying">Place of studying</InputLabel>
                                        <Input
                                            id="PlaceOfStudying"
                                            datatype={'text'}
                                            onChange={e => this.handleChange(e)}
                                            onBlur={e => this.validate(e)}
                                        />
                                        <FormHelperText id="PlaceOfStudying-error-text" className={this.state.PlaceOfStudyingError ? '' : this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl
                                        fullWidth
                                        className={this.props.classes.formControl}
                                        error={this.state.SpecialityError}
                                        aria-describedby="Speciality-error-text"
                                    >
                                        <InputLabel htmlFor="Speciality">Speciality</InputLabel>
                                        <Input
                                            id="Speciality"
                                            datatype={'text'}
                                            onChange={e => this.handleChange(e)}
                                            onBlur={e => this.validate(e)}
                                        />
                                        <FormHelperText id="Speciality-error-text" className={this.state.SpecialityError ? '' : this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Other</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container>
                                <Grid item xs={12} md={12}>
                                    <FormControl
                                        fullWidth
                                        className={this.props.classes.formControl}
                                        error={this.state.OtherError}
                                        aria-describedby="Other-error-text"
                                    >
                                        <InputLabel htmlFor="Other">Other</InputLabel>
                                        <Input
                                            id="Other"
                                            datatype={'text'}
                                            onChange={e => this.handleChange(e)}
                                            onBlur={e => this.validate(e)}
                                        />
                                        <FormHelperText id="Other-error-text" className={this.state.OtherError ? '' : this.props.classes.none}>Error</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <Button
                        fullWidth
                        disabled={!this.state.isValid || !this.state.isNotEmpty}
                        onClick={e => this.handleSubmit()}
                    >
                        Submit
                    </Button>
                </form>
            </Grid>;
        } else {
            // tslint:disable-next-line:jsx-wrap-multiline
            return <Typography variant="display1" style={{textAlign: 'center', marginTop: '100px'}} gutterBottom>
                    Thanks for Your patience!
                </Typography>;
        }

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